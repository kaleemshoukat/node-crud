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
        res.render("add-post.ejs", {title: 'Add Post', errorMessage: validation.error, inputData: req.body});
    }
    else {
        try{
            let post=new Post()
            post.title= req.body.title
            post.description= req.body.description
            post.save()

            res.render("add-post.ejs", {title: 'Add Post', successMessage: 'Post created successfully!'});
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}

exports.posts=async (req, res)=> {
    try {
        const posts=await Post.find({});
        res.render('posts.ejs', {title: 'Posts', posts: posts});
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.delete= async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id)
        res.redirect('/posts')
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.editPost= async (req, res) => {
    try{
        const post=await Post.findById(req.params.id)
        res.render('edit-post.ejs', {title: 'Edit Post', post: post});
    }
    catch (error) {
        res.status(500).send(error);
    }
}

exports.updatePost= async (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    // schema options
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    }

    const validation = schema.validate(req.body, options);
    if(validation.error){
        res.render("edit-post.ejs", {title: 'Edit Post', errorMessage: validation.error});
    }
    else {
        try{
            const post=await Post.findById(req.params.id)
            post.title=req.body.title
            post.description=req.body.description
            post.save()

            res.redirect('/posts')
        }
        catch (error) {
            res.status(500).send(error);
        }
    }
}

