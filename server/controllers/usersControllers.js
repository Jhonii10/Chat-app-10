const User = require("../models/usersModels");
const bcrypt = require("bcrypt");

module.exports.register =async ( req , res , next) => {
    try {
        const {name, email, password} = req.body;
    const nameCheck = await User.findOne({name});
    const emailCheck = await User.findOne({email});
    const hashedPassword = await bcrypt.hash(password,10)
   
    if (nameCheck) {
        return res.json({msg:'name already used', status:false})
    }
    if (emailCheck) {
        return res.json({msg:'email already used', status:false})
    }

    const user = await User.create({
        name : name,
        email : email,
        password: hashedPassword,
    })
    delete user.password;

    return res.json({
        status:true,
        user
    })
    } catch (error) {
        next(error.message);
    }
};