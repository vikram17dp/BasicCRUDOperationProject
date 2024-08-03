const express = require('express')
const app = express();
const path = require('path');
const userModel = require('../BackendFiveCRUD/models/user')


app.set("view engine",'ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'public', 'views'));

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render("app")
})
app.get('/read',async (req,res)=>{
    let users = await userModel.find();
    res.render("read",{users})
})
app.get('/delete/:id',async (req,res)=>{
    let users = await userModel.findOneAndDelete({_id:req.params.id});
    res.redirect("/read")

})
app.get('/edit/:userid',async (req,res)=>{
    let user = await userModel.findById({_id:req.params.userid});
    res.render('edit',{user});
})
app.post('/update/:userid',async (req,res)=>{
    let {email,name,image} = req.body;
    let user = await userModel.findOneAndUpdate({_id:req.params.userid},{email,name,image},{new:true});

    res.redirect('/read');    
})
app.post('/create',async(req,res)=>{
    let {email,name,image} = req.body;
    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/read")
})
app.listen(3000,function(req,res){
    console.log("its running");
})