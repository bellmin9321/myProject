var fs = require("fs")
var express = require('express')
var app = express()
var hbs = require('express-handlebars')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

// /a 로 접속시 문자보내기
app.get("/a", function(req, res){
    res.send("hello there")
})

// /b 로 접속시
app.get("/b", function(req, res){
    res.send("<h1>태그보내기!</h1>")
})


/*
    /c 로 접속시
        cc.html 을 읽어서
            그 읽은 html을 브라우져로 보내줄수 있음
*/
app.get("/c", function(req, res){
    fs.readFile("cc.html", function(err, data){
        var result = data.toString()
        res.send(result)
    })
})

/*
    네트워크를 쓰는 프로그램은 꼭 하나의 PORT 를 가지고있음 ( 데이터통신할수있는 입구 )
*/
 
/*
    1) 브라우져에서 데이터를 보낼수있음 ( 서버로 )
    2) form 태그를 이용
        <form action="/add">   ( 액션으로 어디로 보낼지 설정 )
            <input type="text" name="user_id">  ( name 으로 어떤값에다가 담아 보낼지 설정 )
            <input type="text" name="user_pw">
            <button>submit!</button>   ( 폼안에 있는 button 클릭시 보내짐 )
        </form>    
    3) 서버에서는 그에해당하는 처리를 미리 하고있어야함
        app.get("/add", function(req, res){

        }) .....
    4) 서버에서 응답함수는 function(req,res) 인자가 두개있다
        req, res
        요청에 응답할때는
        res.send() 로 응답함

        요청에대한 정보( 브라우져가 보내는 데이터는 )
        req.query 안에 들어있음

        req.query.user_id 와 req.query.user_pw 에 들어있는 값을
        객체로 만들었어
        var person = {
            id : req.query.user_id
            pw : req.query.user_pw  
        }

        이 객체를 배열에다가 넣었음

        -----data.push(person)-----


    5) /users 에서 만든건
        data 라는 배열안에 유저들 정보가 차곡 들어가잇음
        var data = [ { id: 'bellmin', pw: 'dsffd' }, { id: 'sdff', pw: 'dfdf' } ]

        그정보들을 반복문을 돌려서 출력해주고싶음

        -----var result = ""------

        for(var i = 0; i < data.length; i++){
            ....
            result = result + "<div>" + data[i].id + "</div>"
        }

        res.send(result)
*/

app.get("/tttt", function(req, res){
    fs.readFile("main.html", function(err, data){
        var result = data.toString()
        var a = 3
        res.send(data.toString())
    })
})

app.get("/board", function(req, res){
    fs.readFile("board.html", function(err, data){
        var result = data.toString()
        res.send(result)
    })
})

app.get("/abc", function(req, res){
    fs.readFile("test.html", function(err, data){
        var result = data.toString()
        res.send(result)
    })
})

var data = []

// form 태그에서 들어오는 요청을 받는부분
app.get("/add", function(req, res){
    // input name 에 값들이 req.query 안에 들어있음

    // 근데 그 값들로객체를 만들었음
    var user = { 
        id : req.query.user_id,
        pw : req.query.user_pw,
    }

    // 그객체를 data 배열에 push 로 넣었음
    data.push(user)

    // 넣고나서 console.log로 잘 넣어졌나 확인하고
    console.log(data)
    res.send("dfsdf")
})


// form 태그에서 보낸 데이터들을 data 라는 배열에 차곡차곡 넣어놨었음
// 그데이터를 활용하는 부분
app.get("/users", function(req, res){
    var result = "" 

    for(var i = 0; i < data.length; i++){
        result = result + "<div>" + data[i].id + "</div>"
    }

    result = "<a href='/'>main</a>" + result 
    res.send(result)
})

// 응용
app.get("/add", function(req, res){
    if(req.query.user_id == "임태섭"){
        res.send("태섭이구나?")
    } else {
        res.send("누구세요")
    }
})

app.get("/login1", function(req, res){
    if(req.query.user_id == real_id){

    } else {

    }

    if(req.query.user_id == real_id){

    } else if (re) {

    } else if (d) {

    }
})


/*
공부할것
    변수, 객체, 배열, 반복문, 조건문, 함수
    밑에있는코드 전부다

    https://opentutorials.org/course/3370 ( 신버전 )  ( 요게 나을듯 )
    https://opentutorials.org/course/2136 ( 구버전 )
*/


