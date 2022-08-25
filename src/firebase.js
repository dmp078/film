import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
	apiKey: "AIzaSyCZldlYwi--M5iNm1JR3BsYA8il2tFQ_9U",
	authDomain: "film-ba99e.firebaseapp.com",
	projectId: "film-ba99e",
	storageBucket: "film-ba99e.appspot.com",
	messagingSenderId: "1059451577481",
	appId: "1:1059451577481:web:d987924a0aac1ae50c9258",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
