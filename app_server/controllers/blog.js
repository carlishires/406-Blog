module.exports.addBlog = function(req, res){
    res.render('addBlog', {title: 'Blog Add'});
};

module.exports.listBlog = function(req, res){
    res.render('listBlog', {title: 'Blog List'});
};