import React, {useState, useEffect} from 'react'
import PostCard from './PostCard'
import PostAdd from './PostAdd'
import axios from 'axios'
import axiosAuth from '../axiosAuth'

const PostList = props => {

    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axiosAuth().get(`/`)
        .then(res => {
            // console.log(res)
            setPost(res.data)
          setLoading(false)
       
        })
        .catch(err => {
            console.error(err); 
        })
    }, [])


    
    const addPost = newPost => {
        setLoading(true);
        console.log(newPost);     
        axiosAuth().post(`/`, newPost)
        .then(res => {
            console.log(res);
            setPost(res.data);
  
        })
        .catch(err => console.log(err));
    }

    const deletePost = posts => {
        setLoading(true);
        console.log(posts);
        axiosAuth().delete(`/${posts.id}`, post)
            .then(res => {
                console.log(res);
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => console.log(err));
    }

    const editPost = posts => {
        console.log('Time to edit post');
        console.log(posts.id);
        setLoading(true);
        axiosAuth().put(`/${posts.id}`, posts)
            .then(res=> {
                console.log(res);
                setPost(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
            
    }

/**
 TODO: Change hard coded name to auth user name
 */
    return(
        <div>

          
            <div className='post-content'>
            <PostAdd addPost={addPost}/>
           
                {post && post.map(post => {
                    return(
                       
                    <PostCard id={post.id} title={post.title} contents={post.contents} post={post} deletePost={deletePost} editPost={editPost}/> 
               
                        )
                }
                )
                
                }

             
       

            

            </div>
        </div>
    )

}

export default PostList