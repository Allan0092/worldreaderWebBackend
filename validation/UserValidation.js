const joi = require("joi");

const userSchema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().required(),
});

function UserValidation(req, res, next){
    const {email, password}=req.body;
    const {error}=userSchema.validate({email, password});
    if (error){
        return res.json(error);
    }
    next();
}

module.exports=UserValidation;