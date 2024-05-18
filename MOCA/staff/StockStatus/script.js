function checkboxClicked() {

    var checkboxes = document.querySelectorAll('input[type="checkbox"][name="year"]');
    checkboxes.forEach(function(cb) {
        if (cb.checked) {
            cb.checked = false;
        }
    });
    event.target.checked = true; 
}

document.querySelector('button').addEventListener('click', async () => {
    const name = document.getElementById('nameInput').value;
    
    const response = await fetch('/add_class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
  
    const result = await response.json();
    console.log(result.message);
  });

  document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:5000/get_store_names');
    const storeNames = await response.json();
  
    const storeNamesContainer = document.getElementById('storeNamesContainer');
    storeNames.forEach(storeName => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `store_${storeName}`;
      checkbox.name = 'storeName';
      checkbox.value = storeName;
  
      const label = document.createElement('label');
      label.htmlFor = `store_${storeName}`;
      label.textContent = storeName;
  
      storeNamesContainer.appendChild(checkbox);
      storeNamesContainer.appendChild(label);
      storeNamesContainer.appendChild(document.createElement('br'));
    });
  });
  
  async function submitStockStatus() {
    const storeNames = Array.from(document.querySelectorAll('input[name="storeName"]:checked')).map(cb => cb.value);
    const name = document.getElementById('nameInput').value;
    const stockStatus = document.querySelector('input[name="stockStatus"]:checked').value;
  
    const response = await fetch('http://localhost:5000/add_class', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, store_name: storeNames.join(', '), stock_status: stockStatus }),
    });
  
    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }
  
    const result = await response.json();
    console.log(result.message);
  }
  