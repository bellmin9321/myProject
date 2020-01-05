var fs = require('fs')
var express = require('express')
var app = express()
var hbs = require('express-handlebars')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

app.get("/1", function(req, res){
    res.send("Hello")
})

app.get("/2", function(req, res){
    fs.readFile("2.html", function(err, data){
        var result = data.toString()
        res.send(result)
    })
})

app.engine('hbs', hbs({
    extname : 'hbs',
    defaultLayout : false,
}))
app.set('view engine', 'hbs')

app.get("/3", function(req, res){
    res.render("user1", {
        name : "bellmin",
        age : 27
    })
})

app.get("/4", function(req, res){
    res.render("viplist1", {
        items : [ "bellmin", "Dahee"]
    })
})

app.get("/5", function(req, res){
    res.render('main1', {
        isLogin : false
    })
})

app.get("/login", function(req, res){
    res.render("login1")
})

var real_id = "bellmin"
var real_pw = "jongmin"

app.get("/login_process", function(req, res){
    if(req.query.user_id === real_id && req.query.user_pw === real_pw){
        res.cookie("user1", { name : "김종민", age : 27})
        res.send("Success")
    } else {
        res.send("Fail")
    }
})

app.get("/join", function(req, res){
    res.render("join1")
})

var person = []
app.get("/join_process", function(req ,res){
    person.push(req.query.user_id)
    // join1.hbs 에 있는 input id name과 같아야함
    console.log(person)
    res.send("회원가입이 완료되었습니다.")
})

app.get("/list", function(req, res){
    console.log(req.cookies.user)
    if(req.cookies.user){
        res.render("main1", {
            isLogin : true
        })
    } else {
        res.render("main1", {
            isLogin : false
        })
    }
})

app.listen(1993, function(){
    console.log("Open")
})



/*
[ TODO ]
1) 개념복습
2) 게시판만들기 
    2-0) 모든 페이지에는 hbs 하나당 하나의 css 와 반드시 연결되어있어야함
    2-1) 글 쓸수있는 페이지 ( input 몇개 필요 ( 제목, 내용등... ) )
        => FORM의 등록버튼 누를시 서버로 게시글전송
        => 서버에서는 해당글 제목, 내용을 저장 ( var database = [] 빈배열에 넣음push )
   ( 주의 게시글에는 title, content, id 3가지의 값은 무조건 있어야함 )
      ( id 라는것은 글써진 순서에따른 고유넘버를 뜻함 첫번째글은 1 두번째글은 2 ..... 101 번째글은 id : 101 )
        * 글을 성공적으로 등록하고 난후에는 res.redirect("/test") 로 다른곳으로 보내기 * ( res.send, res.render와 다르게 res.redirect(얘는 다른곳으로 보냄))

    2-2) 글 볼수있는 페이지 ( 전체글 전부다 나옴 ) ( 위에서 저장한 database 이용하면 됨 ) ( and hbs 반복이용 )
        => 제목글
   제목글
   제목글
   ....

    2-3) (선택도전) 글 볼수있는 페이지에서 삭제버튼을 만들어서 누를시 해당글 삭제하기

3) 로그인 구현
   user_id : "admin"
   user_pw : "123123" 일 경우에만 로그인시켜줌 (쿠키 발급)

4) SECRET 페이지 구현
   => 로그인 되어있는 유저만 입장가능한 페이지

5) 특정 페이지(hbs)를 만들어서
   hbs 의 기능 ( 빵꾸, 반복, 조건문 ) 전부다 동시에 사용해보기

6) 생활코딩 데이터베이스 듣기
데이터베이스의 목적 ~ SQL DELETE 구문까지 ( 약 10강 )
다 듣고난후엔
SQL INSERT
SQL SELECT
SQL UPDATE
SQL DELETE
이 4가지만 연습 
<로그인 방법>
 mysql -u root -p -h localhost
 111111
*/