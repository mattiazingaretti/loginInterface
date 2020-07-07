const port = 5555
$(document).ready(function () {

    $.ajax({
        headers: {
            'Content-Type': 'application/json'
        },
        type: 'GET',
        crossDomain: true,
        url: 'http://localhost:' + port + '/',
    })

    //Callback to signup button
    $("#signup").click(function () {
        window.location.href = "signup.html"
    });

    //Calback to home from signup
    $("#home").click(function () {
        window.location.href = "index.html"
    });


    //Callback to addUser btn
    $("#addUser").click(function () {
        
        //Retrieve signup form data
        let userSignup = {
            "email": $("#emailsignup").val(),
            "password": $("#passwordsignup").val(),
        }

        //Register new user        
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            crossDomain: true,
            url: 'http://localhost:' + port + '/signup',
            data: JSON.stringify(userSignup),
            success: function (jsondata) {
                alert("User correctly registered!")
            },
            error: function(){
                alert("Error")
            } 
        })

    })

    //Callback to login button
    $("#login").click(function () {
        
        //Retrieve login form data 
        let userlogin = {
            "email": $("#email").val() ,
            "password": $("#password").val(),
        }

        console.log(JSON.stringify(userlogin))

        //Send request to server at url ./login  
        $.ajax({
            headers: {
                'Content-Type': 'application/json'
            },
            type: 'POST',
            crossDomain: true,
            url: 'http://localhost:' + port + '/login',
            data: JSON.stringify(userlogin),
            success: function (jsondata) {
                alert("Loged in")
            },
            error: function(){
                alert("Error")
            } 
        })
    })


});






