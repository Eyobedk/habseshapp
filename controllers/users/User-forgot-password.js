const jwt = require('jsonwebtoken');
const User = require('../../models/User')
const {Mailer} = require('../../utils/Mail');
require('dotenv').config();
var userId;

module.exports.forgot_password = async (req, res, next) => {
    const {
        email
    } = req.body;
    const user = await User.findEmail(email);
    console.log("me"+JSON.stringify(user[0]))
    if(!(user[0].password))
    {
        let message = "You have to be registered using the platform signup feature inorder to recive forgot password email"
        res.render('users/forgot-password',{notfound:message});
        return
    }
    console.log(user)
    console.log("the domain id "+ user[0].user_id)
    if(!(user[0]))
    {
        let message = "You have to be registered using the platform signup feature inorder to recive forgot password email"
        res.render('users/forgot-password',{notfound:message});
        return
    }

    if (user) {
        const secret = process.env.FORGOT_PASSWORD_SECRET_KEY;
        let id = user[0].user_id;
        const token = jwt.sign({id}, secret, {
            expiresIn: '15m'
        });
        userId = id
        const link = `http://localhost:3000/reset-password/${id}/${token}`;
        Mailer(email, link);
        res.render('users/forgot-password',{alert:"password reset link sent to email"})
    } else {
        res.send("user does not exist");
        next();
    }
}

module.exports.validateAndSendLink = async (req, res, next) => {
    const {
        id,
        token
    } = req.params;

    
    const secret = process.env.FORGOT_PASSWORD_SECRET_KEY;
    // console.log('id and token'+id, token);
    jwt.verify(token, secret, (err, verified) => {
        if (err) {
            console.log(err);
            res.render('users/forgot-password',{alert:"please send varification link again"})
        }
        else{res.render('users/reset-password');}
    });
}

module.exports.setNewPassword =async (req,res)=>{
    const {password1, password2} = req.body;
    
    console.log("the url"+req.url)
    var result = password1.localeCompare(password2);
    console.log(userId)
    if(result == 1 || result == -1)
    {
        const pass ="please Enter the same passwords";
        return res.render('users/reset-password',{pass});
    }
    await User.updatePassword(userId,password1).then(()=>{
        res.redirect(302, 'Login');
    });
}

// async function TestSendingEmail(email)
// {
//     const user = await User.findEmail(email);
//     console.log("me"+JSON.stringify(user[0]))
//     if(!(user[0]))
//     {
//         return "user Not Found"
//     }

//     const secret = process.env.FORGOT_PASSWORD_SECRET_KEY;
//     let id = user[0].user_id;
//     const token = jwt.sign({id}, secret, {
//         expiresIn: '15m'
//     });
//     userId = id
//     const link = `http://localhost:3000/reset-password/${id}/${token}`;
//     const TheResultfroMail =  Promise.resolve(await Mailer(email, link));       

//     return TheResultfroMail.accepted;
// }

// module.exports = {TestSendingEmail}