const joi = require("joi");

const bookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    isbn: joi.string().required(),
    contentType: joi.string().required(),
    file: joi.string().required()
})

function BookValidation(req, res, next){
    const {title, author, isbn, contentType, file}=req.body;
    const {error} = bookSchema.validate(title, author, isbn, contentType, file);
    if (error){
        return res.json(error);
    }
    next();
}

module.exports=BookValidation;