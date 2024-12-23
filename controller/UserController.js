const User = require('../model/User');

const findAll = async (req, res) => {
    try{
    const users = await User.find();
    res.status(200).json(users);
    }
    catch (e){
        console.log("[!] Error at controller");
        console.log(e);
        res.json(e);
    }
}

const save = async (req, res)=>{
    try{
        const user = new User(req.body);
        await user.save();
        res.status(201).json(user);
    }catch (e){
        res.status(500).json(e)
    }
}

module.exports={
    findAll,
    save
}