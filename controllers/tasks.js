//check mongoose docs for all the queries if needed
const Task = require('../models/task')
const asyncWrapper=require('../middleware/async')
const {createCustomError}=require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req,res)=>{//this whole anonymous fn is given as parameter to the wrapper which will handle try and catch
        const tasks= await Task.find({})
        res.status(200).json({tasks})
})

const createTask= async (req,res)=>{//keeping the original for this fn
    try{
        const task= await Task.create(req.body)
        res.status(201).json({task})
    }catch(err){
        res.status(500).json({msg:err}) 
    }
}
const getTask=asyncWrapper(async (req,res,next)=>{
        const {id:taskID}=req.params//taskID is alias name for id
        const task= await Task.findOne({_id:taskID})
        //here Task is called model and the values returned by this promise is called instance of the model
        //promise represents eventual completion of a function
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({task})
})

const updateTask=asyncWrapper(async (req,res,next)=>{//async waits for function to execute without blocking execution of rest of the code
        const {id:taskID}=req.params
        
        const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,//updated value persists
            runValidators:true,//updated values need to pass validation checks
        })
        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({task})
    
})

const deleteTask=asyncWrapper(async (req,res,next)=>{
        const {id:taskID}=req.params
        const task= await Task.findOneAndDelete({_id:taskID})

        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`,404))
        }
        res.status(200).json({task})
})

module.exports={
    getAllTasks,
     createTask,
      getTask,
      updateTask,
      deleteTask
}