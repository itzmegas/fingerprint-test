/**
 * Librería de Fingerprinting
 * Versión: 2.0.0
 * Fecha: 2025
 */

class Fingerprint {
  constructor(options = {}) {
    this.options = {
      includeCanvasFingerprint: true,
      includeWebGLFingerprint: true,
      includeAudioFingerprint: true,
      includeFonts: true,
      cacheResult: true,
      cacheComponents: true,
      ...options,
    };

    this.cache = null;
    this.componentsCache = null; // Cache para los componentes
    this.cacheKey = "modern_fingerprint_cache";
    this.componentsCacheKey = "modern_fingerprint_components_cache";
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 24 horas
  }

  /**
   * Solo genera el fingerprint (hash)
   * @returns {Promise<string>}
   */
  async generate() {
    const result = await this.generateComplete();
    return result.fingerprint;
  }

  /**
   * Genera fingerprint y devuelve tanto el hash como los datos
   * @returns {Promise<{fingerprint: string, components: Object}>}
   */
  async generateComplete() {
    // Verificar cache
    if (this.options.cacheResult && this.cache) {
      const cached = this.getCachedComplete();
      if (cached) return cached;
    }

    try {
      const components = await this.gatherComponents();
      const fingerprint = await this.createHash(JSON.stringify(components));

      const result = {
        fingerprint,
        components,
        timestamp: Date.now(),
        version: "2.0.0",
      };

      // Guardar en cache
      if (this.options.cacheResult) {
        this.setCachedComplete(result);
      }

      return result;
    } catch (error) {
      console.error("Error generando fingerprint completo:", error);
      const fallback = this.generateFallbackFingerprint();
      return {
        fingerprint: fallback,
        components: { error: "fallback_mode" },
        timestamp: Date.now(),
        version: "2.0.0",
      };
    }
  }

  /**
   * Solo obtiene los componentes sin generar hash
   * @returns {Promise<Object>}
   */
  async getComponents() {
    // Verificar cache de componentes
    if (this.options.cacheComponents && this.componentsCache) {
      const cached = this.getCachedComponents();
      if (cached) return cached;
    }

    const components = await this.gatherComponents();

    if (this.options.cacheComponents) {
      this.setCachedComponents(components);
    }

    return components;
  }

  /**
   * Obtiene información específica del navegador
   * @returns {Promise<Object>}
   */
  async getBrowserInfo() {
    const components = await this.getComponents();
    return {
      userAgent: components.userAgent,
      language: components.language,
      languages: components.languages,
      platform: components.platform,
      cookieEnabled: components.cookieEnabled,
      doNotTrack: components.doNotTrack,
    };
  }

  /**
   * Obtiene información de la pantalla
   * @returns {Promise<Object>}
   */
  async getScreenInfo() {
    const components = await this.getComponents();
    return components.screen;
  }

  /**
   * Obtiene información del hardware
   * @returns {Promise<Object>}
   */
  async getHardwareInfo() {
    const components = await this.getComponents();
    return {
      ...components.hardware,
      screen: components.screen,
      webgl: components.webgl,
    };
  }

  /**
   * Obtiene información de localización/timezone
   * @returns {Promise<Object>}
   */
  async getLocationInfo() {
    const components = await this.getComponents();
    return components.timezone;
  }

  /**
   * Obtiene lista de plugins instalados
   * @returns {Promise<Array>}
   */
  async getPlugins() {
    const components = await this.getComponents();
    return components.plugins;
  }

  /**
   * Obtiene lista de fonts disponibles
   * @returns {Promise<Array>}
   */
  async getFonts() {
    const components = await this.getComponents();
    return components.fonts;
  }

  /**
   * Obtiene fingerprints específicos
   * @returns {Promise<Object>}
   */
  async getFingerprints() {
    const components = await this.getComponents();
    return {
      canvas: components.canvas,
      webgl: components.webgl,
      audio: components.audio,
    };
  }

