import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js';
import { getAnalytics, isSupported } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-analytics.js';

const firebaseConfig = {
  apiKey: 'AIzaSyAhekjfzVOLIvD4XOMidBAZPlFNlCISeL8', authDomain: 'mediqueue-92d0b.firebaseapp.com',
  projectId: 'mediqueue-92d0b', storageBucket: 'mediqueue-92d0b.firebasestorage.app', messagingSenderId: '624314311987',
  appId: '1:624314311987:web:1a788b9c66c805bede4a46', measurementId: 'G-WE7W82T9H7'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
isSupported().then((supported) => supported && getAnalytics(app)).catch(() => {});
export { app, auth, db };
