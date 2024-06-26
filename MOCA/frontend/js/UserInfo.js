document.addEventListener('DOMContentLoaded', async () => {
    if (!isLoggedIn()) {
        window.location.href = '/login.html'; // ログインページへのリダイレクト
        return;
    }

    try {
        const storeResponse = await fetchWithAuth('https://staff-api.project-moca.com/stores');
        const stores = await storeResponse.json();
        const storeSelect = document.getElementById('storeSelect');

        stores.forEach(store => {
            const option = document.createElement('option');
            option.value = store.id;
            option.textContent = store.name;
            storeSelect.appendChild(option);
        });

        storeSelect.addEventListener('change', loadUserStatus);

        if (stores.length > 0) {
            storeSelect.value = stores[0].id;
            loadUserStatus();
        }

    } catch (error) {
        console.error('Error fetching stores:', error);
    }
});

async function loadUserStatus() {
    try {
        const storeId = document.getElementById('storeSelect').value;
        const response = await fetchWithAuth(`https://staff-api.project-moca.com/stores/${storeId}/users`);
        const users = await response.json();

        const userStatusTableBody = document.getElementById('userStatusTable').getElementsByTagName('tbody')[0];
        userStatusTableBody.innerHTML = '';

        users.forEach((user, index) => {
            const row = document.createElement('tr');
            row.insertCell(0).textContent = index + 1;
            row.insertCell(1).textContent = user.id;
            const statusCell = row.insertCell(2);
            statusCell.textContent = user.status || '不明';

            const actionCell = row.insertCell(3);
            const statusSelect = document.createElement('select');
            ['active', 'inactive', 'banned'].forEach(status => {
                const option = document.createElement('option');
                option.value = status;
                option.text = status;
                if (user.status === status) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });

            const updateButton = document.createElement('button');
            updateButton.textContent = '更新';
            updateButton.onclick = async () => {
                const newStatus = statusSelect.value;
                try {
                    const staffId = sessionStorage.getItem('staffId');
                    const updateResponse = await fetchWithAuth(`https://staff-api.project-moca.com/stores/${storeId}/users/${user.id}/status`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ status: newStatus, staffId })
                    });

                    if (!updateResponse.ok) {
                        const result = await updateResponse.json();
                        throw new Error('ステータスの更新に失敗しました: ' + result.error);
                    }

                    alert('ステータスが更新されました');
                    statusCell.textContent = newStatus;
                } catch (error) {
                    alert(error.message);
                }
            };

            actionCell.appendChild(statusSelect);
            actionCell.appendChild(updateButton);

            userStatusTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user status:', error);
    }
}

function isLoggedIn() {
    return sessionStorage.getItem('authToken') !== null;
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
