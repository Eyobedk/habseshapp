module.exports.signup_Get = (req,res)=>{
    res.render('signup');
}

module.exports.signup_Post = (req,res)=>{
    res.send('signup post');
}

module.exports.login_Get = (req,res)=>{
    res.render('login');
}

module.exports.login_Post = (req,res)=>{
    res.send('login post');
}