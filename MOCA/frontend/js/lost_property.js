const DB_URL = 'http://api.project-moca.com';
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

document.addEventListener('DOMContentLoaded', async () => {
    await ensureAuth();

    try {
        const response = await axios.get('/get_lostproperty');
        const properties = response.data;
        const tableBody = document.getElementById('lostPropertyTable').getElementsByTagName('tbody')[0];

        properties.forEach(property => {
            const row = document.createElement('tr');
            row.insertCell(0).textContent = property.lostproperty_name;
            row.insertCell(1).textContent = property.status ? '受け取り済み' : '未受け取り';
            tableBody.appendChild(row);
        });
    } catch (error) {
        alert('落とし物の取得に失敗しました');
    }
});

async function ensureAuth() {
    const staffId = localStorage.getItem('staffId');
    const staffPass = localStorage.getItem('staffPass');
    if (!staffId || !staffPass) {
        alert('ログインが必要です');
        window.location.href = 'login.html';
        return;
    }
    
    try {
        const response = await axios.post('/staff/auth', {
            auth: {
                username: staffId,
                password: staffPass
            },
        });
        if (response.status !== 200) {
            throw new Error('Unauthorized');
        }
    } catch (error) {
        alert('認証に失敗しました。再度ログインしてください。');
        localStorage.removeItem('staffId');
        localStorage.removeItem('staffPass');
        window.location.href = 'login.html';
    }
}

async function addLostProperty() {
    const lostpropertyName = document.getElementById('lostpropertyInput').value;
    if (!lostpropertyName) {
        alert('落とし物の名前を入力してください');
        return;
    }

    try {
        const response = await axios.post('/add_lostproperty', {
            lostproperty_name: lostpropertyName
        });
        alert(response.data.message);
        location.reload();
    } catch (error) {
        alert('落とし物の登録に失敗しました');
    }
}

async function updateStatus() {
    const propertySelect = document.getElementById('propertySelect');
    const statusInput = document.getElementById('statusInput');

    const propertyId = propertySelect.value;
    const status = statusInput.checked;

    try {
        const response = await axios.post(`/update_lostproperty/${propertyId}`, {
            status: status
        });
        alert(response.data.message);
        location.reload();
    } catch (error) {
        alert('ステータスの更新に失敗しました');
    }
}

function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}
