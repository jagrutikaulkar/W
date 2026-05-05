const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Serve CSS
app.use(express.static("public"));

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

let collection;

async function connectDB() {
    await client.connect();
    const db = client.db("company");
    collection = db.collection("employees");
    console.log("MongoDB Connected");
}
connectDB();


// HOME PAGE
app.get("/", (req, res) => {

res.send(`
<html>
<head>
<title>Employee Management</title>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Add Employee</h2>

<form action="/addEmployee" method="POST">

<input type="text" name="name" placeholder="Name"><br>
<input type="text" name="department" placeholder="Department"><br>
<input type="text" name="designation" placeholder="Designation"><br>
<input type="number" name="salary" placeholder="Salary"><br>
<input type="date" name="joining_date"><br>

<button type="submit">Add Employee</button>

</form>

<br>
<a href="/employees">View Employees</a>

</body>
</html>
`);

});


// ADD EMPLOYEE
app.post("/addEmployee", async (req, res) => {

const emp = {
name: req.body.name,
department: req.body.department,
designation: req.body.designation,
salary: req.body.salary,
joining_date: req.body.joining_date
};

await collection.insertOne(emp);
res.redirect("/employees");

});


// VIEW EMPLOYEES
app.get("/employees", async (req, res) => {

const employees = await collection.find().toArray();

let html = `
<html>
<head>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Employee List</h2>

<table>

<tr>
<th>Name</th>
<th>Department</th>
<th>Designation</th>
<th>Salary</th>
<th>Joining Date</th>
<th>Action</th>
</tr>
`;

employees.forEach(e => {

html += `
<tr>
<td>${e.name}</td>
<td>${e.department}</td>
<td>${e.designation}</td>
<td>${e.salary}</td>
<td>${e.joining_date}</td>

<td>
<a href="/edit/${e._id}">Update</a>
<a href="/delete/${e._id}">Delete</a>
</td>
</tr>
`;

});

html += `
</table>

<br>
<a href="/">Add New Employee</a>

</body>
</html>
`;

res.send(html);

});


// DELETE EMPLOYEE
app.get("/delete/:id", async (req, res) => {

await collection.deleteOne({ _id: new ObjectId(req.params.id) });
res.redirect("/employees");

});


// UPDATE FORM
app.get("/edit/:id", async (req, res) => {

const emp = await collection.findOne({ _id: new ObjectId(req.params.id) });

res.send(`
<html>
<head>
<link rel="stylesheet" href="/style.css">
</head>

<body>

<h2>Update Employee</h2>

<form action="/update/${emp._id}" method="POST">

<input type="text" name="name" value="${emp.name}"><br>
<input type="text" name="department" value="${emp.department}"><br>
<input type="text" name="designation" value="${emp.designation}"><br>
<input type="number" name="salary" value="${emp.salary}"><br>
<input type="date" name="joining_date" value="${emp.joining_date}"><br>

<button type="submit">Update</button>

</form>

</body>
</html>
`);

});


// UPDATE EMPLOYEE
app.post("/update/:id", async (req, res) => {

await collection.updateOne(
{ _id: new ObjectId(req.params.id) },
{
$set:{
name:req.body.name,
department:req.body.department,
designation:req.body.designation,
salary:req.body.salary,
joining_date:req.body.joining_date
}
}
);

res.redirect("/employees");

});


// SERVER
app.listen(3000, () => {
console.log("Server running on http://localhost:3000");
});