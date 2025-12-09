// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBe0JeYvxp7j2fE1RotuOM_z9mO6e2_GNs",
    authDomain: "my-project-9709d.firebaseapp.com",
    projectId: "my-project-9709d",
    storageBucket: "my-project-9709d.firebasestorage.app",
    messagingSenderId: "433310233766",
    appId: "1:433310233766:web:47276683cf49bd4f8ef067",
    measurementId: "G-LHDJ0DB48Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);