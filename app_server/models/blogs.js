// model
var mongoose = require( 'mongoose' );

var blogSchema = new mongoose.Schema({ 
    /*postNo: {type: Number, "default": 0},
    name: {type: String, required: true}*/
    blogTitle: {type: String, required: true},
    blogText: {type: String, required: true},
    createdOnDate: {type: Date, required: true}
});

mongoose.model('Blog', blogSchema);