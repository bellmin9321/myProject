var fs = require('fs')
var express = require('express')
var app = express()
var hbs = require('express-handlebars')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/a", function(req, res){
    fs.readFile("user.html", function(err, data){
        var result = data.toString()
        result = result.replace("{{ real name }}", "안다히")
        res.send(result)
    })
})

app.get("/b", function(req, res){
    fs.readFile("user.html", function(err, data){
        var result = data.toString()
        result = result.replace("{{ real name }}", "김종민")
        res.send(result)
    })
})

app.engine('hbs', hbs({
    extname : 'hbs',
    defaultLayout : false,
}))
app.set('view engine', 'hbs')

app.use("/public", express.static("public"))

app.get("/c", function(req, res){
    res.render("user", {
    name : "bellmin",
    age : 27
    })
})

app.get("/vip", function(req, res){
    res.render("viplist", {
        items : [ "kihyun0402", "bellmin", "woony"]
    })
})

app.get("/main", function(req, res){
    res.render("main", {
        isLogin : true
    })
})

app.get("/login", function(req, res){
    res.render("login")
})

var real_id = "bellmin"
var real_pw = "123"

app.get("/login_process", function(req, res){
    if(req.query.user_id === real_id && req.query.user_pw === real_pw){
        res.cookie("user", { name : "김종민", age : 27 })
        res.send("로그인이 완료되었습니다.")
    } else {
        res.send("다시 시도해주시십시오.")
    }
})

app.get("/join", function(req, res){
    res.render("join")
})

app.get("/join_process", function(req, res){
    users.push(req.query.user_id)
    console.log(users)
    res.send("Welcome")
})


app.get("/mm", function(req, res){
    console.log(req.cookies.user)
    if(req.cookies.user){
        res.render("main", {
            isLogin : true
        })
    } else {
        res.render("guest", {
            isLogin : false
        })
    }
})

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended : false}))

app.get("/write", function(req, res){
    res.render("write")
})

app.post("/write_process", function(req, res){
    connection.query("insert into board(title, content) values(?, ?)",
     [req.body.title, req.body.contet], function(err){
         res.redirect("/boards")
     })
})

app.get("boards/:id", function(req, res){
    connection.query("select * from board where id = ?", [
        req.params.id], function(err, rows){
            res.render
        }
    ])
})

app.listen(1234, function(){
    console.log("Good luck")
})