  /**
   * Genera un reporte completo legible
   * @returns {Promise<Object>}
   */
  async generateReport() {
    const result = await this.generateComplete();
    const stats = await this.getStats();

    return {
      // Información básica
      fingerprint: result.fingerprint,
      timestamp: result.timestamp,

      // Información del navegador
      browser: {
        name: this.getBrowserName(result.components.userAgent),
        version: this.getBrowserVersion(result.components.userAgent),
        userAgent: result.components.userAgent,
        language: result.components.language,
        platform: result.components.platform,
        cookiesEnabled: result.components.cookieEnabled,
      },

      // Información de pantalla
      screen: {
        resolution: `${result.components.screen.width}x${result.components.screen.height}`,
        availableResolution: `${result.components.screen.availWidth}x${result.components.screen.availHeight}`,
        colorDepth: result.components.screen.colorDepth,
        pixelRatio: result.components.window.devicePixelRatio,
      },

      // Información de hardware
      hardware: {
        cpuCores: result.components.hardware.concurrency,
        memory: result.components.hardware.memory,
        touchSupport: result.components.hardware.maxTouchPoints > 0,
        maxTouchPoints: result.components.hardware.maxTouchPoints,
      },

      // Información de localización
      location: {
        timezone: result.components.timezone.name,
        timezoneOffset: result.components.timezone.offset,
        locale: result.components.timezone.locale,
      },

      // Capacidades
      capabilities: {
        localStorage: result.components.misc.localStorage,
        sessionStorage: result.components.misc.sessionStorage,
        indexedDB: result.components.misc.indexedDB,
        webSQL: result.components.misc.webSQL,
        canvas: !!result.components.canvas,
        webgl: !!result.components.webgl,
        audio: !!result.components.audio,
      },

      // Estadísticas
      statistics: {
        totalComponents: stats.totalComponents,
        fontsDetected: stats.fontsDetected,
        pluginsDetected: stats.pluginsDetected,
        estimatedEntropy: stats.estimatedEntropy,
        uniquenessScore: this.calculateUniquenessScore(result.components),
      },

      // Datos específicos (si los necesitas)
      rawComponents: result.components,
    };
  }

  // Funciones auxiliares para el reporte
  getBrowserName(userAgent) {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera")) return "Opera";
    return "Unknown";
  }

  getBrowserVersion(userAgent) {
    const match = userAgent.match(
      /(?:Chrome|Firefox|Safari|Edge|Opera)[\/\s](\d+\.\d+)/
    );
    return match ? match[1] : "Unknown";
  }

  calculateUniquenessScore(components) {
    let score = 0;

    // Factores que aumentan la unicidad
    if (components.plugins && components.plugins.length > 0) score += 20;
    if (components.fonts && components.fonts.length > 10) score += 15;
    if (components.canvas) score += 25;
    if (components.webgl) score += 20;
    if (components.audio) score += 10;
    if (components.hardware.concurrency > 4) score += 10;

    return Math.min(score, 100);
  }

