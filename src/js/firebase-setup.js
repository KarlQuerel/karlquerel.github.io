// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWhnqOzsDExtNu14s_gxUpAWeV-PPPog8",
  authDomain: "click-counter-4f529.firebaseapp.com",
  projectId: "click-counter-4f529",
  storageBucket: "click-counter-4f529.firebasestorage.app",
  messagingSenderId: "950861743362",
  appId: "1:950861743362:web:77dc41eb31b34334566e1b",
  measurementId: "G-7EEMWQS33Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const clickRef = doc(db, "clicks", "counter");

// Function to update and display clicks
async function updateClicks() {
  await updateDoc(clickRef, {
    count: increment(1)
  });
  const docSnap = await getDoc(clickRef);
  if (docSnap.exists()) {
    document.getElementById("counter").innerText = docSnap.data().count;
  }
}

// Display initial count
async function loadClicks() {
  const docSnap = await getDoc(clickRef);
  if (docSnap.exists()) {
    document.getElementById("counter").innerText = docSnap.data().count;
  }
}

// Run on page load
loadClicks();

// Button event listener
document.getElementById("clicker").addEventListener("click", updateClicks);
