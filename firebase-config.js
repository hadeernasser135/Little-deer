// إعدادات مشروع Firebase الخاص بكتاب Little Deer Grammar
// (نفس الإعدادات في كل صفحات النظام - متتغيّرش إلا لو غيّرتِ مشروع Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAP0Oujtvl8E1CISGGDZ8x8tzZyyeWEmMc",
  authDomain: "little-deer-grammer-1.firebaseapp.com",
  projectId: "little-deer-grammer-1",
  storageBucket: "little-deer-grammer-1.firebasestorage.app",
  messagingSenderId: "541624651160",
  appId: "1:541624651160:web:e4bb6164bb48ad9b31afed",
  measurementId: "G-N64MFZ87QE"
};

// إيميل حساب المديرة (هادير) - هو الوحيد اللي هيقدر يدخل صفحة الموافقات
const ADMIN_EMAIL = "hadeernasser135@gmail.com";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
