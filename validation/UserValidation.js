const joi = require("joi");

const userSchema = joi.object({
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().required(),
});

function UserValidation(req, res, next){
    const {email, password, first_name, last_name}=req.body;
    const {error}=userSchema.validate({email, password, first_name, last_name});
    if (error){
        return res.json(error);
    }
    next();
}

module.exports=UserValidation;