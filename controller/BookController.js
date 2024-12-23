const { Book } = require("../model")

Book = require("../model/Book")

const findAll = async (req, res) => {
    try{
        const books = await Book.find();
        res.status(200).json(books);
    } catch (e){
        res.json(e);
    }
}

const save = async (req, res)=>{
    try{
        const book = new Book(req.body);
        await book.save();
        req.status(201).json(book);
    } catch (e){
        res.status(500).json(e);
    }
}

const findById = async (req, res) =>{
    try{
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    }catch (e){
        res.status(500).body(e)
    }
}

const deleteById = async (req, res) => {
    try{
        Book.findByIdAndDelete(req.params.id);
        req.status(200).body("Deleted Successfully");
    } catch (e){
        req.status(500).body(e);
    }
}

const update = async (req, res) => {
    try{
        await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(201).body("Book updated successfully");
    } catch (e){
        req.status(500).body(e)
    }
}

module.exports={
    findAll,
    save,
    findById,
    deleteById,
    update
}