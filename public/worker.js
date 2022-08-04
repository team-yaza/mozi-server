console.log('서비스워커 로드됨...');

self.addEventListener('push', (e) => {
  const data = e.data.json();
  console.log('push 받음');
  self.registration.showNotification(data.title, {
    body: 'Notified by Noel',
    icon: 'https://tistory2.daumcdn.net/tistory/2794117/attach/aa31f12030a2404cafc028e2c8e2b1af',
  });
});
