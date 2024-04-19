import {create} from "zustand"
const usePostStore=create((set)=>({
    posts:[],
    createPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
    
      //delete posts
    deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id!== id) })),
    
    //its is gonna take new posts and update it
    setPosts:(posts)=>set({posts: posts}),
    
    // addcomment
    addComment:(postId,comment)=>
    set((state)=>({
        posts:state.posts.map((post)=>{
            if(post.id==postId){
                return {
                    ...post,
                    comments:[...post.comments,comment]
                }
            }
            return post
        })
    }))
  

}))
export default usePostStore;


