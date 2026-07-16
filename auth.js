import { auth } from './firebase.js';
import { browserLocalPersistence, browserSessionPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js';

const $ = (id) => document.getElementById(id);
const form = $('loginForm'), button = $('loginButton'), errorBox = $('loginError');
onAuthStateChanged(auth, (user) => { if (user) window.location.replace('dashboard.html'); });

function showError(message) { errorBox.textContent = message; errorBox.hidden = false; }
function setLoading(loading) { button.disabled = loading; button.querySelector('.button-text').textContent = loading ? 'Signing in…' : 'Sign in'; button.querySelector('.button-spinner').hidden = !loading; }
function friendlyError(error) { const codes = { 'auth/invalid-credential': 'Incorrect email or password.', 'auth/invalid-email': 'Enter a valid email address.', 'auth/too-many-requests': 'Too many attempts. Please wait and try again.', 'auth/network-request-failed': 'No internet connection. Please try again.' }; return codes[error.code] || 'Unable to sign in. Please try again.'; }
form.addEventListener('submit', async (event) => { event.preventDefault(); errorBox.hidden = true; const email = $('email').value.trim(), password = $('password').value; if (!email || !password) return showError('Enter your email address and password.'); setLoading(true); try { await setPersistence(auth, $('remember').checked ? browserLocalPersistence : browserSessionPersistence); await signInWithEmailAndPassword(auth, email, password); } catch (error) { showError(friendlyError(error)); setLoading(false); } });
$('passwordToggle').addEventListener('click', () => { const input = $('password'), show = input.type === 'password'; input.type = show ? 'text' : 'password'; $('passwordToggle').textContent = show ? 'Hide' : 'Show'; });
$('forgotPassword').addEventListener('click', async () => { const email = $('email').value.trim(); if (!email) return showError('Enter your email address first, then choose Forgot password.'); try { await sendPasswordResetEmail(auth, email); showToast('Password reset email sent.'); } catch (error) { showError(error.code === 'auth/user-not-found' ? 'No account exists for this email.' : 'Could not send password reset email.'); } });
function showToast(message) { const toast = $('toast'); toast.textContent = message; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 4000); }
