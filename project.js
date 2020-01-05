var fs = require('fs')
var express = require('express')
var app = express()
var hbs = require('express-handlebars')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mysql = require('mysql')

app.engine('hbs', hbs({
    extname : 'hbs',
    defaultLayout : false,
}))
app.set('view engine', 'hbs')

app.use("/public", express.static("public"))

var connection = mysql.createConnection({
    host     : 'bellsql.cssozhpqajux.ap-northeast-2.rds.amazonaws.com',
    user     : 'bellmin',
    password : '123123123',
    database : 'bellDB'
})

connection.connect(); //mysql이랑 연결

connection.query("select * from users;", function(err, rows){
    console.log(rows)
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended : false }))

app.get("/new", function(req, res){
    res.send("<h1>new</h1>")
})

app.get("/write", function(req, res){
    res.render("write") // render에는 "" 안에 / 안붙임
})

app.post("/write_process", function(req, res){
    connection.query("insert into board(title, content) values(?,?)", [req.body.title, req.body.content], function(err){
        res.redirect("/boards")
        //res.send("ok") res가 중복이 되면 실행 안됨
    })
})

app.get("/boards/:id", function(req, res){
    //console.log(req.params.id)
    connection.query("select * from board where id = ?", [
        req.params.id ], function(err, rows){
            res.render("post", {
                title : rows[0].title,
                content : rows[0].content,
            })
        })
})

app.get("/a", function(req, res){
    res.render("ajaxLearn")
})

app.get("/boards2", function(req, res){
    res.json({
        boards : ["사과", "바나나", "오렌지"]
    })
})

app.get("/friends", function(req, res){
    res.json({ f : ['기현', '태섭', '종민', '명식'] })
})

app.get("/boards", function(req, res){
    connection.query("select * from board", function(err, rows){
        res.render('boards', {
            boards : rows
        })
    })
})

app.get("/join", function(req, res){
    res.render("join")
})
// mysql column 수와 insert의 column 수가 같아야 실행됨
app.post("/join_process",function(req, res){
    connection.query("insert into login(user_id,user_pw,nickname) values(?,?,?)", [req.body.user_id,req.body.user_pw,req.body.nickname], function(err){
        res.send("회원가입을 축하드립니다")
    })
})

app.get("/login", function(req, res){
    res.render("login")
})
app.get("/index", function(req, res){
    res.render("index")
})

app.post("/login_process", function(req, res){
    connection.query("select * from login where user_id = ?",
    [req.body.user_id], function(err, rows){ // mysql에서 body로 씀.
        if(rows.length === 0){
            res.redirect("/join")
            //res.send("회원가입 해라")
        } else {
            if(rows[0].user_pw == req.body.user_pw){
            res.redirect("/index")
                //res.send("로그인이 되었습니다")
            } else {
            res.send("비밀번호가 일치하지 않습니다.")
            }
        }
    })
})

//  connection.query("select * from login", function(err, rows){
//      if(err){console.log(err)}
//      console.log("DataBase :", rows)
//  })
// 연결이 성공

// mysql -u root -p -h localhost

// mysql client

// express static 정적파일 서빙하는 소스코드 있어야함

/* 2) 게시판 만들기
2-0) html(hbs) 하나당 css 연결
2-1) 글 쓸 수 있는 page
2-2) 글 볼 수 있는 page
2-3) 삭제버튼으로 해당글 삭제*/
/*
app.get("/board", function(req, res){
    res.render("board")
})

var database = [];

var id = 0;

app.get("/board_process", function(req, res){  
    
    var post = {
        title : req.query.brdtitle,
        content : req.query.brdmemo,
        id : id,
    }

    database.push(post);

    id++;  // id = id + 1
    
    console.log(database);
    res.send("글쓰기 완료")
})

app.get("/bbss", function(req, res){
    res.render("bbss", {
        posts: database,
    })
})

// 3)로그인 구현
app.get("/login", function(req, res){
    res.render("login1")
})

var real_id = "admin"
var real_pw = "123123"

app.get("/login_process", function(req, res){
    if(req.query.user_id === real_id && req.query.user_pw === real_pw)
    {
        res.cookie("user1", { name : "Jongmin Kim", age : 27})
        res.send("로그인이 완료되었습니다.")
    } else {
        res.send("아이디와 비밀번호가 일치하지 않습니다.")
    }
})
*/

/* 4) SECRET 페이지 구현. login시 cookie를 user1으로부터 받았기 때문에 secret에서 Terminal에 쿠키 정보를 띄울려면 req.query.user1 으로 받아야함 
app.get("/secret", function(req, res){
    console.log(req.cookies.user1) 
    if(req.cookies.user1){
        res.render("main1", {
            isLogin : true
        })
    } else {
        res.render("guest", {
            isLogin : false
        })
    }
})

// 5) 특정 페이지(hbs) 만들기

app.get("/hbs", function(req, res){
    if(req.cookies.user1){
    res.render("user1", {
        isLogin : true,
        name : "Jongmin Kim",
        age : 27,
        items : ["G.F : Dahee", "1st Job : AF Officer", "2nd Job : Programmer"],
    })} else {
        res.render("guest", {
            isLogin : false
        })
    }
})
*/
app.listen(2019, function(){
    console.log("Welcome")
})