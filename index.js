const express = require('express');
const app = express();
const path = require('path')
const fs = require('fs');
const { log } = require('console');

app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended :true}));
app.use(express.static(path.join(__dirname,'public'))); 


app.get('/edit/:filename', function(req, res){
   res.render('edit.ejs',{filename: req.params.filename});
}) 
  
app.post('/edit', function(req, res){
   fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}`, function(err){res.redirect("/")})
 }) 


app.get('/file/:filename', function(req, res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8",function (err,filedata){res.render('show.ejs', {filename: req.params.filename, filedata: filedata});
    })
}) 

app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files)
    {res.render("index", {files : files});
    })
    
})

app.post('/create' , function(req, res){
    console.log(req.body)
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
        res.redirect('/');
    });
    
})

app.get
 
app.listen(3001 , function(){
    console.log("Run Succesfully");
});
 

