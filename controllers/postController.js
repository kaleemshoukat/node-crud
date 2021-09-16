const Joi = require('joi');     //joi is validator
const response = require('../helpers/response');     //helper

const posts= (req, res) => {
    res.render('posts.ejs', {title: 'Posts'});
}

const submitPost= (req, res) => {
    const schema = Joi.object().keys({
        title: Joi.string().alphanum().min(3).max(30).required(),
        description: Joi.string().min(3).max(1000).required(),
    });

    const validation = schema.validate(req.body);
    if(validation.error){
        return res.status(422).send(validation.error);
    }
    else {
        console.log(req.body);
        console.log(response.error());
    }

}


//export controller functions
module.exports = {
    posts,
    submitPost
};