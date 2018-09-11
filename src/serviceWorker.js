/* eslint-disable no-restricted-globals, no-console */

const CACHE_NAME = 'garage-status-cache-v1';
const baseUrl = self.location.hostname === 'localhost' ? '' : 'https://www.lynx.mobi';
const urlsToCache = [
  '/offline.html',
  `${baseUrl}/favicon-16.png`,
  `${baseUrl}/favicon-32.png`,
  `${baseUrl}/favicon-96.png`,
  '/apple-icon-120.png',
  '/apple-icon-152.png',
  '/apple-icon-167.png',
  '/apple-icon-180.png',
  '/icons-192.png',
  '/icons-512.png',
  'https://unpkg.com/react@16/umd/react.production.min.js',
  'https://unpkg.com/prop-types/prop-types.min.js',
  'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
  'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://use.fontawesome.com/releases/v5.0.7/css/all.css',
  // 'https://cdn.jsdelivr.net/chartist.js/latest/chartist.min.css',
  // 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.css',
  // 'https://unpkg.com/leaflet@1.3.3/dist/leaflet.js',
];
const nonCacheableUrls = ['/socket.io', '/api', 'https://cognito-identity'];
const imageExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.svg'];
const cacheableUrls = [...imageExtensions, '.woff', 'woff2', '.ttf', '.otf', '.min.css', '.min.js'];
const offlineImage = `
    <svg role="img" aria-labelledby="offline-title" viewBox="0 0 400 300" xmlns="https://www.w3.org/2000/svg">
      <title id="offline-title">Offline</title>
      <g fill="none" fill-rule="evenodd"><path fill="#D8D8D8" d="M0 0h400v300H0z"/>
        <text fill="#9B9B9B" font-family="Times New Roman,Times,serif" font-size="72" font-weight="bold">
        <tspan x="93" y="172">offline</tspan></text>
      </g>
    </svg>`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache)),
  );
});

function isNonCacheableRequest(request) {
  return request.method !== 'GET'
    || nonCacheableUrls.filter(url => request.url.indexOf(url) > -1).length;
}

function isCacheableRequest(request) {
  return request.method === 'GET'
    && (!!urlsToCache.filter(url => request.url.indexOf(url) > -1).length
     || !!cacheableUrls.filter(url => request.url.indexOf(url) > -1).length
    )
    && !isNonCacheableRequest(request);
}

function addToCache(request, response) {
  // console.log('trying to save to cache', response.ok || response, request.url);
  if (response.ok) {
    const clonedResponse = response.clone();

    // console.log('saving to cache', request.url);
    caches.open(CACHE_NAME)
      .then(cache => cache.put(request, clonedResponse));
  }

  return response;
}

function fetchFromCache(request) {
  // console.log('fetching from cache', request.url);
  return caches.match(request)
    .then((cacheResponse) => {
      // console.log('from cache', !!cacheResponse, request.url);

      if (cacheResponse) return cacheResponse;

      // console.log('cache miss', request.url);

      return fetch(request)
        .then(response => addToCache(request, response));
    });
}

function offlineResponse(request) {
  const { url } = request;
  // console.log('falling back to offline content', url);
  if (imageExtensions.filter(ext => url.indexOf(ext) > -1).length) {
    return new Response(offlineImage, { headers: { 'Content-Type': 'image/svg+xml' } });
  }

  if (url.indexOf('/offline.html') === -1 && request.headers.get('Accept').indexOf('text/html') > -1) {
    // console.log('redirecting to offline page');
    return Response.redirect('/offline.html', 302);
  }

  // console.log('everything failed', url);
  return Response.error();
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // console.log('request', request.url, isCacheableRequest(request));
  if (isCacheableRequest(request)) {
    event.respondWith(
      fetchFromCache(request)
        .catch(() => offlineResponse(request)),
    );
  } else {
    event.respondWith(
      fetch(request)
        .catch(() => offlineResponse(request)),
    );
  }
});
