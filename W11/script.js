let users = JSON.parse(localStorage.getItem("users")) || [];

/* REGISTER (AJAX POST simulation) */
function registerUser(event) {
  event.preventDefault();

  let user = {
   name: document.getElementById("name").value.trim(),
email: document.getElementById("email").value.trim(),
mobile: document.getElementById("mobile").value.trim(),
dob: document.getElementById("dob").value,
city: document.getElementById("city").value.trim(),
address: document.getElementById("address").value.trim(),
username: document.getElementById("username").value.trim(),
password: document.getElementById("password").value
  };

  // VALIDATION
  if (!user.name || !user.email || !user.mobile || !user.dob || !user.city || !user.address) {
    alert("All fields are required");
    return;
  }

  if (user.mobile.length !== 10) {
    alert("Invalid mobile number");
    return;
  }

  if (user.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  // AJAX POST SIMULATION
  fetch("/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registered Successfully");
  showLogin();
}

/* LOGIN */
function loginUser(event) {
  event.preventDefault();

  let u = loginUsername.value;
  let p = loginPassword.value;

  let found = users.find(x => x.username === u && x.password === p);

  if (found) {
    alert("Login Successful");
    window.location.href = "users.html";
  } else {
    alert("Invalid Credentials");
  }
}

/* LOAD USERS TABLE */
function loadUsers() {
  let table = document.getElementById("userTable");
  let users = JSON.parse(localStorage.getItem("users")) || [];

  table.innerHTML = "";

  users.forEach(u => {
    table.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.mobile}</td>
        <td>${u.dob}</td>
        <td>${u.city}</td>
        <td>${u.address}</td>
      </tr>
    `;
  });
}

/* SWITCH FORMS */
function showLogin() {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
}

function showRegister() {
  registerForm.style.display = "block";
  loginForm.style.display = "none";
}

/* AUTO LOAD */
if (document.getElementById("userTable")) {
  loadUsers();
}