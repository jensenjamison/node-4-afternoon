const users = require('../models/users');
let id = 1;

function register(req, res){
    let {session}=req;
    let {username, password}=req.body;

    users.push({id, username, password});
    id++;
    session.user.username =username;
    res.status(200).send(session.user)
}
function login(req, res){
    let {session}=req;
    let {username, password}=req.body;

    let user = users.find(user =>user.username === username && user.password === password);
    if(user){
        session.user.username = user.username;
        res.status(200).send(session.user);
    } else {
        res.status(500).send('UNAUTHORIZED_USER')
    }
}
function signout(req, res){
    let {session}=req;

    session.destroy();
    res.sendStatus(200);
}
function getUser(req, res){
    let {session}=req;

    res.status(200).send(session.user);
}

module.exports ={
    register, login, signout, getUser
}