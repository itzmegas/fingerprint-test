import type { APIRoute } from "astro";

export const prerender = false;
const options = { method: "GET", headers: { accept: "application/json" } };
export const GET: APIRoute = async ({ params }) => {
  const requestId = params.id;
  const apiKey = "1TdssyasXSKGNldFtFVA";

  const response = await fetch(
    `https://eu.api.fpjs.io/events/${requestId}?api_key=${apiKey}`,
    options
  );

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
};
