//npm install fs-finder
//npm install colors

var Finder = require('fs-finder');
var fs = require('fs');
var colors = require('colors/safe');
var allArgs = process.argv.slice(2);

var register = function(myArgs) {
    for(var i=0; i < myArgs.length; i++) {
        var readMe = fs.readFileSync('users.txt','utf8');
        if (i == myArgs.length-1) {
            fs.writeFileSync('users.txt', readMe+myArgs[i]);
        } else {
            fs.writeFileSync('users.txt', readMe+myArgs[i]+',');
        }
    }
    fs.writeFileSync('users.txt', readMe+'\n');
    console.log(colors.green('\nREGISTERED\n'));
}

var login = function(myArgs) {
    var readMe = fs.readFileSync('users.txt','utf8');
    var arrUser = readMe.split('\n');
    var loginSuccess = false;
    for (var i=0; i < arrUser.length; i++) {
        var oneUser = arrUser[i].split(',');
        var arrNamePass = [];
        arrNamePass[0] = oneUser[0];
        arrNamePass[1] = oneUser[1];
        if (myArgs[0] === arrNamePass[0] && myArgs[1] === arrNamePass[1]) {
            loginSuccess = true;
        }
    } 
    if (loginSuccess == true) {
        console.log(colors.green('\nSuccessful Login\n'));
    } else {
        console.log(colors.red('\nLogin Failed\n'));
    }
}

var getUserInfo = function(myArgs) {
    var readMe = fs.readFileSync('users.txt','utf8');
    var arrUser = readMe.split('\n');
    var check = false;
    console.log('\n');
    for (var i = 0; i < arrUser.length; i++) {
        var oneUser = arrUser[i].split(',');
        if (myArgs[0] === oneUser[0]) {
            console.log(colors.green('Password:', oneUser[1], ', E-mail:', oneUser[2], ', Age:', oneUser[3],'\n'));
            check = true
        }
    } 
    if (check == false) {
        console.log(colors.red("There is no such user whose name is ", myArgs[0],'\n'));
    }
}

var getUsers = function() {
    var readMe = fs.readFileSync('users.txt','utf8');
    console.log(colors.yellow('\n\tList all users\n\n', readMe));
}

if(allArgs[0] === 'register' && allArgs.length == 5) {
    var myArgs = allArgs.slice(1);
    register(myArgs);
} else if (allArgs[0] === 'login' && allArgs.length == 3) {
    var myArgs = allArgs.slice(1);
    login(myArgs);
} else if (allArgs[0] === 'getUserInfo' && allArgs.length == 2) {  
    var myArgs = allArgs.slice(1);
    getUserInfo(myArgs);
} else if (allArgs[0] === 'getUsers' && allArgs.length == 1) {
    getUsers();
}else {
    console.log(colors.red("\nIncorrect Input\n"));
}
