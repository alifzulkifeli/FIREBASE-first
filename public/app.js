const auth = firebase.auth()

const whenSignenIn = document.getElementById("whenSignedIn")
const whenSignedOut = document.getElementById("whenSignedOut")

const signInBtn = document.getElementById("signInBtn")
const signOutBtn = document.getElementById("signOutBtn")

const userDetails = document.getElementById("userDetails")

//to make user be able user google account in firebase
const provider = new firebase.auth.GoogleAuthProvider()

signInBtn.onclick = () => auth.signInWithPopup(provider)
signOutBtn.onclick = () => auth.signOut()