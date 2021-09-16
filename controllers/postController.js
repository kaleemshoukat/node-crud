const Joi = require('joi');     //joi is validator
const responser = require('../helpers/responser');     //helper
const Post = require('../models/Post');     //helper

const posts= (req, res) => {
    res.render('posts.ejs', {title: 'Posts'});
}

const submitPost= (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    const validate = schema.validate(req.body);
    if(validate.error){
        res.json(responser.validation(validate.error));
    }
    else {
        console.log(req.body);
        let post=new Post({
            title: req.body.title,
            description: req.body.description,
        })
        post.save();

        res.json(responser.success());
    }
}


//export controller functions
module.exports = {
    posts,
    submitPost
};