fetch('/api/users')
    .then(res => res.json())
    .then(users => {
      const tbody = document.getElementById('userTable');
      users.forEach((u, i) => {
        tbody.innerHTML += `
          <tr>
            <td>${i + 1}</td>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.city}</td>
            <td>${u.role}</td>
          </tr>`;
      });
    });