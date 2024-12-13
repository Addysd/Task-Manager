const express=require('express')
const app=express()
const tasks=require('./routes/tasks')
const connectDB=require('./db/connect')
require('dotenv').config()//no methods to import so can directly require
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')


//middleware
//they execute in between the request and response sequence chain
app.use(express.json())//incoming requests are parsed to JSON
app.use(express.static('./public'))//serves static files(these dont change) frm the public directory


//routes
//serving routes is complex so diff folder is used to serve them
//actual business logic(how to handle requests) of a route is complicated so its contained in controllers
app.use('/api/v1/tasks',tasks)
app.use(notFound)//for any other routes(use this middleware)
app.use(errorHandlerMiddleware)//this middleware is next() for the async middleware
//basically errorhandlermiddleware handles the err passed into next in async
const port=process.env.PORT || 3000

const start= async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        //process.env is global js object which allows to access env variables
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(error){
        console.log(error)
    }
}
start()
