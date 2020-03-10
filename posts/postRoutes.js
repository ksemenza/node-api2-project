const express  =require('express')
const router = express.Router()
const db = require('../data/db.js')


/* 
When the client makes a GET request to /api/posts:

    If there's an error in retrieving the posts from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The posts information could not be retrieved." }.

*/

router.get('/', (req, res)=> {
    db.find()
    .then(posts => {
        console.log(posts)
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500),json({error: 'The post info was not retrieved'})
    } )

})


/*
When the client makes a GET request to /api/posts/:id:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If there's an error in retrieving the post from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The post information could not be retrieved." }.

*/


router.get('/:id', (req, res)=> {
    const id = req.params.id;
    db.findById(id)
    .then(blogPost => {
        console.log(blogPost)
        if(blogPost.length > 0) {
            res.status(200).json(blogPost)
        } else {
            res.status(404).json({message: "Post with that ID does not exisit"})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:'Post info not retrieved'})
    })
})


/*
When the client makes a GET request to /api/posts/:id/comments:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If there's an error in retrieving the comments from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The comments information could not be retrieved." }.

*/

router.get(`/:id/commets`, (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(blogPost => {
        if(blogPost.length < 1) {
            res.status(500).json({message:'Post ID does not exist'})
        }
    })  
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Post info could not be retrieved'})
    })

    db.findPostComments(id)
    .then(comments => {
        console.log(comments)
        if(comments.length > 0) {
            res.status(200).json(comments)
        } else {
            res.status(500).json({message: 'Post with ID has not comments'})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Comments info could not be retrieved'})
    })
})


/*
When the client makes a POST request to /api/posts:

    If the request body is missing the title or contents property:
        cancel the request.
        respond with HTTP status code 400 (Bad Request).
        return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

    If the information about the post is valid:
        save the new post the the database.
        return HTTP status code 201 (Created).
        return the newly created post.

    If there's an error while saving the post:
        cancel the request.
        respond with HTTP status code 500 (Server Error).
        return the following JSON object: { error: "There was an error while saving the post to the database" }.

*/

router.post('/', (req, res) => {
    const newPost = req.body
    if(!newPost.title || !newPost.contents) {
        res.status(400).json({errorMessage: 'Provide title and contents for post'})
    }

    db.insert(newPost)
    .then(idObj => {
        console.log(idObj)
        db.findById(idObj.id)
        .then(blogPost => {
            console.log(blogPost)
            res.status(201).json(blogPost)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: 'Error with saving post to database'})
        })
    })

    .catch(err => {
        console.log(err)
        res.status(500).json({error: 'Error with saivng post to database'})
    })
})


/*
When the client makes a POST request to /api/posts/:id/comments:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If the request body is missing the text property:
        cancel the request.
        respond with HTTP status code 400 (Bad Request).
        return the following JSON response: { errorMessage: "Please provide text for the comment." }.

    If the information about the comment is valid:
        save the new comment to the database.
        return HTTP status code 201 (Created).
        return the newly created comment.

    If there's an error while saving the comment:
        cancel the request.
        respond with HTTP status code 500 (Server Error).
        return the following JSON object: { error: "There was an error while saving the comment to the database" }.

*/

router.put(`/:id`, (req, res) => {
    const id = req.params
    const updatedPost = req.body

    if(!updatedPost.title || !updatedPost.contents) {
        res.status(400).json({errorMessage: 'Provide title and contents for post'})
    }
    db.findById(id)
    .then(blogPost => {
        if(blogPost.length < 1) {
            res.status(404).json({message:'Post with ID does not exisit'})
        } else {
            db.update(id, updatedPost)
            .then(updateRecords => {
                if(updateRecords !==1) {
                    res.status(500).json({error: 'Post info could not be changed'})
                } else  {
                    db.findById(id)
                    .then(blogPost => {
                        console.log(blogPost)
                        res.status(201).json(blogPost)
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(500).json({error:'Error in retrieving updated post form database'})
                    })
                }
            })
        }
    })
})

/*
When the client makes a PUT request to /api/posts/:id:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If the request body is missing the title or contents property:
        cancel the request.
        respond with HTTP status code 400 (Bad Request).
        return the following JSON response: { errorMessage: "Please provide title and contents for the post." }.

    If there's an error when updating the post:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The post information could not be modified." }.

    If the post is found and the new information is valid:
        update the post document in the database using the new information sent in the request body.
        return HTTP status code 200 (OK).
        return the newly updated post.

*/



/*
When the client makes a DELETE request to /api/posts/:id:

    If the post with the specified id is not found:
        return HTTP status code 404 (Not Found).
        return the following JSON object: { message: "The post with the specified ID does not exist." }.

    If there's an error in removing the post from the database:
        cancel the request.
        respond with HTTP status code 500.
        return the following JSON object: { error: "The post could not be removed" }.

*/


    /*
    body looks like this: {"id": 40, "text": "blah", "post_id": 18}
    */


    module.exports = router