/* ---------------class2-----------------------------

    res.send    "hello"
    res.send     "<h1></h1>"
    res.send   data.toString() -> data를 문자열로 변환
    replace

    정적파일은 "public 폴더에다가 몰아놓고 서비스함"  express.static...
    동적파일은 views 폴더에 hbs 형태로 놔두고 렌더링함

    res.render 는 밑에 있는 코드들을 함축하고 있음.

        template engine(hbs)을 사용하는 폴더 : default = views
            views 특별한 폴더에서 

            user.hbs 

            fs.readFile

            data.toString()

            replace(......)

            res.send()

    template engine
        1) 빵꾸
        2) 반복   ( for )
        3) 조건   ( if )

    어떻게 브라우져와 상태(로그인)를 유지 할 것인가

    1) 브라우져에서 서버로 로그인요청
    
    2) 만약 맞다면 ( 성공 이라면 )

    3) 서버에서 쿠키를 보내준다 res.send or res.render 와 함께

    4) 브라우져가 쿠키를 가지고있다가 다음 요청시에 쿠키가 있으면 항상 쿠키와 같이 요청을보낸다

    5) 서버에서는 쿠키가 있으면
        => 로그인 된사람

        없으면
        => 로그인 안된사람


        쿠키를 줄때 res.cookie("쿠키명", {   })
        

        쿠키가 브라우져에서 들어오는걸 확인할때 req.cookies.user


    6) 프로그램은 기본적으로 RAM 이라는 메모리를 사용한다
        RAM은 전기적신호로 작동해
            => 프로그램 꺼지거나 컴퓨터꺼지면 전기공급이꺼지고 다 날아감

        데이터를 어떻게 영구적으로 저장할수있는가?
        DISK (< > <>>> <> ) 에 쓴다.

    데이터베이스 강의 ( 위에꺼를 완벽하게 햇을때 예습 )
    [김기현] [오전 2:29] https://opentutorials.org/course/3161/19532
 */

app.get("/mem", function(req, res){
    fs.readFile("user.html", function(err, data){
        var result = data.toString()
        result = result.replace("{{ 실제이름 }}", "안다히")
        res.send(result)
    })
})

app.get("/abc", function(req, res){
    fs.readFile("abc.txt", function(err, data){
        res.send(data.toString())
    })
})
// "/public/main.css"
// "/public/test.css"
// "/public/test.png"

// template engine 세팅부분
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: false,
}))
app.set('view engine', 'hbs')

/* "/public" 접두사로 들어오는 요청은 "public" 폴더에서 찾아서 보내주겠다.
단, static 뒤에 꼭 public 이 아니여도 됨.
ex) app.use("/public, express.static("privacy")) 이면 /public 접두사로 들어온 요청을 privacy 폴더에서 찾아서 보내겠다. */

/* 정적파일(static) /public 으로 들어오는 요청은
    전부다 public 폴더에서 찾아서 보내주니깐\
    /public/user1.css 이렇게 linke 시켜놓는거지
*/ 
app.use("/public", express.static("public"))

/* html은 동적으로 만들어내야함

 app.get("/userProfile", function(req, res){
     var a = "김종민"
     res.send("<h1>" + a + "</h1>")
})
*/

app.get("/mm", function(req, res){
    res.render("user", {
        name : "bellmin",
        age : 27
    })
})

app.get("/vip", function(req, res){
    res.render("viplist", {
        items : ["kihyun0402", "subi53", "woony", "subi53", "woony"]
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

var real_id = "woony"
var real_pw = "123"

app.get("/login_process", function(req, res){
    if(req.query.user_id === real_id && req.query.user_pw === real_pw ) {
        res.cookie("user", { name : "김종민", age : 27 })
        res.send("success")
    } else {
        res.send("fail")
    }
})

// RAM

// DB(database) 본질 : DISK 에다가 값을 편하게 써주는 애

app.get("/join", function(req, res){
    res.render("join")
})

var users = []
app.get("/join_process", function(req, res){
    users.push(req.query.user_id)
    console.log(users)
    res.send("회원가입이 완료되었습니다.")
})

app.get("/member", function(req, res){
    console.log(req.cookies.user) // terminal에 user 정보를 보이기 위함
    if(req.cookies.user){
        res.render("main", {
            isLogin : true
        })
    } else {
        res.render("main", {
            isLogin : false
        })
    }
})
// 3000포트를 듣고있는중
app.listen(3000, function(){
    console.log("포트가 열렸습니다")
})