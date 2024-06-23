document.addEventListener('DOMContentLoaded', () => {
    const fetchStoreData = async () => {
        const response = await fetch('http://localhost:5001/get_stores');
        const stores = await response.json();
        const storeSelect = document.getElementById('storeSelect');
        stores.forEach(store => {
            const option = document.createElement('option');
            option.value = store.id;
            option.textContent = store.name;
            storeSelect.appendChild(option);
        });
    };

    fetchStoreData();
});

async function writeToSpreadsheet() {
    const storename = document.getElementById('storenameInput').value;
    const response = await fetch('http://localhost:5001/add_store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: storename }),
    });

    if (!response.ok) {
        const message = `エラーが発生しました: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}

async function submitStatus() {
    const storeSelect = document.getElementById('storeSelect');
    const storeId = storeSelect.value;
    const status = document.querySelector('input[name="status"]:checked').value;
    const response = await fetch(`http://localhost:5001/update_stock_status/${storeId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const message = `エラーが発生しました: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}
