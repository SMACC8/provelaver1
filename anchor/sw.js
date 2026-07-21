const CACHE='anchor-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/boat-icon-128.png','./assets/boat-icon-256.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>Promise.all(ASSETS.map(u=>c.add(new Request(u,{cache:'reload'})).catch(()=>{})))).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('anchor')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const req=e.request;if(req.method!=='GET')return;
  e.respondWith(caches.match(req).then(m=>m||fetch(req).catch(()=>caches.match('./index.html'))));});
