const DB_URL = 'http://api.project-moca.com';
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

document.addEventListener('DOMContentLoaded', async () => {
    await ensureAuth();
    await loadProgram();

    const manualEntryForm = document.getElementById('manualEntryForm');
    if (manualEntryForm) {
        manualEntryForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const userIdInput = document.getElementById('userIdInput').value;
            try {
                const programId = localStorage.getItem('programId');
                await updateUserStatus(programId, userIdInput, 'enter');
            } catch (error) {
                alert('エラー: ' + error.message);
            }
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
        const response = await axios.get('/staff/auth', {
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

async function loadProgram() {
    try {
        const response = await fetchWithAuth('/staff/program');
        const result = response.data;

        if (result.success) {
            const program = result.programs[0]; // 最初のプログラムを使用
            localStorage.setItem('programId', program.id);
            loadUserStatus(program.id);
        } else {
            console.error('プログラムの取得に失敗しました:', result.error);
        }
    } catch (error) {
        console.error('出し物情報の取得に失敗しました:', error);
    }
}

async function loadUserStatus(programId) {
    try {
        const waitingResponse = await fetchWithAuth(`/staff/wait/${programId}`);
        const calledResponse = await fetchWithAuth(`/staff/called/${programId}`);

        const waitingUsers = waitingResponse.data;
        const calledUsers = calledResponse.data;

        const waitingUsersSection = document.getElementById('waitingUsers').getElementsByTagName('tbody')[0];
        const inUsersSection = document.getElementById('inUsers').getElementsByTagName('tbody')[0];
        const exitedUsersSection = document.getElementById('exitedUsers').getElementsByTagName('tbody')[0];

        waitingUsersSection.innerHTML = '';
        inUsersSection.innerHTML = '';
        exitedUsersSection.innerHTML = '';

        const allUsers = [...waitingUsers, ...calledUsers];
        allUsers.sort((a, b) => new Date(a.waitedAt) - new Date(b.waitedAt)); // 並び順を作成日時でソート

        allUsers.forEach((user, index) => {
            addUserToSection(user, programId, index + 1);
        });
    } catch (error) {
        console.error('ユーザーステータスの取得に失敗しました:', error);
    }
}

function addUserToSection(user, programId, order) {
    const sectionMap = {
        'wait': 'waitingUsers',
        'called': 'waitingUsers', // 呼び出し済みのユーザーも待機中に表示
        'in': 'inUsers',
        'exited': 'exitedUsers'
    };

    const sectionId = sectionMap[user.status] || 'unknownUsers';
    const section = document.getElementById(sectionId).getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    row.insertCell(0).textContent = order;
    row.insertCell(1).textContent = user.userId;
    row.insertCell(2).textContent = user.status || '不明';

    const actionCell = row.insertCell(3);

    if (user.status === 'wait' || user.status === 'called') {
        const callButton = document.createElement('button');
        callButton.textContent = '呼ぶ';
        callButton.onclick = () => updateUserStatus(programId, user.userId, 'call');
        actionCell.appendChild(callButton);

        const enterButton = document.createElement('button');
        enterButton.textContent = '入場中に設定';
        enterButton.onclick = () => updateUserStatus(programId, user.userId, 'enter');
        actionCell.appendChild(enterButton);
    } else if (user.status === 'in') {
        const exitButton = document.createElement('button');
        exitButton.textContent = '退場済に設定';
        exitButton.onclick = () => updateUserStatus(programId, user.userId, 'quit');
        actionCell.appendChild(exitButton);
    }

    section.appendChild(row);
}

async function updateUserStatus(programId, userId, action) {
    try {
        let url = '';
        let data = { userId };

        if (action === 'call') {
            url = `/staff/call/${programId}`;
        } else if (action === 'enter') {
            url = `/staff/enter/${programId}`;
        } else if (action === 'quit') {
            url = `/staff/quit/${programId}`;
        }

        const response = await fetchWithAuth(url, {
            method: 'POST',
            data
        });

        if (response.status !== 200) {
            throw new Error(`${action}の処理に失敗しました`);
        }

        alert(`${action}の処理が成功しました`);
        loadUserStatus(programId);
    } catch (error) {
        alert('エラー: ' + error.message);
    }
}

async function fetchWithAuth(url, options = {}) {
    const staffId = localStorage.getItem('staffId');
    const staffPass = localStorage.getItem('staffPass');
    if (!staffId || !staffPass) {
        throw new Error('未認証');
    }

    const authHeader = 'Basic ' + btoa(`${staffId}:${staffPass}`);
    const headers = {
        ...options.headers,
        'Authorization': authHeader
    };

    return axios({ url, ...options, headers });
}
