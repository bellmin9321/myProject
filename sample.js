var fs = require("fs")
var express = require("express")
var app = express ()
var hbs = require('express-handlebars')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mysql = require('mysql')

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123',
    database : 'subi'
});
   
connection.connect(); // 엔터
   
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cookieParser())

// template engine 세팅부분
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: false,
}))
app.set('view engine', 'hbs')

//----------------------------
app.use("/public", express.static("public"))

app.get("/boards/:id", function(req, res){
    console.log(req.params.id)
    connection.query("select * from posts where id = ?", [ req.params.id ], function(err, rows){
        res.render("post", {
            title : rows[0].title,
            description : rows[0].description,
        })
    })
})

app.get("/boards", function(req, res){
    connection.query("select * from posts", function(err, rows){
        res.render('boards', {
            boards: rows,
        })
    })    
})

app.get("/write", function(req, res){
    res.render("write")
})


app.post("/write_process", function(req, res){
    connection.query("insert into posts(title, description) values(?, ?)", [req.body.title, req.body.description], function(err){
        // res.redirect("/boards")    
        res.send("ok")
    })  
})

app.get("/login_process", function(req, res){
    connection.query("select * from users where user_id = ?", [req.query.user_id], function(err, rows){
        if(rows.length === 0){
            res.send("회원가입해주세요")// 아이디 존재 X
        } else {
 
            // 아이디는 존재O

             /*
                1) 아이디는 존재하나 존재하는row와 비번이 틀림   rows[0].user_pw === req.query.user_pw 
                    => 비밀번호일치 X

                2) 아이디가 존재하면서 비번도 일치
                    => 로그인 처리
             
             */


        }
    })
})

app.listen(3000,function(){
    console.log("포트열림")
})

