// app_server/controllers/home.js
// Obsolete as of lab 5

module.exports.index = function(req, res) {
    res.render('index', {title: "Carli Shires Blog Site"});
};