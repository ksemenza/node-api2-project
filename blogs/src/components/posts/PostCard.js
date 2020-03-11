import React, {useState} from 'react'
import CommentList from '../comments/CommentList'


const PostCard = ({post, deletePost, editPost}) => {
const [editing, setEditing] = useState(false)
const [postEdit, setPostEdit] =useState(post)
const [editMode, setEditMode] = useState(false)

const handleDeleteClick = () => {
   
    deletePost(post);
    window.location.reload()
}

const handleEditClick = () => {
    setEditing(true);
    setEditMode(!editMode)
}

const handleSubmit = e => {
    e.preventDefault();
    editPost(postEdit);
    setEditing(false);
    window.location.reload()
}

const handleChange = e => {
    setPostEdit({...postEdit, [e.target.name]: e.target.value})
}

return (
    <div className='post-cta'>
        <h4>{post.title}</h4>
        <p>{post.contents}</p>
        <button className='edit' onClick={handleEditClick}>Edit</button>


        <button className='delete' onClick={handleDeleteClick}>Delete</button>



<div className='post-edit'>
   {editing && <form onSubmit={handleSubmit}>
    <h4>Editing {post.title}</h4>
    <label htmlFor='title'>Title</label>
                <input type='text' name='title' value={postEdit.title} onChange={handleChange}/>
    
                <label htmlFor='contents'>Contents</label>
                <textarea type='textbox' name='contents' className='content-text' value={postEdit.contents} onChange={handleChange}/>


                <button type='submit'>submit</button>

    </form>
}
</div>

    </div>


)


}

export default PostCard 