// model
var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({ 
    blogTitle: {type: String, required: true},
    blogText: {type: String, required: true},
    createdOnDate: {
        type: Date, required: true,
        "default": Date.now
    },
    authorName: {type: String, required: true},
    authorEmail: {type: String, required: true}
});

mongoose.model('Blog', blogSchema);