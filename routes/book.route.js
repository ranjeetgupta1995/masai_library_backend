const express = require('express');
const { bookModel } = require('../model/book.model');
const { auth } = require('../middleware/auth.middleware');

const bookRouter = express.Router();
bookRouter.use(auth);

//This endpoint should return a list of all available books.
bookRouter.get('/', async(req, res) => {
    try{
        const allBooks = await bookModel.find(req.query);
        res.status(200).json({allBooks});
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

//This endpoint should return the details of a specific book identified by its ID.
bookRouter.get('/:id', async(req, res) => {
    const id = req.params.id;
    const book = await bookModel.findOne({_id: id});
    if(!book){
        return res.send("This book not available!")
    }
    try{
        res.status(200).json({book});
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

//This endpoint should allow admin to add new books to the system. (Protected Route)
bookRouter.post("/post", async(req, res) => {
    try{
        if(req.body.isAdmin){
            const newBook = new bookModel(req.body);
            await newBook.save();
            res.status(200).json({"msg": "new book has been added", "newBook": newBook})
        }else{
            res.status(200).json({"msg": "You are not authorized, only admin can post the data"})
        }
    }
    catch(err){
        res.status(400).json({"error": err})
    }
})

//This endpoint should allow admin to update the details of a specific book identified by its ID. (Protected Route)
bookRouter.patch('/update/:id', async(req, res) => {
    const id = req.params.id;
    const data = await bookModel.findOne({_id: id});
    if(!data){
        return res.send("This book not available!")
    }
    try{
        if(data.isAdmin && data.userName == req.body.userName){
            await bookModel.findByIdAndUpdate({_id: id}, req.body);
            res.status(200).json({"msg": "book has been updated"})
        }else{
            res.status(200).json({"msg": "You are not authorized, only admin can update the data"})
        }
    }
    catch(err){
        res.status(400).json({"error": err})
    }
});

//This endpoint should allow admin to delete a specific book identified by its ID. (Protected Route)
bookRouter.delete('/delete/:id', async(req, res) => {
    const id = req.params.id;
    const data = await bookModel.findOne({_id: id});
    if(!data){
        return res.send("This book not available!")
    }
    try{
        if(data.isAdmin && data.userName == req.body.userName){
            await bookModel.findByIdAndDelete({_id: id});
            res.status(200).json({"msg": "book has been deleted"})
        }else{
            res.status(200).json({"msg": "You are not authorized, only admin can delete the data"})
        }
    }
    catch(err){
        res.status(400).json({"error": err})
    }
});

module.exports = {
    bookRouter
}