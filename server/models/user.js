const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const userschema=new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
   
},{
    timestamps:true
})
const User=mongoose.model('credentiall',userschema);
module.exports=User;     