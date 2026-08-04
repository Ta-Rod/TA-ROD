const CACHE_NAME = 'ta-rod-cache-v3';
const PRECACHE_URLS = [
  'index.html',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  // Para la página en sí (navegación) se ignora la caché HTTP del navegador: si no, aunque
  // este fetch "de red" se ejecute, el navegador podía devolver una respuesta HTTP ya cacheada
  // en vez de ir a buscar la versión recién publicada — que fue justo lo que causó que la app
  // instalada siguiera mostrando cambios viejos aunque el deploy ya estuviera listo.
  const isNavigation = event.request.mode === 'navigate';
  const req = isNavigation ? new Request(event.request.url, { cache: 'no-store' }) : event.request;
  event.respondWith(
    fetch(req)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
