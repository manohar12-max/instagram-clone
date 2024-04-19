import React from "react";
import { auth, firestore } from "../FireBase/firebase.js";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { doc, setDoc, collection, query, where ,getDocs} from "firebase/firestore";
import useShowToast from "./useShowToast.js";
import useAuthStore from "../store/authStore.js";
const useSignUpWithEmailAndPassword = () => {
  const [
    createUserWithEmailAndPassword, //this is hook to create user from firebase
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  const showToast = useShowToast();

  const loginUser = useAuthStore((state) => state.login);

  const signup = async (input) => {
    if (!input.email || !input.password || !input.username || !input.fullname) {
      showToast("Error", "Please enter fields", "error");
      return;
    }
// the firehook createUserWithEmailAndPassword only checks user if have same email,id
// but if we want to check unique usename we have to get user of perticular username with help of 
// query from databaseS
const usersRef = collection(firestore, "users");
console.log(usersRef)
const q = query(usersRef, where("username", "==", input.username));
const querySnapshot = await getDocs(q);
console.log(querySnapshot.empty)
if (!querySnapshot.empty) {
  showToast("Error", "Username already exists", "error");
  return;
}
    
    try {
      const newUser = await createUserWithEmailAndPassword(
        input.email,
        input.password
      );
      if (!newUser && error) {
        //if user not created
        showToast("Error", error.message, "error");
        return;
      }
      console.log(newUser)
      if (newUser) {
        const userDoc = {
          uid: newUser.user.uid,
          email: input.email,
          username: input.username,
          fullName: input.fullname,
          bio: "",
          profilePicURL: "",
          following: [],
          followers: [],
          posts: [],
          createdAt: Date.now(),
        };
        //  db is document METHOD here firestore is name of db useres is collection name and we have to pass unique id
        await setDoc(doc(firestore, "users", newUser.user.uid), userDoc);
        showToast("Success", "You have signed up successfully ", "success");
        localStorage.setItem("user-info", JSON.stringify(userDoc));
        loginUser(userDoc);
      }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };
  return { loading, error, signup };
};

export default useSignUpWithEmailAndPassword;
