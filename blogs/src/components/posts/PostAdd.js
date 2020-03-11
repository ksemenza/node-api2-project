import React, { useState } from 'react';

const PostAdd = props => {
    const [post, setPost] = useState({title: '', contents: ''});

    const handleSubmit = e => {
   
        props.addPost(post);
        setPost({title: '', contents: ''});
    }

    const handleChange = e => {
        setPost({...post, [e.target.name]: e.target.value});
    }


    return (

<div>
        <h2>New Entry</h2>
        
            <form className='form-add' onSubmit={handleSubmit}>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' value={post.title} onChange={handleChange}/>
    
                <label htmlFor='contents'>Contents</label>
                <textarea type='textbox' name='contents' className='content-text' value={post.contents} onChange={handleChange}/>


                <button type='submit'>submit</button>

            </form>

        </div>
        
    )

}

export default PostAdd
