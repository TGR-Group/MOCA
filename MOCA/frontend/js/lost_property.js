document.addEventListener('DOMContentLoaded', () => {
    const addLostPropertyButton = document.querySelector('button[onclick="addLostProperty()"]');
    const updateStatusButton = document.querySelector('button[onclick="updateStatus()"]');

    if (addLostPropertyButton) {
        addLostPropertyButton.addEventListener('click', addLostProperty);
    }

    if (updateStatusButton) {
        updateStatusButton.addEventListener('click', updateStatus);
    }

    if (!isLoggedIn()) {
        redirectToLogin();
    } else {
        fetchLostProperties();
    }
});

function isLoggedIn() {
    return localStorage.getItem('username') && localStorage.getItem('password');
}

function redirectToLogin() {
    window.location.href = 'login.html';
}

function getAuthCredentials() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return { username, password };
}

async function fetchWithAuth(url, options = {}) {
    const { username, password } = getAuthCredentials();
    if (!username || !password) {
        redirectToLogin();
        throw new Error('未認証');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Basic ${btoa(`${username}:${password}`)}`
    };

    return fetch(url, { ...options, headers });
}

async function addLostProperty() {
    const lostPropertyName = document.getElementById('lostpropertyInput').value;

    if (!lostPropertyName) {
        alert('落とし物の名前を入力してください。');
        return;
    }

    try {
        const response = await fetchWithAuth('https://staff-api.project-moca.com/add_lostproperty', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lostproperty_name: lostPropertyName })
        });

        if (response.ok) {
            alert('落とし物が正常に登録されました。');
            fetchLostProperties(); // 登録後にリストを更新
        } else {
            alert('登録に失敗しました。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラーが発生しました。');
    }
}

async function fetchLostProperties() {
    try {
        const response = await fetchWithAuth('https://staff-api.project-moca.com/get_lostproperty');

        if (response.ok) {
            const properties = await response.json();
            const propertySelect = document.getElementById('propertySelect');
            propertySelect.innerHTML = '';

            properties.forEach(property => {
                const option = document.createElement('option');
                option.value = property.id;
                option.textContent = property.lostPropertyName;
                propertySelect.appendChild(option);
            });
        } else {
            alert('落とし物の取得に失敗しました。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラーが発生しました。');
    }
}

async function updateStatus() {
    const propertyId = document.getElementById('propertySelect').value;
    const status = document.getElementById('statusInput').checked;

    if (!propertyId) {
        alert('更新する落とし物を選択してください。');
        return;
    }

    try {
        const response = await fetchWithAuth(`https://staff-api.project-moca.com/update_lostproperty/${propertyId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });

        if (response.ok) {
            alert('落とし物のステータスが更新されました。');
            fetchLostProperties(); // 更新後にリストを更新
        } else {
            alert('ステータスの更新に失敗しました。');
        }
    } catch (error) {
        console.error('エラーが発生しました:', error);
        alert('エラーが発生しました。');
    }
}
