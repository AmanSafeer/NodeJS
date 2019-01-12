const express=require('express')

const app = express(); 
app.use(express.json())
const port = 2000

const users =[]

app.get('/users',(req,res)=>res.send(users))

app.post('/users',(req,res)=> {
    const user = {
        id:users.length+1,
        name:req.body.name,
        email:req.body.email,
        contact:req.body.contact,
        gender:req.body.gender
    }
    users.push(user)
    res.send(users)
})

app.delete('/users/:id',(req,res)=>{
const user = users.find((user)=> user.id == req.params.id)
const index = users.indexOf(user)
users.splice(index,1)
res.send(users)
})

app.put('/users/:id',(req,res)=>{
    const user = users.find((user)=> user.id == req.params.id)
    const index = users.indexOf(user)
    users.splice(index,1,req.body)
    res.send(users)

})
app.listen(port,()=>console.log('server is running at port '+port))

   
   


