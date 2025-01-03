const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET_KEY } = require('../security/Auth')

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
        let user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 10);
        await user.save();
        return res.status(201).send("User Registered successfully");
    }catch (e){
        if (e.code === 11000){// when email already exists
            return res.status(400).json({error: 'Email already exists'})
        }
        return res.status(500).json(e)
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
        let user = res.body
        user.password = await bcrypt(user.password, 10)
        User.findByIdAndUpdate(res.params.id, res.body, {new: true});
        return res.status(201).body("User data updated successfully");
    }catch (e){
        return res.status(500).json(e);
    }
}

const login_user = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))){
            return res.status(403).send('Invalid email or password');
        }
        const token = jwt.sign({email:user.email, id:user.id}, SECRET_KEY, {expiresIn: '1h'});
        return res.status(200).json({ token });
    } catch (e){
        return res.status(500).json(e);
    }
}

module.exports={
    findAll,
    save,
    findById,
    deleteById,
    update,
    login_user
}