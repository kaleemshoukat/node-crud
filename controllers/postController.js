const Joi = require('joi');     //joi is validator
const responser = require('../helpers/responser');     //helper
const Post = require('../models/Post');     //helper

const addPost= (req, res) => {
    res.render('add-post.ejs', {title: 'Add Post'});
}

const submitPost= (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const validate = schema.validate(req.body, options);
    if(validate.error){
        res.json(responser.validation(validate.error));
    }
    else {
        let post=new Post({
            title: req.body.title,
            description: req.body.description,
        })
        post.save();

        res.json(responser.success());
    }
}

const posts=(req, res)=>{
    const posts=Post.find();
    console.log(posts)
    res.render('posts.ejs', {title: 'Posts', posts: posts});
}

//export controller functions
module.exports = {
    addPost,
    submitPost,
    posts
};