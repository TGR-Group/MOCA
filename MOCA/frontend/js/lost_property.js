document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('authToken')) {
        window.location.href = 'login.html';
        return;
    }
  
    fetchLostProperties();
  
    document.getElementById('addLostPropertyButton').addEventListener('click', addLostProperty);
    document.getElementById('updateStatusButton').addEventListener('click', updateStatus);
});
  
async function fetchWithAuth(url, options = {}) {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
        throw new Error('No auth token found');
    }
  
    options.headers = {
        ...options.headers,
        'Authorization': `Basic ${authToken}`,
        'Content-Type': 'application/json',
    };
  
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
  
async function addLostProperty() {
    const lostPropertyName = document.getElementById('lostpropertyInput').value;
    if (!lostPropertyName) {
        alert('落とし物の名前を入力してください');
        return;
    }
  
    try {
        await fetchWithAuth('https://staff-api.project-moca.com/add_lostproperty', {
            method: 'POST',
            body: JSON.stringify({ lostproperty_name: lostPropertyName }),
        });
        alert('落とし物を登録しました');
        fetchLostProperties(); // 更新後に再度取得
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}
  
async function fetchLostProperties() {
    try {
        const properties = await fetchWithAuth('https://staff-api.project-moca.com/get_lostproperty');
        const propertySelect = document.getElementById('propertySelect');
        propertySelect.innerHTML = ''; // 既存のオプションをクリア
  
        properties.forEach(property => {
            const option = document.createElement('option');
            option.value = property.id;
            option.textContent = property.lostPropertyName;
            propertySelect.appendChild(option);
        });
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}
  
async function updateStatus() {
    const propertyId = document.getElementById('propertySelect').value;
    const status = document.getElementById('statusInput').checked;
  
    try {
        await fetchWithAuth(`https://staff-api.project-moca.com/update_lostproperty/${propertyId}`, {
            method: 'POST',
            body: JSON.stringify({ status }),
        });
        alert('ステータスを更新しました');
    } catch (error) {
        console.error('エラーが発生しました:', error);
    }
}
