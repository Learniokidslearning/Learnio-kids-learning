// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDE3B-6cxVvhr75GB2GkvEbseHLSIZMmBk",
  authDomain: "learniokidslearning-ee6f9.firebaseapp.com",
  projectId: "learniokidslearning-ee6f9",
  storageBucket: "learniokidslearning-ee6f9.firebasestorage.app",
  messagingSenderId: "39907579353",
  appId: "1:39907579353:web:91ccb1a083f2ac5f67f5c8",
  measurementId: "G-KSMT5XS3YQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Contact form handler (works only if a form exists on the page)
const contactForm = document.querySelector('form:not([onsubmit])');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting Learniokidslearning! We will reply soon.');
    this.reset();
  });
}

// Signup function
window.signupUser = async function (event) {
  event.preventDefault();

  const name = document.getElementById("signupName").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    // Save user data to Firestore
    await addDoc(collection(db, "users"), {
      name: name,
      email: email,
      password: password, // For learning/demo only. Do not store plain passwords in production.
      createdAt: new Date().toISOString()
    });

    alert("Account created successfully!");
    window.location.href = "login.html";
  } catch (error) {
    alert("Error saving data: " + error.message);
    console.error(error);
  }
};
