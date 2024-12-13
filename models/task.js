const mongoose=require('mongoose');

const TaskSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide a name'],
        trim:true,//to remove whitespace
        maxlength:[20,'name cannot be more than 20 chars']
    },
    completed:{
        type:Boolean,
        default:false,
    },
})

module.exports=mongoose.model('Task',TaskSchema)//Task is name given to the model
//model is a wrapper for a MongoDB collection, an interface to interact with the collection
//instance of a model is document