const path = require('path')
const express = require('express');
const app = express();
const hbs = require('hbs');
const PORT = process.env.PORT || 9000;

const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname,"../templates/views");
const partial_path = path.join(__dirname,"../templates/partials");

app.use(express.static(static_path));
// console.log(static_path);

// set view engine 
app.set('view engine','hbs');
app.set('views',views_path)

//register partials
hbs.registerPartials(partial_path);

//routes
app.get("/",(req,res)=>{
    res.render('index');
})

app.get("/weather",(req,res)=>{
    res.render("weather");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("*",(req,res)=>{
    res.render("err404",{
        errorMsg: "....404 Error is Occur please Go BACK...."
    });
})

//start the server
app.listen(PORT,()=>console.log(`server listen on port : ${PORT}`))