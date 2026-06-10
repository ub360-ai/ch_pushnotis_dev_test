var API = 'https://44a1be53-2e26-469c-ae26-33a4738b95a2-00-39hqfrb197tbc.riker.replit.dev/pn';
self.addEventListener('push', function(event) {
  if (!event.data) return;
  var data = {};
  try { data = event.data.json(); } catch(e) {}
  event.waitUntil(
    self.registration.showNotification(data.title  'Notification', {
      body: data.body  '',
      icon: data.icon  undefined,
      image: data.image  undefined,
      data: { url: data.url  '/', campaignId: data.campaignId }
    })
  );
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url)  '/';
  var cid = event.notification.data && event.notification.data.campaignId;
  event.waitUntil(
    clients.openWindow(url).then(function() {
      if (cid) fetch(API + '/sdk/click?cid=' + cid, { method: 'POST' }).catch(function(){});
    })
  );
});
