const DB_URL = 'http://api.project-moca.com';
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

document.addEventListener('DOMContentLoaded', async () => {
    if (!isLoggedIn()) {
        window.location.href = 'login.html'; // ログインページへのリダイレクト
        return;
    }

    try {
        const response = await fetchWithAuth('/staff/program');
        const result = response.data;

        if (result.success) {
            const program = result.programs[0]; // 最初のプログラムを使用
            loadUserStatus(program.id);

            // ID入力フォームの送信イベントを処理
            const manualEntryForm = document.getElementById('manualEntryForm');
            manualEntryForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const userIdInput = document.getElementById('userIdInput').value;

                try {
                    await updateUserStatus(program.id, userIdInput, 'in');
                } catch (error) {
                    alert('エラー: ' + error.message);
                }
            });
        } else {
            console.error('プログラムの取得に失敗しました:', result.error);
        }
    } catch (error) {
        console.error('出し物情報の取得に失敗しました:', error);
    }
});

async function loadUserStatus(programId) {
    try {
        const response = await fetchWithAuth(`/programs/${programId}/users`);
        const users = response.data;

        const waitingUsersSection = document.getElementById('waitingUsers').getElementsByTagName('tbody')[0];
        const inUsersSection = document.getElementById('inUsers').getElementsByTagName('tbody')[0];
        const exitedUsersSection = document.getElementById('exitedUsers').getElementsByTagName('tbody')[0];

        waitingUsersSection.innerHTML = '';
        inUsersSection.innerHTML = '';
        exitedUsersSection.innerHTML = '';

        users.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // 並び順を作成日時でソート

        users.forEach((user, index) => {
            addUserToSection(user, programId, index + 1);
        });
    } catch (error) {
        console.error('ユーザーステータスの取得に失敗しました:', error);
    }
}

function addUserToSection(user, programId, order) {
    const sectionMap = {
        'wait': 'waitingUsers',
        'in': 'inUsers',
        'exited': 'exitedUsers'
    };

    const sectionId = sectionMap[user.status] || 'unknownUsers';
    const section = document.getElementById(sectionId).getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    row.insertCell(0).textContent = order;
    row.insertCell(1).textContent = user.id;
    row.insertCell(2).textContent = user.status || '不明';

    const actionCell = row.insertCell(3);

    if (user.status === 'wait') {
        const enterButton = document.createElement('button');
        enterButton.textContent = '入場中に設定';
        enterButton.onclick = () => updateUserStatus(programId, user.id, 'in');
        actionCell.appendChild(enterButton);

        const exitButton = document.createElement('button');
        exitButton.textContent = '退場済に設定';
        exitButton.onclick = () => updateUserStatus(programId, user.id, 'exited');
        actionCell.appendChild(exitButton);
    } else if (user.status === 'in') {
        const exitButton = document.createElement('button');
        exitButton.textContent = '退場済に設定';
        exitButton.onclick = () => updateUserStatus(programId, user.id, 'exited');
        actionCell.appendChild(exitButton);
    }

    section.appendChild(row);
}

async function updateUserStatus(programId, userId, newStatus) {
    try {
        const staffId = localStorage.getItem('staffId');
        const updateResponse = await fetchWithAuth(`/programs/${programId}/users/${userId}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: { status: newStatus, staffId }
        });

        if (updateResponse.status !== 200) {
            const result = updateResponse.data;
            throw new Error('ステータスの更新に失敗しました: ' + result.error);
        }

        alert('ステータスが更新されました');
        loadUserStatus(programId);
    } catch (error) {
        alert('エラー: ' + error.message);
    }
}

function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}

async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('authToken');
    if (!token) {
        throw new Error('未認証');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    return axios({ url, ...options, headers });
}
