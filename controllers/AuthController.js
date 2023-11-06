const {User} = require("../models")

exports.registerUser = async (req,res)=>{
    try {
        // let {name, email, password, passwordConfirm} = req.body
        // di ganti karena menampung req body kedalam variable merupakan isue security 

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

        return res.status(201).json({
            message:"Register berhasil",
            data : newUser  
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message : "Validasi Error",
            error: error.errors.map(err => err.message)
        })
    }
}

exports.loginUser = async (req,res) => {

    // 1 fungsi validasi 
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            status:"Fail",
            message:"error validation",
            error:"please input email / password"
        })
    }

    // 2 cek email di db & pass true

    // return res.send(" tes Login function")
    // try {
    //     // let {name, email, password, passwordConfirm} = req.body
    //     // di ganti karena menampung req body kedalam variable merupakan isue security 

    //     if(req.body.password != req.body.passwordConfirm){
    //         return res.status(400).json({
    //             message:"password tidak sama",
    //             error : ["validasi password error"]
    //         })
    //     }

    //     const newUser =  await User.create({
    //         name: req.body.name, 
    //         email:req.body.email, 
    //         password:req.body.password
    //     })

    //     return res.status(201).json({
    //         message:"Register berhasil",
    //         data : newUser  
    //     })
    // } catch (error) {
    //     console.log(error)
    //     return res.status(400).json({
    //         message : "Validasi Error",
    //         error: error.errors.map(err => err.message)
    //     })
    // }
}