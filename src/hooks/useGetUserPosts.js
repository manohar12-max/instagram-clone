import React from 'react'
import {useState,useEffect} from "react"
import useShowToast from './useShowToast'
import usePostStore from '../store/postStore'
import userProfile from '../store/userProfileStore'
import { firestore } from '../FireBase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import useUserProfileStore from '../store/userProfileStore'
  const useGetUserPosts = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { posts, setPosts } = usePostStore();
    const showToast = useShowToast();
    const userProfile = useUserProfileStore((state) => state.userProfile);
  
    useEffect(() => {
      const getPosts = async () => {
        if (!userProfile) return;
        setIsLoading(true);
        setPosts([]);
  
        try {
          const q = query(collection(firestore, "posts"), where("createdBy", "==", userProfile.uid));
          const querySnapshot = await getDocs(q);
  
          const posts = [];
          let count = 0;
          querySnapshot.forEach((doc) => {
            console.log(doc.data(),count++)
          
            posts.push({ ...doc.data(), id: doc.id });
          });
  
          posts.sort((a, b) => b.createdAt - a.createdAt);
          setPosts(posts);
        } catch (error) {
          showToast("Error", error.message, "error");
          setPosts([]);
        } finally {
          setIsLoading(false);
        }
      };
  
      getPosts();
    }, [setPosts, userProfile, showToast]);
  
    return { isLoading, posts };
  };
  
  export default useGetUserPosts;
