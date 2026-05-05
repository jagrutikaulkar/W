const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db, collection;

// Connect MongoDB
async function connectDB() {
    await client.connect();
    db = client.db("music"); // a) Create Database
    collection = db.collection("song_details"); // b) Create Collection
    console.log("Connected to MongoDB");
}
connectDB();


// Function to display table
function displayTable(res, songs, title = "Song Details") {

    let html = `
    <html>
    <head>
    <title>${title}</title>

    <style>
    body{
        font-family: Arial;
        background:#f2f2f2;
        text-align:center;
    }

    h2{
        color:#333;
    }

    table{
        margin:auto;
        border-collapse:collapse;
        width:80%;
        background:white;
        box-shadow:0px 0px 10px rgba(0,0,0,0.2);
    }

    th{
        background:#007bff;
        color:white;
        padding:10px;
    }

    td{
        padding:10px;
        border-bottom:1px solid #ddd;
    }

    tr:hover{
        background:#f5f5f5;
    }
    </style>

    </head>

    <body>

    <h2>${title}</h2>

    <table>
    <tr>
    <th>Song Name</th>
    <th>Film</th>
    <th>Music Director</th>
    <th>Singer</th>
    <th>Actor</th>
    <th>Actress</th>
    </tr>
    `;

    songs.forEach(s => {
        html += `
        <tr>
        <td>${s.Songname}</td>
        <td>${s.Film}</td>
        <td>${s.Music_director}</td>
        <td>${s.Singer}</td>
        <td>${s.Actor || "-"}</td>
        <td>${s.Actress || "-"}</td>
        </tr>
        `;
    });

    html += `
    </table>
    </body>
    </html>
    `;

    res.send(html);
}


// c) Insert 5 songs
app.get("/insert", async (req, res) => {

    const songs = [
        { Songname: "Kesariya", Film: "Brahmastra", Music_director: "Pritam", Singer: "Arijit Singh" },
        { Songname: "Tum Hi Ho", Film: "Aashiqui 2", Music_director: "Mithoon", Singer: "Arijit Singh" },
        { Songname: "Kal Ho Na Ho", Film: "Kal Ho Na Ho", Music_director: "Shankar Ehsaan Loy", Singer: "Sonu Nigam" },
        { Songname: "Malang", Film: "Dhoom 3", Music_director: "Pritam", Singer: "Shilpa Rao" },
        { Songname: "Channa Mereya", Film: "Ae Dil Hai Mushkil", Music_director: "Pritam", Singer: "Arijit Singh" }
    ];

    await collection.insertMany(songs);
    res.send("5 Songs Inserted");
});


// d) Display all songs
app.get("/songs", async (req, res) => {

    const songs = await collection.find().toArray();
    displayTable(res, songs, "All Songs");
});


// e) Songs by Music Director
app.get("/music/:director", async (req, res) => {

    const songs = await collection.find({
        Music_director: req.params.director
    }).toArray();

    displayTable(res, songs, "Songs by Music Director");
});


// f) Music Director songs sung by Singer
app.get("/director/:director/singer/:singer", async (req, res) => {

    const songs = await collection.find({
        Music_director: req.params.director,
        Singer: req.params.singer
    }).toArray();

    displayTable(res, songs, "Songs by Director and Singer");
});


// g) Delete song
app.get("/delete/:song", async (req, res) => {

    await collection.deleteOne({
        Songname: req.params.song
    });

    res.send("Song Deleted");
});


// h) Add new song
app.get("/add", async (req, res) => {

    const song = {
        Songname: "Apna Bana Le",
        Film: "Bhediya",
        Music_director: "Sachin Jigar",
        Singer: "Arijit Singh"
    };

    await collection.insertOne(song);

    res.send("New Song Added");
});


// i) Songs by Singer from Film
app.get("/film/:film/singer/:singer", async (req, res) => {

    const songs = await collection.find({
        Film: req.params.film,
        Singer: req.params.singer
    }).toArray();

    displayTable(res, songs, "Songs by Film and Singer");
});


// j) Update song with Actor and Actress
app.get("/update/:song", async (req, res) => {

    await collection.updateOne(
        { Songname: req.params.song },
        {
            $set: {
                Actor: "Ranbir Kapoor",
                Actress: "Alia Bhatt"
            }
        }
    );

    res.send("Song Updated");
});


// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});