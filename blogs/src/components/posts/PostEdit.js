import React, {useState} from 'react'


const PostEdit = ({post, editPost}) => {
const [postEdit, setPostEdit] = useState(post)


const handleSubmit = e => {
    e.preventDefault();
    editPost(postEdit);
    window.location.reload()
}

const handleChange = e => {
    setPostEdit({...postEdit, [e.target.name]: e.target.value})
}

return (
    <div className='post-cta'>
        {/* <button onClick={handleEditClick}>{!editMode? 'Edit' : 'Cancel'}</button> */}

<div className='post-edit'>
<form onSubmit={handleSubmit}>
    <h4>Editing {post.title}</h4>
    <label htmlFor='title'>Title</label>
                <input type='text' name='title' value={postEdit.title} onChange={handleChange}/>
    
                <label htmlFor='contents'>Contents</label>
                <textarea type='textbox' name='contents' className='content-text' value={postEdit.contents} onChange={handleChange}/>


                <button type='submit'>submit</button>

    </form>
    </div></div>
)

}


export default PostEdit 