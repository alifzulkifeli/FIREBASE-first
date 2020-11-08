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
    userDetails.innerHTML = `<h3>Hello ${user.displayName} Id: ${user.uid}</h3>`;
  } else {
    //signed out
    whenSignenIn.hidden = true;
    whenSignedOut.hidden = false;
    userDetails.innerHTML = ``;
  }
})

const db = firebase.firestore()

const createThings = document.getElementById("createThing")
const thingList = document.getElementById("thingsList")

let thingsRef
let unsubscribe

auth.onAuthStateChanged((user) => {
  if (user) {
    //signed in
    thingsRef = db.collection('things')
    createThings.onclick = () => {
      thingsRef.add({
        uid: user.uid,
        name: faker.commerce.productName(),
        createdAt: Date.now()
      })
    }

    unsubscribe = thingsRef
      .where('uid', '==', user.uid)
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(doc => {
          return `<li>${doc.data().name}</li>`
        })

        thingList.innerHTML = items.join('')
      })
  } else {
    unsubscribe && unsubscribe()
  }
})