  // Métodos de cache extendidos
  getCachedComplete() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);

      if (Date.now() - data.timestamp > this.cacheExpiry) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }

  setCachedComplete(data) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error guardando en cache completo:", error);
    }
  }

  getCachedComponents() {
    try {
      const cached = localStorage.getItem(this.componentsCacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);

      if (Date.now() - data.timestamp > this.cacheExpiry) {
        localStorage.removeItem(this.componentsCacheKey);
        return null;
      }

      return data.components;
    } catch (error) {
      return null;
    }
  }

  setCachedComponents(components) {
    try {
      const data = {
        components,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.componentsCacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error guardando componentes en cache:", error);
    }
  }

  /**
   * Recopila todos los componentes del fingerprint
   * @returns {Promise<Object>} Objeto con todos los componentes
   */
  async gatherComponents() {
    const components = {
      // Información básica del navegador
      userAgent: navigator.userAgent,
      language: navigator.language,
      languages: navigator.languages?.join(",") || "",
      platform: navigator.platform,
      cookieEnabled: navigator.cookieEnabled,
      doNotTrack: navigator.doNotTrack,

      // Información de pantalla
      screen: {
        width: screen.width,
        height: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        orientation: screen.orientation?.type || "unknown",
      },

      // Información de ventana
      window: {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
      },

      // Información de timezone
      timezone: {
        name: Intl.DateTimeFormat().resolvedOptions().timeZone,
        offset: new Date().getTimezoneOffset(),
        locale: Intl.DateTimeFormat().resolvedOptions().locale,
      },

      // Información de hardware
      hardware: {
        concurrency: navigator.hardwareConcurrency || 1,
        maxTouchPoints: navigator.maxTouchPoints || 0,
        memory: navigator.deviceMemory || "unknown",
      },

      // Plugins
      plugins: this.getPlugins(),

      // Canvas fingerprint
      canvas: this.options.includeCanvasFingerprint
        ? this.getCanvasFingerprint()
        : null,

      // WebGL fingerprint
      webgl: this.options.includeWebGLFingerprint
        ? this.getWebGLFingerprint()
        : null,

      // Fonts disponibles
      fonts: this.options.includeFonts ? await this.getAvailableFonts() : null,

      // Información adicional
      misc: {
        localStorage: this.isLocalStorageAvailable(),
        sessionStorage: this.isSessionStorageAvailable(),
        indexedDB: this.isIndexedDBAvailable(),
        webSQL: this.isWebSQLAvailable(),
        cpu: this.getCPUClass(),
        touchSupport: this.getTouchSupport(),
      },
    };

    return components;
  }

  /**
   * Cachear el fingerprint con todos los componentes
   * @returns
   */
  getCachedComplete() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const data = JSON.parse(cached);

      if (Date.now() - data.timestamp > this.cacheExpiry) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return data;
    } catch (error) {
      return null;
    }
  }
  setCachedComplete(data) {
    try {
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch (error) {
      console.error("Error guardando en cache completo:", error);
    }
  }

  /**
   * Obtiene información de plugins
   * @returns {Array} Lista de plugins
   */
  getPlugins() {
    if (!navigator.plugins || navigator.plugins.length === 0) {
      return [];
    }

    return Array.from(navigator.plugins)
      .map((plugin) => ({
        name: plugin.name,
        description: plugin.description,
        filename: plugin.filename,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * Genera fingerprint del canvas
   * @returns {string} Canvas fingerprint
   */
  getCanvasFingerprint() {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return null;

      // Configurar canvas
      canvas.width = 200;
      canvas.height = 50;

      // Dibujar texto con diferentes fuentes
      ctx.textBaseline = "top";
      ctx.font = "14px Arial";
      ctx.fillStyle = "#f60";
      ctx.fillText("Canvas fingerprint test 🔍", 2, 2);

      ctx.font = "11px Times";
      ctx.fillStyle = "#069";
      ctx.fillText("Testing canvas fingerprinting", 4, 20);

      // Agregar formas geométricas
      ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
      ctx.fillRect(50, 10, 100, 30);

      ctx.fillStyle = "rgba(0, 255, 0, 0.7)";
      ctx.beginPath();
      ctx.arc(100, 25, 20, 0, Math.PI * 2);
      ctx.fill();

      // Obtener datos del canvas
      const canvasData = canvas.toDataURL();
      return this.createSimpleHash(canvasData);
    } catch (error) {
      console.error("Error en canvas fingerprint:", error);
      return null;
    }
  }

  /**
   * Genera fingerprint de WebGL
   * @returns {Object} WebGL fingerprint
   */
  getWebGLFingerprint() {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      if (!gl) return null;

      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");

      return {
        vendor: debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)
          : null,
        renderer: debugInfo
          ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          : null,
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        extensions: gl.getSupportedExtensions(),
      };
    } catch (error) {
      console.error("Error en WebGL fingerprint:", error);
      return null;
    }
  }

  /**
   * Obtiene fonts disponibles
   * @returns {Promise<Array>} Lista de fonts disponibles
   */
  async getAvailableFonts() {
    const fonts = [
      "Arial",
      "Arial Black",
      "Arial Narrow",
      "Arial Unicode MS",
      "Calibri",
      "Cambria",
      "Candara",
      "Century Gothic",
      "Comic Sans MS",
      "Consolas",
      "Courier",
      "Courier New",
      "Georgia",
      "Helvetica",
      "Impact",
      "Lucida Console",
      "Lucida Sans Unicode",
      "Microsoft Sans Serif",
      "Palatino",
      "Tahoma",
      "Times",
      "Times New Roman",
      "Trebuchet MS",
      "Verdana",
      "Webdings",
      "Wingdings",
    ];

    const availableFonts = [];

    for (const font of fonts) {
      if (await this.isFontAvailable(font)) {
        availableFonts.push(font);
      }
    }

    return availableFonts;
  }

  /**
   * Verifica si una font está disponible
   * @param {string} font Nombre de la font
   * @returns {Promise<boolean>} True si está disponible
   */
  async isFontAvailable(font) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Texto de prueba
      const testText = "mmmmmmmmmmlli";

      // Medida con font base
      ctx.font = "72px monospace";
      const baseWidth = ctx.measureText(testText).width;

      // Medida con font de prueba
      ctx.font = `72px ${font}, monospace`;
      const testWidth = ctx.measureText(testText).width;

      resolve(baseWidth !== testWidth);
    });
  }

  /**
   * Funciones auxiliares para detectar características del navegador
   */
  isLocalStorageAvailable() {
    try {
      const test = "__test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isSessionStorageAvailable() {
    try {
      const test = "__test__";
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  isIndexedDBAvailable() {
    return !!(
      window.indexedDB ||
      window.webkitIndexedDB ||
      window.mozIndexedDB
    );
  }

  isWebSQLAvailable() {
    return !!window.openDatabase;
  }

  getCPUClass() {
    return navigator.cpuClass || "unknown";
  }

  getTouchSupport() {
    return {
      maxTouchPoints: navigator.maxTouchPoints || 0,
      touchEvent: "ontouchstart" in window,
      touchPoints: navigator.msMaxTouchPoints || 0,
    };
  }

  /**
   * Crea un hash SHA-256 like usando Web Crypto API
   * @param {string} data Datos para hashear
   * @returns {Promise<string>} Hash hexadecimal
   */
  async createHash(data) {
    try {
      // Usar Web Crypto API si está disponible
      if (window.crypto && window.crypto.subtle) {
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);
        const hashBuffer = await window.crypto.subtle.digest(
          "SHA-256",
          dataBuffer
        );
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      } else {
        // Fallback a hash simple
        return this.createSimpleHash(data);
      }
    } catch (error) {
      console.error("Error creando hash:", error);
      return this.createSimpleHash(data);
    }
  }

  /**
   * Crea un hash simple para compatibilidad
   * @param {string} str String para hashear
   * @returns {string} Hash hexadecimal
   */
  createSimpleHash(str) {
    let hash = 0;
    if (str.length === 0) return hash.toString(16);

    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return Math.abs(hash).toString(16).padStart(8, "0");
  }

  /**
   * Manejo de cache
   */
  getCachedFingerprint() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return null;

      const { fingerprint, timestamp } = JSON.parse(cached);

      // Verificar si el cache ha expirado
      if (Date.now() - timestamp > this.cacheExpiry) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }

      return fingerprint;
    } catch (error) {
      return null;
    }
  }

  setCachedFingerprint(fingerprint) {
    try {
      const cacheData = {
        fingerprint,
        timestamp: Date.now(),
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(cacheData));
    } catch (error) {
      console.error("Error guardando en cache:", error);
    }
  }

  /**
   * Genera un fingerprint básico como fallback
   * @returns {string} Fingerprint básico
   */
  generateFallbackFingerprint() {
    const basicData = {
      userAgent: navigator.userAgent,
      language: navigator.language,
      platform: navigator.platform,
      screenWidth: screen.width,
      screenHeight: screen.height,
      timezone: new Date().getTimezoneOffset(),
      timestamp: Date.now(),
    };

    return this.createSimpleHash(JSON.stringify(basicData));
  }

  /**
   * Obtiene estadísticas del fingerprint generado
   * @returns {Promise<Object>} Estadísticas
   */
  async getStats() {
    const components = await this.gatherComponents();

    return {
      totalComponents: Object.keys(components).length,
      canvasSupported: !!components.canvas,
      webglSupported: !!components.webgl,
      audioSupported: !!components.audio,
      fontsDetected: components.fonts?.length || 0,
      pluginsDetected: components.plugins?.length || 0,
      estimatedEntropy: this.calculateEntropy(components),
    };
  }

  /**
   * Calcula la entropía estimada del fingerprint
   * @param {Object} components Componentes del fingerprint
   * @returns {number} Entropía estimada en bits
   */
  calculateEntropy(components) {
    let entropy = 0;

    // Estimaciones básicas de entropía por componente
    if (components.userAgent) entropy += 10;
    if (components.screen) entropy += 5;
    if (components.timezone) entropy += 3;
    if (components.plugins?.length > 0)
      entropy += Math.log2(components.plugins.length + 1);
    if (components.fonts?.length > 0)
      entropy += Math.log2(components.fonts.length + 1);
    if (components.canvas) entropy += 15;
    if (components.webgl) entropy += 10;
    if (components.audio) entropy += 8;

    return Math.round(entropy * 100) / 100;
  }

  /**
   * Limpia el cache
   */
  clearCache() {
    try {
      localStorage.removeItem(this.cacheKey);
      this.cache = null;
    } catch (error) {
      console.error("Error limpiando cache:", error);
    }
  }

  /**
   * Valida que un fingerprint tenga el formato correcto
   * @param {string} fingerprint Fingerprint a validar
   * @returns {boolean} True si es válido
   */
  static isValidFingerprint(fingerprint) {
    return (
      typeof fingerprint === "string" &&
      fingerprint.length >= 8 &&
      /^[a-f0-9]+$/i.test(fingerprint)
    );
  }
}

