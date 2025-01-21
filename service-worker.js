self.addEventListener('push', function (event) {
  const data = event.data.json();  // プッシュ通知データをJSONとして取得
  
  // GAS Web Apps の URL
  const gasUrl = 'YOUR_GAS_WEB_APP_URL';

  // GAS に通知データを POST で送信
  fetch(gasUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: data.title || '新しい通知',
      body: data.body || '詳細を確認してください。',
      url: data.url || 'https://example.com'
    })
  });
  
  // 通知を表示
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
    })
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
