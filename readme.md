** starting an app

- create account on firebase
- copy sdk to the html
- run firebase login 
- run firebase init
- choose service
- run firebase serve / firebase emulators:start to start app
- run firabese deploy to deploy the apps to hosting

** create login function
- set login method
- import firebase
- to create login and logout function
```js
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

//to make app react
auth.onAuthStateChanged((user) => {
  if (user) {
    //signed in
    whenSignenIn.hidden = false;
    whenSignedOut.hidden = true;
    userDetails.innerHTML = `<h3>Hello ${user.displayName}, Id: ${user.uid}</h3>`;
  } else {
    //signed out
    whenSignenIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = ``;
  }
})
```

** Firestore