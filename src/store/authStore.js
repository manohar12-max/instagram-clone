import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: JSON.parse(localStorage.getItem("user-info")), //take user from localStorage
	login: (user) => set({ user }),      //same as we get the object in (user) later set the user set({ user:user }),       
	logout: () => set({ user: null }),
	setUser: (user) => set({ user }), //this will be used whenever we want to update user info in database
}));

export default useAuthStore;