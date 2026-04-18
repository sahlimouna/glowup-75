/* اسم النسخة الخاصة بالتخزين */
const cacheName = 'glow-up-v1';

/* قائمة الملفات التي نريد تخزينها لتعمل أوفلاين */
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap'
];

/* الخطوة 1: تثبيت الخدمة وتخزين الملفات */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('تم تخزين الملفات بنجاح');
      return cache.addAll(assets);
    })
  );
});

/* الخطوة 2: تفعيل الخدمة وتنظيف النسخ القديمة */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== cacheName)
            .map((key) => caches.delete(key))
      );
    })
  );
});

/* الخطوة 3: اعتراض طلبات الشبكة وتقديم النسخة المخزنة */
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // إذا وجد الملف في المخزن أعده، وإلا اطلبه من الإنترنت
      return response || fetch(event.request);
    })
  );
});