import React, {useState, useEffect} from 'react'
import PostCard from './PostCard'
import PostAdd from './PostAdd'
import axiosAuth from '../axiosAuth'

const PostList = props => {

    const [post, setPost] = useState()
    const [loading, setLoading] = useState(false)
    const [addMode, setAddMode] = useState(false)

    const handleClickAdd = () => {
        setAddMode(!addMode)
    }

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
{loading}
    <button onClick={handleClickAdd}>{!addMode? `New Post` : 'Cancel'}</button>
    {addMode? <PostAdd addPost={addPost} toggleAdd={handleClickAdd}/> :
            <div className='post-content'>
                
    
           
                {post && post.map(post => {
                    return(
                       
                    <PostCard key={post.id} title={post.title} contents={post.contents} post={post} deletePost={deletePost} editPost={editPost}/> 
               
                        )
                }
                )
                
                }
            </div>
}
        </div>
    )

}

export default PostList