// Clase singleton para uso global
class FingerprintManager {
  constructor() {
    this.fingerprinter = null;
    this.currentFingerprint = null;
    this.currentCompleteFingerprint = null;
  }

  /**
   * Inicializa el fingerprinter con opciones
   * @param {Object} options Opciones de configuración
   */
  init(options = {}) {
    this.fingerprinter = new Fingerprint(options);
  }

  /**
   * Obtiene el fingerprint actual o lo genera
   * @returns {Promise<string>} Fingerprint único
   */
  async getFingerprint() {
    if (!this.fingerprinter) {
      this.init();
    }

    if (!this.currentFingerprint) {
      this.currentFingerprint = await this.fingerprinter.generate();
    }

    return this.currentFingerprint;
  }

  /**
   * Obtiene el fingerprint completo
   * @returns {Promise<string>} Fingerprint único
   */
  async getCompleteFingerprint() {
    if (!this.fingerprinter) {
      this.init();
    }

    if (!this.currentCompleteFingerprint) {
      this.currentCompleteFingerprint =
        await this.fingerprinter.generateReport();
    }

    return this.currentCompleteFingerprint;
  }

  /**
   * Fuerza la regeneración del fingerprint
   * @returns {Promise<string>} Nuevo fingerprint
   */
  async regenerate() {
    if (!this.fingerprinter) {
      this.init();
    }

    this.fingerprinter.clearCache();
    this.currentFingerprint = await this.fingerprinter.generate();
    return this.currentFingerprint;
  }

