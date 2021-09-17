const Joi = require('joi');     //joi is validator
const Post = require('../models/Post');     //helper

exports.addPost= (req, res) => {
    res.render('add-post.ejs', {title: 'Add Post'});
}

exports.submitPost= (req, res) => {
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

    const validation = schema.validate(req.body, options);
    if(validation.error){
        console.log(validation.error)
        res.render("add-post.ejs", {title: 'Add Post', errorMessage: validation.error, inputData: req.body});
    }
    else {
        let post=new Post({
            title: req.body.title,
            description: req.body.description,
        })
        post.save();

        res.render("add-post.ejs", {title: 'Add Post', successMessage: 'Post created successfully!'});
    }
}

exports.posts=(req, res)=>{
    const posts=Post.find();
    console.log(posts)
    res.render('posts.ejs', {title: 'Posts', posts: posts});
}
