const mongoose=require ('mongoose');
const config=require ('../config/db');

const TaskSchema = mongoose.Schema({ 
  name: {
    type:String,
    required: true
  },
  descr:{
    type:String,
    required: true
  },
  toUser:{
    type:String,
    required: true
  },

  taskDonne:{
    type:Boolean
  }
});

const Task =module.exports =mongoose.model('Task', TaskSchema);

module.exports.addTask= function(newTask, callback){
       newTask.save(callback);
    
  };