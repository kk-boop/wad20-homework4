const express = require('express');
const router = express.Router();
const authorize = require('../middlewares/authorize');
const PostModel = require('../models/PostModel');


router.get('/', authorize, (request, response) => {

    // Endpoint to get posts of people that currently logged in user follows or their own posts

    PostModel.getAllForUser(request.currentUser.id, (postIds) => {

        if (postIds.length) {
            PostModel.getByIds(postIds, request.currentUser.id, (posts) => {
                response.status(201).json(posts)
            });
            return;
        }
        response.json([])

    })

});

router.post('/', authorize,  (request, response) => {

    // Endpoint to create a new post

    const params = {
        userId: request.currentUser.id,
        ...request.body
    };

    PostModel.create(params, (post) => {
        if (!post) {
            response.status(400);
            return;
        }

        response.json(post);
    });
});


router.put('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to like a post
    PostModel.getLikesByUserIdAndPostId(request.currentUser.id,request.params.postId, callback => {
        if (callback.length === 0) {
            PostModel.like(request.currentUser.id, request.params.postId, (callback) => {
                response.status(200).json([])
            });
        }
    })
});

router.delete('/:postId/likes', authorize, (request, response) => {

    // Endpoint for current user to unlike a post
    PostModel.unlike(request.currentUser.id, request.params.postId, callback => {
        response.status(200).json([])
    });
});

module.exports = router;
