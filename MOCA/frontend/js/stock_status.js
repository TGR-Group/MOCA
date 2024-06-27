document.addEventListener('DOMContentLoaded', () => {
    const fetchStoreData = async () => {
        try {
            const response = await fetchWithAuth('https://api.project-moca.com/get_stores');
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const stores = await response.json();
            const storeSelect = document.getElementById('storeSelect');
            storeSelect.innerHTML = ''; 
            
            stores.forEach(store => {
                const option = document.createElement('option');
                option.value = store.id;
                option.textContent = store.store_name;
                storeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to fetch stores:', error);
        }
    };

    fetchStoreData();
});

async function writeToSpreadsheet() {
    try {
        const storename = document.getElementById('storenameInput').value;
        const staffId = sessionStorage.getItem('staffId');
        const response = await fetchWithAuth('https://api.project-moca.com/add_store', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ store_name: storename, staffId }),
        });

        if (!response.ok) {
            const message = `エラーが発生しました: ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

async function submitStatus() {
    try {
        const storeSelect = document.getElementById('storeSelect');
        const storeId = storeSelect.value;
        const status = document.querySelector('input[name="status"]:checked').value;
        const staffId = sessionStorage.getItem('staffId');
        const response = await fetchWithAuth(`https://api.project-moca.com/update_store_evaluation/${storeId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ evaluation: status, staffId }),
        });

        if (!response.ok) {
            const message = `エラーが発生しました: ${response.status}`;
            throw new Error(message);
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}

async function fetchWithAuth(url, options = {}) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        throw new Error('未認証');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    return fetch(url, { ...options, headers });
}
