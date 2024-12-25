const User = require('../model/User');

const findAll = async (req, res) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    }
    catch (e){
        res.status(500).json(e);
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

const findById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    }catch(e){
        res.status(500).json(e);
    }
}

const deleteById = async (req, res) => {
    try{
        User.findByIdAndDelete(req.params.id);
        res.status(200).body("User account deleted successfully");
    } catch (e){
        res.status(500).json(e);
    }
}

const update = async (req, res) => {
    try{
        User.findByIdAndUpdate(res.params.id, res.body, {new: true});
        res.status(201).body("User data updated successfully");
    }catch (e){
        res.status(500).json(e);
    }
}

module.exports={
    findAll,
    save,
    findById,
    deleteById,
    update
}