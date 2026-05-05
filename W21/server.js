const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve CSS file
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("bookstore");
    collection = db.collection("books");
    console.log("MongoDB Connected");
}
connectDB();


// HOME PAGE
app.get("/", (req, res) => {

res.send(`
<html>
<head>
<title>Book Store</title>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Add Book</h2>

<form action="/addBook" method="POST">

<input type="text" name="title" placeholder="Title"><br>
<input type="text" name="author" placeholder="Author"><br>
<input type="number" name="price" placeholder="Price"><br>
<input type="text" name="genre" placeholder="Genre"><br>

<button type="submit">Add Book</button>

</form>

<br>
<a href="/books">View Books</a>

</body>
</html>
`);

});


// ADD BOOK
app.post("/addBook", async (req, res) => {

const book = {
title: req.body.title,
author: req.body.author,
price: req.body.price,
genre: req.body.genre
};

await collection.insertOne(book);
res.redirect("/books");

});


// VIEW BOOKS
app.get("/books", async (req, res) => {

const books = await collection.find().toArray();

let html = `
<html>
<head>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Book List</h2>

<table>

<tr>
<th>Title</th>
<th>Author</th>
<th>Price</th>
<th>Genre</th>
<th>Action</th>
</tr>
`;

books.forEach(b => {

html += `
<tr>
<td>${b.title}</td>
<td>${b.author}</td>
<td>${b.price}</td>
<td>${b.genre}</td>

<td>
<a href="/edit/${b._id}">Update</a>
<a href="/delete/${b._id}">Delete</a>
</td>
</tr>
`;

});

html += `
</table>

<br>
<a href="/">Add New Book</a>

</body>
</html>
`;

res.send(html);

});


// DELETE
app.get("/delete/:id", async (req, res) => {

await collection.deleteOne({ _id: new ObjectId(req.params.id) });
res.redirect("/books");

});


// UPDATE FORM
app.get("/edit/:id", async (req, res) => {

const book = await collection.findOne({ _id: new ObjectId(req.params.id) });

res.send(`
<html>
<head>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Update Book</h2>

<form action="/update/${book._id}" method="POST">

<input type="text" name="title" value="${book.title}"><br>
<input type="text" name="author" value="${book.author}"><br>
<input type="number" name="price" value="${book.price}"><br>
<input type="text" name="genre" value="${book.genre}"><br>

<button type="submit">Update</button>

</form>

</body>
</html>
`);

});


// UPDATE
app.post("/update/:id", async (req, res) => {

await collection.updateOne(
{ _id: new ObjectId(req.params.id) },
{
$set:{
title:req.body.title,
author:req.body.author,
price:req.body.price,
genre:req.body.genre
}
}
);

res.redirect("/books");

});


// SERVER
app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});