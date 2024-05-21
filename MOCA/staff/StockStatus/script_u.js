document.addEventListener('DOMContentLoaded', () => {
  fetchClasses();
  setInterval(fetchClasses, 10000);  // 10秒ごとに更新
});

async function fetchClasses() {
  try {
      const response = await fetch('http://localhost:5000/get_classes');
      const classes = await response.json();
      const tableBody = document.querySelector('#classesTable tbody');
      tableBody.innerHTML = '';  // テーブルをクリア

      classes.forEach(class_ => {
          const row = document.createElement('tr');
          const storeNameCell = document.createElement('td');
          const stockStatusCell = document.createElement('td');

          storeNameCell.textContent = class_.store_name;
          stockStatusCell.textContent = class_.stock_status || '';  // 空文字列を設定してデフォルトで空白にする

          row.appendChild(storeNameCell);
          row.appendChild(stockStatusCell);
          tableBody.appendChild(row);
      });
  } catch (error) {
      console.error('Error fetching classes:', error);
  }
}
