
const bcrypt = require("bcryptjs");
const Cred = require("../model/Credential");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../security/Auth");


const register = async (req, res) => {
    try{
        let {email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        const cred = new Cred({email, password, role});
        await cred.save();
        return res.status(201).json(`new user with role ${role}`);
    }catch(e){
        res.status(500).json({error: e.message});
    }
}


const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const cred = await Cred.findOne({email});
        if (!cred || !(await bcrypt.compare(password, cred.password))){
            return res.status(403).send('Invalid username or password');
        }
        const token = jwt.sign({ email: cred.email, role: cred.role }, SECRET_KEY, {expiresIn: '1h'});
        res.json({ token });
    }catch (e){
        res.status(500).json({error: e.message});
    }
}

module.exports = {login, register};
