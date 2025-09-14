const mongoose = require('mongoose');
const  {Schema} = mongoose;

const blogsSchema = new Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user1'
    },

    title: {
        type:String,
        required:true
    },

    content: {
        type:String,
        required:true
    },

    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user1'
    }, 

    likes: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'user1',
        default: [],
    },

    comments: [
        {
            comment: {
            type: String,
            required: true
            },

            commentor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user1",
            required: true,
            },

            commentedAt: {
            type: Date,
            default: Date.now,
            },
        },
    ],

},{
    timestamps:true
});

module.exports=mongoose.model('blog1',blogsSchema);