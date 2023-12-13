const User = require("../models/usersModels");
const bcrypt = require("bcrypt");

module.exports.register =async ( req , res , next) => {
    try {
        const {name, email, password} = req.body;
        const nameCheck = await User.findOne({name});
        const emailCheck = await User.findOne({email});
        const hashedPassword = await bcrypt.hash(password,10)
   
    if (nameCheck) {
        return res.json({msg:'Nombre ya en uso', status:false})
    }
    if (emailCheck) {
        return res.json({msg:'Correo ya en uso', status:false})
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


module.exports.login = async ( req , res , next) => {
    try {
    const {email, password} = req.body;
    
    const user = await User.findOne({email});
   
    if (!user) {
    return res.json({msg:'Correo o contraseña incorrectos', status:false})
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.json({msg:'Correo o contraseña incorrectos', status:false})
    }

    delete user.password;

    return res.json({
        status:true,
        user
    })
    } catch (error) {
        next(error.message);
    }
};



module.exports.setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const avatarImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvatarImageSet: true,
          avatarImage,
        },
        { new: true }
      );
      return res.json({
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };