
const bcrypt = require("bcryptjs");
const Cred = require("../model/Credential");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../security/Auth");


const register = async (req, res) => {
    const {email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const cred = new Cred(email, hashedPassword, role);
    cred.save();
    return res.status(201).json(`new user with role ${role}`);
}


const login = async (req, res) => {
    const {email, password} = req.body;
    const cred = await Cred.findOne({email});
    if (!cred || !(await bcrypt.compare(password, cred.password))){
        return res.status(403).send('Invalid username or password');
    }
    const token = jwt.sign({ email: cred.email, role: cred.role }, SECRET_KEY, {expiresIn: '1h'});
    res.json({ token });
}

module.exports = {login, register};
