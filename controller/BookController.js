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
        // const book = new Book(req.body);
        const {title, author, isbn, publicationDate, contentType} = req.body
        const book = new Book({
            title,
            author,
            isbn,
            publicationDate,
            contentType,
            contentURL:req.file.originalname
        });
        await book.save();
        res.status(201).json("Book added successfully");
    } catch (e){
        res.status(500).json({ error: e.message});
    }
}

const findById = async (req, res) =>{
    try{
        const book = await Book.findById(req.params.id);
        res.status(200).json(book);
    }catch (e){
        res.status(500).json(e);
    }
}

const deleteById = async (req, res) => {
    try{
        await Book.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully");
    } catch (e){
        res.status(500).json({error: e.message});
    }
}

const update = async (req, res) => {
    try{
        await Book.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(201).body("Book updated successfully");
    } catch (e){
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