  /**
   * Obtiene estadísticas del fingerprint
   * @returns {Promise<Object>} Estadísticas
   */
  async getStats() {
    if (!this.fingerprinter) {
      this.init();
    }

    return await this.fingerprinter.getStats();
  }
}

// Instancia global
const fingerprintManager = new FingerprintManager();

// Exportar para uso en módulos
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Fingerprint,
    FingerprintManager,
    fingerprintManager,
  };
}

// Exportar para uso en navegador
if (typeof window !== "undefined") {
  window.Fingerprint = Fingerprint;
  window.FingerprintManager = FingerprintManager;
  window.fingerprintManager = fingerprintManager;
}

const fingerprint = await fingerprintManager.getFingerprint();
console.log("Fingerprint:", fingerprint);

const result = await fingerprintManager.getCompleteFingerprint();
console.log("Fingerprint complete:", result);

document.getElementById(
  "fingerprint-id"
).textContent = `Fingerprint: ${fingerprint}`;

document.getElementById("fingerprint-code").textContent = JSON.stringify(
  result,
  null,
  2
);

/**
 * EJEMPLOS DE USO:
 *
 * // Uso básico
 * const fingerprint = await fingerprintManager.getFingerprint();
 * console.log('Fingerprint:', fingerprint);
 *
 * // Uso con opciones personalizadas
 * fingerprintManager.init({
 *     includeCanvasFingerprint: true,
 *     includeWebGLFingerprint: true,
 *     includeAudioFingerprint: false,
 *     cacheResult: true
 * });
 *
 * // Obtener estadísticas
 * const stats = await fingerprintManager.getStats();
 * console.log('Estadísticas:', stats);
 *
 * // Regenerar fingerprint
 * const newFingerprint = await fingerprintManager.regenerate();
 *
 * // Uso directo de la clase
 * const fp = new ModernFingerprint({
 *     includeCanvasFingerprint: true,
 *     cacheResult: false
 * });
 * const result = await fp.generate();
 */
