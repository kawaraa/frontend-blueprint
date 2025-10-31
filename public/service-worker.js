// self.importScripts('foo.js', 'bar.js');
const staticFileCacheName = "static-files-v-xxx";
const staticFileCachePaths = [
  "/offline.html",
  "/manifest.json",
  "/favicon-16x16.png",
  "/favicon-32x32.png",
  "/favicon.ico",
  "/desktop-screenshot.png",
  "/android-chrome-512x512.png",
  "/android-chrome-192x192.png",
  "/apple-touch-icon.png",
  "/bell-notification-sound.mp3",
  "/login",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(caches.open(staticFileCacheName).then((cache) => cache.addAll(staticFileCachePaths)));
  self.skipWaiting();
});

self.addEventListener("activate", async (evt) => {
  console.log(staticFileCacheName);
  evt.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => key != staticFileCacheName && caches.delete(key))))
      .catch(console.error) // Handle cache failures
  );
});

self.addEventListener("fetch", (evt) => evt.respondWith(handleRequest(evt.request)));

self.addEventListener("push", (event) => {
  const customPayload = {
    title: "New notification from xxx app",
    body: "Open xxx app to see it!",
    url: "/",
  };
  const payload = event.data?.json() || customPayload;

  const showNotification = self.registration.showNotification(payload.title, {
    body: payload.body,
    icon: "/android-chrome-192x192.png",
    sound: "/bell-notification-sound.mp3",
    // badge: "/icons/badge.png",
    vibrate: [200, 100, 200],
    data: { url: `${self.location.origin}${payload.url || customPayload.url}` }, // Optional: URL to open when clicked
  });

  const placeSound = clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
    const focusedClient = clients.find((client) => client.focused) || clients[0];
    if (focusedClient) {
      focusedClient.postMessage({ action: "playSound", url: "/bell-notification-sound.mp3" });
    }
  });

  event.waitUntil(Promise.all([showNotification, placeSound]));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

const handleRequest = async (request) => {
  // console.log("Received request:>>>", navigator.onLine, request.method, request.url);
  try {
    if (
      !request.url.includes("http") ||
      !["GET", "HEAD"].includes(request.method) ||
      /\/api(\/|$)/.test(new URL(request.url).pathname)
    ) {
      return fetch(request);
    } else {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) return cachedResponse;

      // if (!navigator.onLine) {
      //   const res = await caches.match(request.url);
      //   if (res) return res;
      // }

      const response = await fetch(request);

      if (response.status === 200) {
        const cache = await caches.open(staticFileCacheName);
        cache.put(request, response.clone()).catch(() => null); // Ignore the error in case the responses can not be cached or is not supported in cashing like "POST", "PUT" and responses with 206 status code
      }

      return response;
    }
  } catch (error) {
    // console.log("caches ERROR: >>>", request.method, request.url, error);
    if (request.mode == "navigate") {
      const offlinePage = await caches.match("/offline.html"); // offline fallback page
      if (offlinePage) return offlinePage;
    }
    // return Response.error(); // networkErrorResponse
    return new Response("Network error", { status: 408 });
  }
};
