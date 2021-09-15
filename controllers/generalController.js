
const home= (req, res) => {
    res.render('home.ejs', {title: 'Home'});
}

//export controller functions
module.exports = {
    home
};