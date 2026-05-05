fetch('/api/employees')
    .then(res => res.json())
    .then(employees => {
      const tbody = document.getElementById('empTable');
      employees.forEach(e => {
        tbody.innerHTML += `
          <tr>
            <td><img src="${e.image}" alt="${e.name}"></td>
            <td>${e.name}</td>
            <td>${e.designation}</td>
            <td>${e.department}</td>
            <td>₹${e.salary.toLocaleString()}</td>
          </tr>`;
      });
    });