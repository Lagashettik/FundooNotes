import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCNZ4E04EIbrqfNOP8LE4nWmSQn17CBF_4",
    authDomain: "fundoonotesapp-5082c-default-rtdb.firebaseio.com",
    databaseURL: "https://fundoonotesapp-5082c-default-rtdb.firebaseio.com/",
    projectId: "fundoonotesapp-5082c",
    storageBucket: "fundoonotesapp-5082c.appspot.com",
    messagingSenderId: "798646021857",
    appId: "1:798646021857:android:390de6016e404d546a11a0"
};

firebase.initializeApp(firebaseConfig);

export default firebase;