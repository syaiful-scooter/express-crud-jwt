const {User} = require("../models");
const jwt = require('jsonwebtoken');

const signToken = id =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user, statusCode, res)=>{
    const token = signToken(user.id)

    const cookieOptions = {
        expire : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.cookie("jwt", token, cookieOptions)
    user.password = undefined
    res.status(statusCode).json({
        status : "success",
        data:{
            user
        }
    })
}

exports.registerUser = async (req, res)=>{
    try {
        // let {name, email, password, passwordConfirm} = req.body
        // di ganti karena menampung req body kedalam variable 
        // merupakan isue security 

        if(req.body.password != req.body.passwordConfirm){
            return res.status(400).json({
                message:"password tidak sama",
                error : ["validasi password error"]
            })
        }

        const newUser =  await User.create({
            name: req.body.name, 
            email:req.body.email, 
            password:req.body.password
        })

        // const token = signToken(newUser.id)

        // return res.status(201).json({
        //     message:"Register berhasil",
        //     data : newUser,
        //     token
        // })

        createSendToken(newUser, 201, res)
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message : "Validasi Error",
            error: error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async (req, res) => {
    // return res.send(" tes Login function")
    // 1) fungsi validasi 
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status:"Fail",
            message:"error validation",
            error:"please input email / password"
        })
    }

    // 2) cek email di db & pass true
    const userData = await User.findOne({where:{email:req.body.email}})

    if (!userData || !(await userData.CorrectPassword(req.body.password, userData.password))){
        return res.status(400).json({
            status: "Fail",
            message: "Error Login",
            error:"Invalid Email or Password"
        })
    }

    // 3) jika semua betul, berikan respon token pada saat login
    // const token =  signToken(userData.id)
    // return res.status(200).json({
    //     status:"succes",
    //     message:"Login Berhasil",
    //     token
    // })

    createSendToken(userData, 200, res)
}

exports.logoutUser = async (req, res) => {
    // 1) clear jwt
    res.cookie('jwt', '', {
        httpOnly : true,
        expire   : new Date(0)
    })

    res.status(200).json({
        message:"LogOut Berhasil"
    })
}


exports.getMyuser = async (req, res) => {
    const currentUser = await User.findByPk(req.user.id)

    if (currentUser) {
        return res.status(200).json({
            id :currentUser.id,
            name: currentUser.name,
            email: currentUser.email,
            role_id : currentUser.role_id
        })
    }

    return res.status(404).json({
        message: "User not found"
    })
}