const DB_URL = 'http://api.project-moca.com';
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

document.addEventListener('DOMContentLoaded', async () => {
    await ensureAuth();
    await loadStores();

    let loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            let name = document.getElementById('staffId').value;
            let pass = document.getElementById('staffPass').value;
            staffAuth(name, pass);
        });
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

async function loadStores() {
    try {
        const response = await axios.get('/staff/stores');
        const stores = response.data;
        const storeSelect = document.getElementById('storeSelect');
        stores.forEach(store => {
            const option = document.createElement('option');
            option.value = store.id;
            option.textContent = store.name;
            storeSelect.appendChild(option);
        });
    } catch (error) {
        console.error('店舗情報の取得に失敗しました', error);
    }
}

async function writeToSpreadsheet() {
    const storename = document.getElementById('storenameInput').value;
    if (!storename) {
        alert('店舗名を入力してください');
        return;
    }

    try {
        const response = await axios.post('/staff/update_item_name', {
            itemName: storename
        });
        alert(response.data.message);
        location.reload();
    } catch (error) {
        alert('item_nameの更新に失敗しました');
    }
}

async function submitStatus() {
    const storeSelect = document.getElementById('storeSelect');
    const itemName = storeSelect.value;
    const status = document.querySelector('input[name="status"]:checked').value;
    
    if (!itemName || !status) {
        alert('すべてのフィールドを入力してください');
        return;
    }

    let quantity;
    if (status === '◎') {
        quantity = 100;
    } else if (status === '△') {
        quantity = 50;
    } else if (status === '✕') {
        quantity = 0;
    }

    try {
        const response = await axios.post(`/staff/update_stock/${itemName}`, {
            quantity
        });
        alert(response.data.message);
    } catch (error) {
        alert('在庫情報の更新に失敗しました');
    }
}

async function staffAuth(name, pass) {
    try {
        const response = await axios.post('/staff/auth', {
            auth: {
                username: name,
                password: pass
            },
        });
        if (response.status === 200) {
            localStorage.setItem('staffId', name);
            localStorage.setItem('staffPass', pass);
            window.location.href = 'index.html';
        }
    } catch (error) {
        alert('ログインに失敗しました');
    }
}
