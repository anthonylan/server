  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBTEzbe6evFXqVqhoCgeLJhjer8M4GK3no",
    authDomain: "notify-1b85b.firebaseapp.com",
    databaseURL: "https://notify-1b85b.firebaseio.com",
    projectId: "notify-1b85b",
    storageBucket: "notify-1b85b.appspot.com",
    messagingSenderId: "501820514644",
    appId: "1:501820514644:web:08497adce22ce22b5268c1",
    measurementId: "G-6W1D34JP8X"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()


document.querySelector('#notification-button').onclick = async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      alert('you need to allow push notifications');
    } else {
      const timestamp = new Date().getTime() + 5 * 1000; // now plus 5000ms
      reg.showNotification(
        'Demo Push Notification',
        {
          tag: timestamp, // a unique ID
          body: 'Hello World', // content of the push notification
          showTrigger: timestamp, //new TimestampTrigger(timestamp), // set the time for the push notification
          data: {
            url: window.location.href, // pass the current url to the notification
          },
          badge: '',
          icon: '',
          actions: [
            {
              action: 'open',
              title: 'Open app'
            },
            {
              action: 'close',
              title: 'Close notification',
            }
          ]
        }
      )
    }
  });
};


// application.js
document.querySelector('#notification-cancel').onclick = async () => {
  const reg = await navigator.serviceWorker.getRegistration();
  const notifications = await reg.getNotifications({
    includeTriggered: true
  });
  notifications.forEach(notification => notification.close());
  alert(`${notifications.length} notification(s) cancelled`);
};


navigator.serviceWorker.addEventListener('message', event => console.log(event.data));
