console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data)
    console.log('Notification Received a lootttt');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'f.png',
        badge:'f.png'
    });
});

self.addEventListener('notificationclick', function(event) {
    let url = 'http://zonadigitalweb.com:4000/serviflash/servicios_pendientes';
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});