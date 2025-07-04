/*!
 * fingerprint JavaScript Library v1.1
 * https://webphone.net
 * Date: 2024-12-02
 */
!(function (n) {
  "use strict";
  function t(n, t) {
    var r = (65535 & n) + (65535 & t);
    return (((n >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
  }
  function r(n, t) {
    return (n << t) | (n >>> (32 - t));
  }
  function e(n, e, o, u, c, f) {
    return t(r(t(t(e, n), t(u, f)), c), o);
  }
  function o(n, t, r, o, u, c, f) {
    return e((t & r) | (~t & o), n, t, u, c, f);
  }
  function u(n, t, r, o, u, c, f) {
    return e((t & o) | (r & ~o), n, t, u, c, f);
  }
  function c(n, t, r, o, u, c, f) {
    return e(t ^ r ^ o, n, t, u, c, f);
  }
  function f(n, t, r, o, u, c, f) {
    return e(r ^ (t | ~o), n, t, u, c, f);
  }
  function i(n, r) {
    (n[r >> 5] |= 128 << r % 32), (n[14 + (((r + 64) >>> 9) << 4)] = r);
    var e,
      i,
      a,
      d,
      h,
      l = 1732584193,
      g = -271733879,
      v = -1732584194,
      m = 271733878;
    for (e = 0; e < n.length; e += 16)
      (i = l),
        (a = g),
        (d = v),
        (h = m),
        (g = f(
          (g = f(
            (g = f(
              (g = f(
                (g = c(
                  (g = c(
                    (g = c(
                      (g = c(
                        (g = u(
                          (g = u(
                            (g = u(
                              (g = u(
                                (g = o(
                                  (g = o(
                                    (g = o(
                                      (g = o(
                                        g,
                                        (v = o(
                                          v,
                                          (m = o(
                                            m,
                                            (l = o(
                                              l,
                                              g,
                                              v,
                                              m,
                                              n[e],
                                              7,
                                              -680876936
                                            )),
                                            g,
                                            v,
                                            n[e + 1],
                                            12,
                                            -389564586
                                          )),
                                          l,
                                          g,
                                          n[e + 2],
                                          17,
                                          606105819
                                        )),
                                        m,
                                        l,
                                        n[e + 3],
                                        22,
                                        -1044525330
                                      )),
                                      (v = o(
                                        v,
                                        (m = o(
                                          m,
                                          (l = o(
                                            l,
                                            g,
                                            v,
                                            m,
                                            n[e + 4],
                                            7,
                                            -176418897
                                          )),
                                          g,
                                          v,
                                          n[e + 5],
                                          12,
                                          1200080426
                                        )),
                                        l,
                                        g,
                                        n[e + 6],
                                        17,
                                        -1473231341
                                      )),
                                      m,
                                      l,
                                      n[e + 7],
                                      22,
                                      -45705983
                                    )),
                                    (v = o(
                                      v,
                                      (m = o(
                                        m,
                                        (l = o(
                                          l,
                                          g,
                                          v,
                                          m,
                                          n[e + 8],
                                          7,
                                          1770035416
                                        )),
                                        g,
                                        v,
                                        n[e + 9],
                                        12,
                                        -1958414417
                                      )),
                                      l,
                                      g,
                                      n[e + 10],
                                      17,
                                      -42063
                                    )),
                                    m,
                                    l,
                                    n[e + 11],
                                    22,
                                    -1990404162
                                  )),
                                  (v = o(
                                    v,
                                    (m = o(
                                      m,
                                      (l = o(
                                        l,
                                        g,
                                        v,
                                        m,
                                        n[e + 12],
                                        7,
                                        1804603682
                                      )),
                                      g,
                                      v,
                                      n[e + 13],
                                      12,
                                      -40341101
                                    )),
                                    l,
                                    g,
                                    n[e + 14],
                                    17,
                                    -1502002290
                                  )),
                                  m,
                                  l,
                                  n[e + 15],
                                  22,
                                  1236535329
                                )),
                                (v = u(
                                  v,
                                  (m = u(
                                    m,
                                    (l = u(
                                      l,
                                      g,
                                      v,
                                      m,
                                      n[e + 1],
                                      5,
                                      -165796510
                                    )),
                                    g,
                                    v,
                                    n[e + 6],
                                    9,
                                    -1069501632
                                  )),
                                  l,
                                  g,
                                  n[e + 11],
                                  14,
                                  643717713
                                )),
                                m,
                                l,
                                n[e],
                                20,
                                -373897302
                              )),
                              (v = u(
                                v,
                                (m = u(
                                  m,
                                  (l = u(l, g, v, m, n[e + 5], 5, -701558691)),
                                  g,
                                  v,
                                  n[e + 10],
                                  9,
                                  38016083
                                )),
                                l,
                                g,
                                n[e + 15],
                                14,
                                -660478335
                              )),
                              m,
                              l,
                              n[e + 4],
                              20,
                              -405537848
                            )),
                            (v = u(
                              v,
                              (m = u(
                                m,
                                (l = u(l, g, v, m, n[e + 9], 5, 568446438)),
                                g,
                                v,
                                n[e + 14],
                                9,
                                -1019803690
                              )),
                              l,
                              g,
                              n[e + 3],
                              14,
                              -187363961
                            )),
                            m,
                            l,
                            n[e + 8],
                            20,
                            1163531501
                          )),
                          (v = u(
                            v,
                            (m = u(
                              m,
                              (l = u(l, g, v, m, n[e + 13], 5, -1444681467)),
                              g,
                              v,
                              n[e + 2],
                              9,
                              -51403784
                            )),
                            l,
                            g,
                            n[e + 7],
                            14,
                            1735328473
                          )),
                          m,
                          l,
                          n[e + 12],
                          20,
                          -1926607734
                        )),
                        (v = c(
                          v,
                          (m = c(
                            m,
                            (l = c(l, g, v, m, n[e + 5], 4, -378558)),
                            g,
                            v,
                            n[e + 8],
                            11,
                            -2022574463
                          )),
                          l,
                          g,
                          n[e + 11],
                          16,
                          1839030562
                        )),
                        m,
                        l,
                        n[e + 14],
                        23,
                        -35309556
                      )),
                      (v = c(
                        v,
                        (m = c(
                          m,
                          (l = c(l, g, v, m, n[e + 1], 4, -1530992060)),
                          g,
                          v,
                          n[e + 4],
                          11,
                          1272893353
                        )),
                        l,
                        g,
                        n[e + 7],
                        16,
                        -155497632
                      )),
                      m,
                      l,
                      n[e + 10],
                      23,
                      -1094730640
                    )),
                    (v = c(
                      v,
                      (m = c(
                        m,
                        (l = c(l, g, v, m, n[e + 13], 4, 681279174)),
                        g,
                        v,
                        n[e],
                        11,
                        -358537222
                      )),
                      l,
                      g,
                      n[e + 3],
                      16,
                      -722521979
                    )),
                    m,
                    l,
                    n[e + 6],
                    23,
                    76029189
                  )),
                  (v = c(
                    v,
                    (m = c(
                      m,
                      (l = c(l, g, v, m, n[e + 9], 4, -640364487)),
                      g,
                      v,
                      n[e + 12],
                      11,
                      -421815835
                    )),
                    l,
                    g,
                    n[e + 15],
                    16,
                    530742520
                  )),
                  m,
                  l,
                  n[e + 2],
                  23,
                  -995338651
                )),
                (v = f(
                  v,
                  (m = f(
                    m,
                    (l = f(l, g, v, m, n[e], 6, -198630844)),
                    g,
                    v,
                    n[e + 7],
                    10,
                    1126891415
                  )),
                  l,
                  g,
                  n[e + 14],
                  15,
                  -1416354905
                )),
                m,
                l,
                n[e + 5],
                21,
                -57434055
              )),
              (v = f(
                v,
                (m = f(
                  m,
                  (l = f(l, g, v, m, n[e + 12], 6, 1700485571)),
                  g,
                  v,
                  n[e + 3],
                  10,
                  -1894986606
                )),
                l,
                g,
                n[e + 10],
                15,
                -1051523
              )),
              m,
              l,
              n[e + 1],
              21,
              -2054922799
            )),
            (v = f(
              v,
              (m = f(
                m,
                (l = f(l, g, v, m, n[e + 8], 6, 1873313359)),
                g,
                v,
                n[e + 15],
                10,
                -30611744
              )),
              l,
              g,
              n[e + 6],
              15,
              -1560198380
            )),
            m,
            l,
            n[e + 13],
            21,
            1309151649
          )),
          (v = f(
            v,
            (m = f(
              m,
              (l = f(l, g, v, m, n[e + 4], 6, -145523070)),
              g,
              v,
              n[e + 11],
              10,
              -1120210379
            )),
            l,
            g,
            n[e + 2],
            15,
            718787259
          )),
          m,
          l,
          n[e + 9],
          21,
          -343485551
        )),
        (l = t(l, i)),
        (g = t(g, a)),
        (v = t(v, d)),
        (m = t(m, h));
    return [l, g, v, m];
  }
  function a(n) {
    var t,
      r = "",
      e = 32 * n.length;
    for (t = 0; t < e; t += 8)
      r += String.fromCharCode((n[t >> 5] >>> t % 32) & 255);
    return r;
  }
  function d(n) {
    var t,
      r = [];
    for (r[(n.length >> 2) - 1] = void 0, t = 0; t < r.length; t += 1) r[t] = 0;
    var e = 8 * n.length;
    for (t = 0; t < e; t += 8)
      r[t >> 5] |= (255 & n.charCodeAt(t / 8)) << t % 32;
    return r;
  }
  function h(n) {
    return a(i(d(n), 8 * n.length));
  }
  function l(n, t) {
    var r,
      e,
      o = d(n),
      u = [],
      c = [];
    for (
      u[15] = c[15] = void 0, o.length > 16 && (o = i(o, 8 * n.length)), r = 0;
      r < 16;
      r += 1
    )
      (u[r] = 909522486 ^ o[r]), (c[r] = 1549556828 ^ o[r]);
    return (e = i(u.concat(d(t)), 512 + 8 * t.length)), a(i(c.concat(e), 640));
  }
  function g(n) {
    var t,
      r,
      e = "";
    for (r = 0; r < n.length; r += 1)
      (t = n.charCodeAt(r)),
        (e +=
          "0123456789abcdef".charAt((t >>> 4) & 15) +
          "0123456789abcdef".charAt(15 & t));
    return e;
  }
  function v(n) {
    return unescape(encodeURIComponent(n));
  }
  function m(n) {
    return h(v(n));
  }
  function p(n) {
    return g(m(n));
  }
  function s(n, t) {
    return l(v(n), v(t));
  }
  function C(n, t) {
    return g(s(n, t));
  }
  function A(n, t, r) {
    return t ? (r ? s(t, n) : C(t, n)) : r ? m(n) : p(n);
  }
  "function" == typeof define && define.amd
    ? define(function () {
        return A;
      })
    : "object" == typeof module && module.exports
    ? (module.exports = A)
    : (n.md5 = A);
})(this);
var getScreenSize = function () {
  if (window.screen.width > window.screen.height) {
    var screenSize = [window.screen.width, window.screen.height];
  } else {
    var screenSize = [window.screen.height, window.screen.width];
  }
  return screenSize;
};

var getAvailScreenSize = function () {
  if (window.screen.availWidth > window.screen.availHeight) {
    var availScreenSize = [window.screen.availWidth, window.screen.availHeight];
  } else {
    var availScreenSize = [window.screen.availHeight, window.screen.availWidth];
  }
  return availScreenSize;
};

var getCookiesEnabled = function () {
  var enabled = window.navigator.cookieEnabled;
  if (!enabled) {
    document.cookie = "fpCookie";
    enabled = document.cookie.indexOf("fpCookie") != -1;
  }
  return enabled;
};

var getMathTan = function () {
  return Math.tan(-1e300);
};

var getDateFormat = function () {
  var date = new Date();
  date.setTime(0);
  return date.toLocaleString();
};

var getTouchCompatibility = function () {
  var maxTouchPoints = 0;
  var touchEvent = false;
  if (typeof window.navigator.maxTouchPoints !== "undefined") {
    maxTouchPoints = window.navigator.maxTouchPoints;
  } else if (typeof window.navigator.msMaxTouchPoints !== "undefined") {
    maxTouchPoints = window.navigator.msMaxTouchPoints;
  }
  try {
    document.createEvent("TouchEvent");
    touchEvent = true;
  } catch (e) {}
  var touchStart = "ontouchstart" in window;
  return [maxTouchPoints, touchEvent, touchStart];
};

var getLanguages = function () {
  var languages = [];
  languages.push(window.navigator.language);
  languages.push(window.navigator.languages);
  languages.push(window.navigator.userLanguage);
  languages.push(window.navigator.browserLanguage);
  languages.push(window.navigator.systemLanguage);
  return languages;
};

var hasLocalStorage = function () {
  var item = "awesome_item";
  try {
    localStorage.setItem(item, item);
    localStorage.removeItem(item);
    return true;
  } catch (e) {
    return false;
  }
};

var hasSessionStorage = function () {
  var item = "nice_item";
  try {
    sessionStorage.setItem(item, item);
    sessionStorage.removeItem(item);
    return true;
  } catch (e) {
    return false;
  }
};

var hasUserData = function () {
  return !!document.createElement("div").addBehavior;
};

var hasIndexedDB = function () {
  try {
    return !!window.indexedDB;
  } catch (e) {
    return true;
  }
};

var hasDoNotTrack = function () {
  return (
    window.navigator.doNotTrack ||
    window.navigator.msDoNotTrack ||
    window.doNotTrack ||
    undefined
  );
};

var getHardwareConcurrency = function () {
  return window.navigator.hardwareConcurrency;
};

var getCpuClass = function () {
  return window.navigator.cpuClass;
};

var getPlatform = function () {
  return window.navigator.platform;
};

var getPlugins = function () {
  var plugins = [];
  if (window.navigator.plugins) {
    for (var i = 0; i < window.navigator.plugins.length; i++) {
      var plugin = window.navigator.plugins[i];
      var mt = plugin[0];
      if (plugin) {
        plugins.push(
          [
            ">Plugin " + i + ": " + plugin.name,
            plugin.filename,
            plugin.description,
            mt.type,
            mt.suffixes,
          ].join(", ")
        );
      }
    }
  }
  return plugins.length == 0 ? "empty" : plugins.join(";;");
};

var getIEPlugins = function () {
  var result = [];
  if (
    (Object.getOwnPropertyDescriptor &&
      Object.getOwnPropertyDescriptor(window, "ActiveXObject")) ||
    "ActiveXObject" in window
  ) {
    var names = [
      "AcroPDF.PDF", // Adobe PDF reader 7+
      "Adodb.Stream",
      "AgControl.AgControl", // Silverlight
      "DevalVRXCtrl.DevalVRXCtrl.1",
      "MacromediaFlashPaper.MacromediaFlashPaper",
      "Msxml2.DOMDocument",
      "Msxml2.XMLHTTP",
      "PDF.PdfCtrl", // Adobe PDF reader 6-
      "QuickTime.QuickTime", // QuickTime
      "QuickTimeCheckObject.QuickTimeCheck.1",
      "RealPlayer",
      "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
      "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
      "Scripting.Dictionary",
      "SWCtl.SWCtl", // ShockWave player
      "Shell.UIHelper",
      "ShockwaveFlash.ShockwaveFlash", // flash plugin
      "Skype.Detection",
      "TDCCtl.TDCCtl",
      "WMPlayer.OCX", // Windows media player
      "rmocx.RealPlayer G2 Control",
      "rmocx.RealPlayer G2 Control.1",
    ];
    // starting to detect plugins in IE
    for (var i = 0; i < names.length; i++) {
      try {
        a = new window.ActiveXObject(names[i]);
        result.push(names[i]);
      } catch (e) {}
    }
  }
  return result.length == 0 ? "empty" : result;
};

var getWebGLVendor = function () {
  try {
    var canvas = document.createElement("canvas");
    var ctx =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return ctx.getParameter(
      ctx.getExtension("WEBGL_debug_renderer_info").UNMASKED_VENDOR_WEBGL
    );
  } catch (e) {
    return "not supported";
  }
};

var getWebGLRenderer = function () {
  try {
    var canvas = document.createElement("canvas");
    var ctx =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return ctx.getParameter(
      ctx.getExtension("WEBGL_debug_renderer_info").UNMASKED_RENDERER_WEBGL
    );
  } catch (e) {
    return "not supported";
  }
};

var getInstalledFontsJs = function () {
  var fontList = [
    "Andale Mono",
    "Arial",
    "Arial Black",
    "Arial Hebrew",
    "Arial MT",
    "Arial Narrow",
    "Arial Rounded MT Bold",
    "Arial Unicode MS",
    "Bitstream Vera Sans Mono",
    "Book Antiqua",
    "Bookman Old Style",
    "Calibri",
    "Cambria",
    "Cambria Math",
    "Century",
    "Century Gothic",
    "Century Schoolbook",
    "Comic Sans",
    "Comic Sans MS",
    "Consolas",
    "Courier",
    "Courier New",
    "Garamond",
    "Geneva",
    "Georgia",
    "Helvetica",
    "Helvetica Neue",
    "Impact",
    "Lucida Bright",
    "Lucida Calligraphy",
    "Lucida Console",
    "Lucida Fax",
    "LUCIDA GRANDE",
    "Lucida Handwriting",
    "Lucida Sans",
    "Lucida Sans Typewriter",
    "Lucida Sans Unicode",
    "Microsoft Sans Serif",
    "Monaco",
    "Monotype Corsiva",
    "MS Gothic",
    "MS Outlook",
    "MS PGothic",
    "MS Reference Sans Serif",
    "MS Sans Serif",
    "MS Serif",
    "MYRIAD",
    "MYRIAD PRO",
    "Palatino",
    "Palatino Linotype",
    "Segoe Print",
    "Segoe Script",
    "Segoe UI",
    "Segoe UI Light",
    "Segoe UI Semibold",
    "Segoe UI Symbol",
    "Tahoma",
    "Times",
    "Times New Roman",
    "Times New Roman PS",
    "Trebuchet MS",
    "Ubuntu",
    "Verdana",
    "Wingdings",
    "Wingdings 2",
    "Wingdings 3",
  ];

  var baseFonts = ["monospace", "sans-serif", "serif"];
  var testString = "mmmmmmmmmmlli";
  var testSize = "72px";

  var h = document.getElementsByTagName("body")[0];

  var s = document.createElement("span");
  s.style.position = "absolute";
  s.style.left = "-9999px";
  s.style.lineHeight = "normal";

  // css reset
  s.style.fontStyle = "normal";
  s.style.fontWeight = "normal";
  s.style.letterSpacing = "normal";
  s.style.lineBreak = "auto";
  s.style.lineHeight = "normal";
  s.style.texTransform = "none";
  s.style.textAlign = "left";
  s.style.textDecoration = "none";
  s.style.textShadow = "none";
  s.style.whiteSpace = "normal";
  s.style.wordBreak = "normal";
  s.style.wordSpacing = "normal";

  s.style.fontSize = testSize;
  s.innerHTML = testString;
  var defaultWidth = {};
  var defaultHeight = {};
  for (var index = 0, length = baseFonts.length; index < length; index++) {
    //get the default width for the three base fonts
    s.style.fontFamily = baseFonts[index];
    h.appendChild(s);
    defaultWidth[baseFonts[index]] = s.offsetWidth; //width for the default font

    defaultHeight[baseFonts[index]] = s.offsetHeight; //height for the defualt font
    h.removeChild(s);
  }
  var detect = function (font) {
    var detected = false;
    for (var index = 0, l = baseFonts.length; index < l; index++) {
      s.style.fontFamily = font + "," + baseFonts[index]; // name of the font along with the base font for fallback.
      h.appendChild(s);
      var matched =
        s.offsetWidth !== defaultWidth[baseFonts[index]] ||
        s.offsetHeight !== defaultHeight[baseFonts[index]];
      h.removeChild(s);
      detected = detected || matched;
    }
    return detected;
  };

  var available = [];
  var jsInstalledFonts = "";
  for (var i = 0, l = fontList.length; i < l; i++) {
    if (detect(fontList[i])) {
      jsInstalledFonts += fontList[i];
      jsInstalledFonts += ";";
    }
  }
  return jsInstalledFonts;
};

function audioFp(callback) {
  var audio_output = 0;
  try {
    if (
      ((context = new (window.OfflineAudioContext ||
        window.webkitOfflineAudioContext)(1, 44100, 44100)),
      !context)
    ) {
      audio_output = 0;
    }

    // Create oscillator
    oscillator = context.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setTargetAtTime(1e4, 0, 0.01);

    // Create and configure compressor
    compressor = context.createDynamicsCompressor();
    compressor.threshold && compressor.threshold.setTargetAtTime(-50, 0, 0.01);
    compressor.knee && compressor.knee.setTargetAtTime(40, 0, 0.01);
    compressor.ratio && compressor.ratio.setTargetAtTime(12, 0, 0.01);
    compressor.reduction && compressor.reduction.setTargetAtTime(-20, 0, 0.01);
    compressor.attack && compressor.attack.setTargetAtTime(0, 0, 0.01);
    compressor.release && compressor.release.setTargetAtTime(0.25, 0, 0.01);

    // Connect nodes
    oscillator.connect(compressor);
    compressor.connect(context.destination);

    // Start audio processing
    oscillator.start(0);
    context.startRendering();
    context.oncomplete = function (evnt) {
      for (var i = 4500; 5e3 > i; i++) {
        audio_output += Math.abs(evnt.renderedBuffer.getChannelData(0)[i]);
      }
      compressor.disconnect();
      //console.log(audio_output);
      callback(audio_output);
    };
  } catch (e) {
    audio_output = 0;
  }
}

var canvas = document.createElement("canvas");
var getCanvasFp = function () {
  var result = [];
  // Very simple now, need to make it more complex (geo shapes etc)
  canvas.width = 2000;
  canvas.height = 200;
  canvas.style.display = "inline";
  var ctx = canvas.getContext("2d");
  // detect browser support of canvas winding
  // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
  ctx.rect(0, 0, 10, 10);
  ctx.rect(2, 2, 6, 6);
  result.push(
    "canvas winding:" +
      (ctx.isPointInPath(5, 5, "evenodd") === false ? "yes" : "no")
  );

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.font = "13pt no-real-font-123";
  ctx.fillText(
    "Sphinx of black quartz, judge my vow \ud83d\udc3c\ud83d\ude04",
    2,
    20
  );
  ctx.fillStyle = "rgba(102, 204, 0, 0.23456789)";
  ctx.font = "18pt Arial";
  ctx.fillText(
    "Sphinx of black quartz, judge my vow \ud83d\udc3c\ud83d\ude04",
    4,
    22
  );

  // canvas blending
  // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
  // http://jsfiddle.net/NDYV8/16/
  ctx.globalCompositeOperation = "multiply";
  ctx.fillStyle = "rgb(255,0,255)";
  ctx.beginPath();
  ctx.arc(50.123456789, 50, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(0,255,255)";
  ctx.beginPath();
  ctx.arc(100, 50.456, 50, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(255,125,0)";
  ctx.beginPath();
  ctx.arc(75, 100, 50.789, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgb(125,0,255)";
  // canvas winding
  // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
  // http://jsfiddle.net/NDYV8/19/Â§
  ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
  ctx.shadowBlur = 10;
  ctx.shadowColor = "blue";
  ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
  ctx.fill("evenodd");

  if (canvas.toDataURL) {
    result.push("canvas fp:" + canvas.toDataURL());
  }
  window.canvasThing = canvas;
  return md5(result.join("~"));
};

var getCookie = function (name) {
  match = document.cookie.match(new RegExp(name + "=([^;]+)"));
  if (match) return match[1];
};

var setCookie = function (key, value) {
  document.cookie = key + "=" + value;
};

var generateUuid = function () {
  var d = new Date();
  return d.getTime() + ":" + Math.random().toString().slice(2, 11);
};

var dataList = {};
var _fbgenerateTime0 = null;
var _fbtimeElapsed = null;
var _fbcode = null;
function storeFingerprint() {
  try {
    _fbgenerateTime0 = performance.now();
    var canvas = document.createElement("canvas");
    var ctx =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

    dataList.timezone = new Date().getTimezoneOffset();
    dataList.screenSize = getScreenSize();
    dataList.availSize = getAvailScreenSize();
    dataList.colorDepth = window.screen.colorDepth;
    dataList.pixelRatio = window.devicePixelRatio;
    dataList.userAgent = window.navigator.userAgent;
    dataList.cookiesEnabled = getCookiesEnabled();
    dataList.mathtan = getMathTan();
    dataList.dateFormat = getDateFormat();
    dataList.touchCompatibility = getTouchCompatibility();
    dataList.languages = getLanguages();
    dataList.localStorage = hasLocalStorage();
    dataList.sessionStorage = hasSessionStorage();
    dataList.userData = hasUserData();
    dataList.indexedDB = hasIndexedDB();
    dataList.doNotTrack = hasDoNotTrack();
    dataList.hardwareConcurrency = getHardwareConcurrency();
    dataList.cpuClass = getCpuClass();
    dataList.platform = getPlatform();
    dataList.plugins = getPlugins();
    dataList.iePlugins = getIEPlugins();
    dataList.webGLVendor = getWebGLVendor();
    dataList.webGLRenderer = getWebGLRenderer();
    dataList.adBlock = document.getElementById("ads") ? false : true;
    dataList.installedFontsJs = getInstalledFontsJs();
    dataList.canvasFp = getCanvasFp();
    audioFp(showResults);
    _fbtimeElapsed = performance.now() - _fbgenerateTime0;
    //console.log('Time elapsed: ' + _fbtimeElapsed.toFixed(2) + 'ms');
  } catch (e) {}
}

function ajaxWphRequest(url, method, callback, params) {
  var obj;
  try {
    obj = new XMLHttpRequest();
  } catch (e) {
    try {
      obj = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
      try {
        obj = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (e) {
        alert("Your browser does not support Ajax.");
        return false;
      }
    }
  }
  obj.onreadystatechange = function () {
    if (obj.readyState == 4) {
      callback(obj);
    }
  };
  obj.open(method, url, true);
  obj.send(params);
  return obj;
}

var text_truncate = function (str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = "...";
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};

var wphFingerPrint_ = null;

var showResults = function (audioOutput) {
  dataList.audio = audioOutput;

  window.dataList = dataList;

  var htmlData = '<div style="display:none;"';

  var fingerprint = JSON.stringify(dataList);

  if (getCookie("vfpc")) {
    var uuid = getCookie("vfpc");
  } else {
    var uuid = generateUuid();
    setCookie("vfpc", uuid);
  }

  var basicItems = {};

  for (var item in dataList) {
    //console.log(item + ': ' + dataList[item]);
    if (item === "canvasFp") {
      htmlData +=
        "<tr><td>" +
        item +
        "</td><td>" +
        dataList[item] +
        '<br><div id="canvas-placeholder"></div></td></tr>';
    } else {
      htmlData +=
        "<tr><td>" +
        item +
        "</td><td>" +
        dataList[item] +
        '</td><div id="canvas-placeholder"></div></tr>';
    }

    switch (item) {
      case "canvasFp":
        basicItems[item] = dataList[item];
        break;
      case "userAgent":
        basicItems[item] = dataList[item];
        break;
      case "installedFontsJs":
        basicItems[item] = dataList[item];
        break;
      case "webGLRenderer":
        basicItems[item] = dataList[item];
        break;
      case "webGLVendor":
        basicItems[item] = dataList[item];
        break;
    }
  }

  var element = document.querySelector("body");
  // The element to be appended
  var fjtable = document.createElement("htmlDatafJ");
  fjtable.innerHTML =
    htmlData +
    '<table id="dataTable" class="table table-striped table-bordered table-hover table-main text-left"></table></div>';
  // append
  element.appendChild(fjtable);
  document.getElementById("canvas-placeholder").appendChild(window.canvasThing);

  var contentFj = JSON.parse(fingerprint).canvasFp;
  //  wphFingerPrint_  	= btoa(JSON.stringify(basicItems));
  _fbcode = btoa(JSON.stringify(basicItems));
  const event = new CustomEvent("buildFingerPrint", {
    detail: { fingerprint: _fbcode, timeelapser: _fbtimeElapsed.toFixed(2) },
  });
  // Dispatch/Trigger/Fire the event
  document.dispatchEvent(event);

  if (document.querySelector("htmlDatafJ") != null) {
    document.querySelector("htmlDatafJ").remove();
  }
};
//Call fingerprint
storeFingerprint();
