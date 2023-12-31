const messageModels = require("../models/messageModels");

module.exports.addMessage = async (req, res, next) => {

    try {
        const { from , to , message}= req.body;
        const data = await messageModels.create({
            message:{text: message},
            users:[from, to],
            sender:from,

        })

        if (data) {
            res.json({msg:'Message added successfully'})
        }else{
            res.json({msg:'Failed to add message to the database'})
        }
    } catch (error) {
        next(error)
    }


}
module.exports.getAllMessage = async (req, res, next) => {

    try {
        const {from, to } = req.body;

        const messages = await messageModels.find({
            users: { $all: [from, to] }
        }).sort({ updatedAt: 1 });

        const projectMessages = messages.map((msg)=>{
            return  {
                fromSelf:msg.sender.toString() === from,
                message:msg.message.text,
            }
        })

        res.json(projectMessages)

    } catch (error) {
        next(error)
    }

}