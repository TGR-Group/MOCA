document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:5000/get_classes');
    const classes = await response.json();
  
    const tableBody = document.querySelector('#classesTable tbody');
    classes.forEach(class_ => {
      const row = document.createElement('tr');
  
      const nameCell = document.createElement('td');
      nameCell.textContent = class_.name;
      row.appendChild(nameCell);
  
      const storeNameCell = document.createElement('td');
      storeNameCell.textContent = class_.store_name;
      row.appendChild(storeNameCell);
  
      const stockStatusCell = document.createElement('td');
      stockStatusCell.textContent = class_.stock_status;
      row.appendChild(stockStatusCell);
  
      tableBody.appendChild(row);
    });
  });
  