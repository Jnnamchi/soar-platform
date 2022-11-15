// Import the functions you need from the SDKs you need
import firebase from "firebase/app"
import "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXVZp0kSLcFMo8VDQnrQlX-72N1WmZZYM",
  authDomain: "soar-platform.firebaseapp.com",
  projectId: "soar-platform",
  storageBucket: "soar-platform.appspot.com",
  messagingSenderId: "815543405247",
  appId: "1:815543405247:web:f9249949512e33ad43540a",
  measurementId: "${config.measurementId}"
};

// Initialize Firebase
// Initialize and export Firebase
firebase.initializeApp(firebaseConfig)
export const firebasePackage = firebase

// When ever the user authentication state changes, save the new user role
// firebase.auth().onAuthStateChanged( (user) => {
//   if (user) {
// 	console.log("Auth state changed")
//   } else {
//     console.log("Null user")
//   }
// })

// Exported Functions
export function userIsLoggedIn () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return true
  }
  return false
}

export function getCurrentUser () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return {
      "name": currentUser.displayName,
      "uuid": currentUser.uid
    }
  }
}

export function getCurrentUserId (): string {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.uid
  }
  return "vANGKub2xBNrryjP3aYMix6jZ6n1"
}

export function getCurrentUserName () {
  const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.displayName
  }
  return null
}

export function getCurrentUserEmail () {
    const currentUser = firebase.auth().currentUser
  if (currentUser) {
    return currentUser.email
  }
  return null
}

export function logoutFirebase () {
  firebase.auth().signOut().then(() => {
    // this.$router.push('/')
    console.log("Logged Out")
  })
}

export function getUserLoggedIn () {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebase.auth().onAuthStateChanged(user => {
            unsubscribe();
            resolve(user);
        }, reject);
    })
}