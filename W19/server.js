const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let db, collection;

// Connect Database
async function connectDB() {
    await client.connect();
    db = client.db("student"); // a) Create Database
    collection = db.collection("studentmarks"); // b) Create Collection
    console.log("Connected to MongoDB");
}

connectDB();


// Function to display table
function displayTable(res, students, title = "Student Marks") {

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

    table{
        margin:auto;
        border-collapse:collapse;
        width:85%;
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
    <th>Name</th>
    <th>Roll No</th>
    <th>WAD</th>
    <th>DSBDA</th>
    <th>CNS</th>
    <th>CC</th>
    <th>AI</th>
    </tr>
    `;

    students.forEach(s => {
        html += `
        <tr>
        <td>${s.Name}</td>
        <td>${s.Roll_No}</td>
        <td>${s.WAD_Marks}</td>
        <td>${s.DSBDA_Marks}</td>
        <td>${s.CNS_Marks}</td>
        <td>${s.CC_Marks}</td>
        <td>${s.AI_Marks}</td>
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


// c) Insert students
app.get("/insert", async (req, res) => {

    const students = [

        { Name: "ABC", Roll_No: 111, WAD_Marks: 25, DSBDA_Marks: 25, CNS_Marks: 25, CC_Marks: 25, AI_Marks: 25 },

        { Name: "DEF", Roll_No: 112, WAD_Marks: 30, DSBDA_Marks: 22, CNS_Marks: 28, CC_Marks: 26, AI_Marks: 29 },

        { Name: "GHI", Roll_No: 113, WAD_Marks: 18, DSBDA_Marks: 21, CNS_Marks: 24, CC_Marks: 20, AI_Marks: 19 },

        { Name: "JKL", Roll_No: 114, WAD_Marks: 27, DSBDA_Marks: 29, CNS_Marks: 26, CC_Marks: 28, AI_Marks: 30 },

        { Name: "MNO", Roll_No: 115, WAD_Marks: 15, DSBDA_Marks: 17, CNS_Marks: 19, CC_Marks: 16, AI_Marks: 14 }

    ];

    await collection.insertMany(students);

    res.send("Students Inserted Successfully");

});


// d) Display all students
app.get("/students", async (req, res) => {

    const students = await collection.find().toArray();

    displayTable(res, students, "All Students");

});


// e) Students with DSBDA > 20
app.get("/dsbda20", async (req, res) => {

    const students = await collection.find(
        { DSBDA_Marks: { $gt: 20 } }
    ).toArray();

    displayTable(res, students, "Students with DSBDA > 20");

});


// f) Update marks of specified student by 10
app.get("/update/:name", async (req, res) => {

    await collection.updateOne(
        { Name: req.params.name },
        { $inc: { DSBDA_Marks: 10 } }
    );

    res.send("Marks Updated");

});


// g) Students with >25 in all subjects
app.get("/above25", async (req, res) => {

    const students = await collection.find({

        WAD_Marks: { $gt: 25 },
        DSBDA_Marks: { $gt: 25 },
        CNS_Marks: { $gt: 25 },
        CC_Marks: { $gt: 25 },
        AI_Marks: { $gt: 25 }

    }).toArray();

    displayTable(res, students, "Students with >25 in all subjects");

});


// h) Less than 40 in Maths and Science (assuming WAD & CNS)
app.get("/less40", async (req, res) => {

    const students = await collection.find({

        WAD_Marks: { $lt: 40 },
        CNS_Marks: { $lt: 40 }

    }).toArray();

    displayTable(res, students, "Less than 40 in Maths & Science");

});


// i) Delete specified student
app.get("/delete/:name", async (req, res) => {

    await collection.deleteOne(
        { Name: req.params.name }
    );

    res.send("Student Deleted");

});


// Server
app.listen(3000, () => {

    console.log("Server running on port 3000");

});