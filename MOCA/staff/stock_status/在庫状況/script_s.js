document.addEventListener('DOMContentLoaded', (event) => {
    fetchStores();
  });
  
  async function fetchStores() {
    const response = await fetch('http://localhost:5000/get_stores');
    const stores = await response.json();
    const storeSelect = document.getElementById('storeSelect');
  
    stores.forEach(store => {
        const option = document.createElement('option');
        option.value = store.id;
        option.textContent = store.store_name;
        storeSelect.appendChild(option);
    });
  }
  
  async function submitStatus() {
    const storeSelect = document.getElementById('storeSelect');
    const storeId = storeSelect.value;
    const statusElements = document.getElementsByName('status');
    let stockStatus;
  
    for (const element of statusElements) {
        if (element.checked) {
            stockStatus = element.value;
            break;
        }
    }
  
    if (!storeId || !stockStatus) {
        alert('店名と混雑状況を選択してください');
        return;
    }
  
    const response = await fetch('http://localhost:5000/update_store_evaluation/' + storeId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ evaluation: stockStatus }),
    });
  
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }
  
    const result = await response.json();
    console.log(result.message);
    alert(result.message);
  }
  