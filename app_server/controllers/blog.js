// controller
module.exports.addBlog = function(req, res){
    res.render('addBlog', {title: 'Blog Add' });
};

module.exports.listBlog = function(req, res){
    res.render('listBlog', {title: 'Blog List', 
        blog: [
            {
                blogTitle: 'Hello There',
                blogText: 'This is a test post',
                createdOnDate: '09/28/2020'
            },
            {
                blogTitle: 'Test 1',
                blogText: 'e',
                createdOnDate: '09/10/2020'
            },
            {
                blogTitle: 'Test 2',
                blogText: 'r',
                createdOnDate: '09/20/2020'
            }
        ]
    });
};

module.exports.deleteBlog= function(req, res){
    res.render('blogDelete', {title: 'Blog Delete'});
}

module.exports.editBlog = function(req, res){
    res.render('blogEdit', {title: 'Blog Edit' });
}