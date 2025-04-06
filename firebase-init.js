(function() {
  console.log('Firebase initialization script started');
  
  window.firebaseIsLoading = window.firebaseIsLoading || false;
  
  if (typeof firebase !== 'undefined') {
    console.log('Firebase already loaded, skipping initialization');
    return;
  }
  
  if (window.firebaseIsLoading) {
    console.log('Firebase is already being loaded, waiting...');
    return;
  }
  
  window.firebaseIsLoading = true;
  console.log('Starting Firebase SDK loading process...');
  
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      console.log(`Attempting to load script: ${src}`);
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.onload = () => {
        console.log(`Script loaded successfully: ${src}`);
        resolve();
      };
      script.onerror = (err) => {
        const error = new Error(`Failed to load script: ${src}`);
        console.error(error, err);
        reject(error);
      };
      document.head.appendChild(script);
    });
  }

  Promise.all([
    loadScript('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js'),
    loadScript('https://www.gstatic.com/firebasejs/9.6.10/firebase-auth-compat.js')
  ]).then(() => {
    if (typeof firebase !== 'undefined') {
      console.log('Firebase SDK loaded successfully, initializing app...');
      
      const firebaseConfig = {
        apiKey: "AIzaSyDaeY081ZllYfyIUbEEuBnthVNfAlKVxtM",
        authDomain: "vote-a9b90.firebaseapp.com",
        projectId: "vote-a9b90",
        storageBucket: "vote-a9b90.appspot.com",
        messagingSenderId: "417903220094",
        appId: "1:417903220094:web:edcefea6bab191c4b5cf2f",
        measurementId: "G-JYLMMNNWN3"
      };

      try {
        console.log('Attempting to initialize Firebase with config:', JSON.stringify(firebaseConfig));
        
        if (firebase.apps && firebase.apps.length) {
          console.log('Existing Firebase apps found, using first instance');
          firebase.app();
        } else {
          console.log('No existing Firebase apps, creating new instance');
          firebase.initializeApp(firebaseConfig);
          console.log('Firebase initialized successfully');
        }
        
        if (firebase.auth) {
          console.log('Firebase auth is available');
          
          const auth = firebase.auth();
          
          if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
            auth.settings.appVerificationDisabledForTesting = true;
            console.log('Running in development mode - relaxed security settings');
          }
          
          const currentUser = auth.currentUser;
          console.log('Current user:', currentUser ? 'User is signed in' : 'No user signed in');
          
          auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
              console.log('Firebase persistence set to LOCAL');
            })
            .catch((error) => {
              console.warn('Could not set persistence:', error);
            });
        } else {
          console.error('Firebase auth is not available!');
        }
        
        const firebaseReadyEvent = new CustomEvent('firebase-ready', { 
          detail: { success: true }
        });
        document.dispatchEvent(firebaseReadyEvent);
        
        window.firebaseIsLoading = false;
        console.log('Firebase initialization completed successfully');
      } catch (e) {
        console.error('Firebase initialization error:', e);
        const firebaseFailedEvent = new CustomEvent('firebase-failed', { 
          detail: { error: e }
        });
        document.dispatchEvent(firebaseFailedEvent);
        window.firebaseIsLoading = false;
      }
    } else {
      console.error('Firebase SDK not available after loading scripts');
      window.firebaseIsLoading = false;
      const firebaseFailedEvent = new CustomEvent('firebase-failed', { 
        detail: { error: new Error('Firebase SDK not available after loading scripts') }
      });
      document.dispatchEvent(firebaseFailedEvent);
    }
  }).catch(error => {
    console.error('Failed to load Firebase scripts:', error);
    window.firebaseIsLoading = false;
    const firebaseFailedEvent = new CustomEvent('firebase-failed', { 
      detail: { error: error }
    });
    document.dispatchEvent(firebaseFailedEvent);
  });
})();
