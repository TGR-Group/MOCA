document.addEventListener('DOMContentLoaded', () => {
    // 店舗データを取得して選択ボックスに追加する関数
    const fetchStoreData = async () => {
        try {
            const response = await fetch('https://staff-api.project-moca.com/get_stores'); // APIエンドポイントを指定
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            
            const stores = await response.json();
            const storeSelect = document.getElementById('storeSelect');
            storeSelect.innerHTML = ''; // 既存のオプションをクリア
            
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
        const response = await fetch('https://staff-api.project-moca.com/add_store', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ store_name: storename }),
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
        const response = await fetch(`https://staff-api.project-moca.com/update_store_evaluation/${storeId}`, { // APIエンドポイントを指定
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
    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
}
