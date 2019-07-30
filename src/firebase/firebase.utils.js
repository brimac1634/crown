import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCHDSt72RN57_WvMALhNABaFsZXblHznTc",
    authDomain: "bonv-73e16.firebaseapp.com",
    databaseURL: "https://bonv-73e16.firebaseio.com",
    projectId: "bonv-73e16",
    storageBucket: "",
    messagingSenderId: "713543407983",
    appId: "1:713543407983:web:587b3a972cea4ac0"
  }

export const createUserProfileDocument = async (userAuth, otherData) => {
	if (!userAuth) return;
	const userRef = firestore.doc(`users/${userAuth.uid}`)
	const snapShot = await userRef.get()
	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...otherData
			})
		} catch (error) {
			console.log('error creating user', error.message)
		}
	}
	return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
