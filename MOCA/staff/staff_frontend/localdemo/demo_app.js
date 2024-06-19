// app.js

// DOMが完全に読み込まれたら実行
document.addEventListener('DOMContentLoaded', async () => {
    if (document.getElementById('storeSelect')) await fetchStores();
    if (document.getElementById('propertySelect')) await fetchLostProperties();
    if (document.getElementById('waitingTable')) await fetchUserQueues();
});

// ストアを取得してセレクトボックスに追加
async function fetchStores() {
    const response = await fetch('http://localhost:5000/get_stores');
    const stores = await response.json();
    const storeSelect = document.getElementById('storeSelect');

    stores.forEach(store => {
        const option = document.createElement('option');
        option.value = store.id;
        option.textContent = store.store_name;
        storeSelect.appendChild(option);
    });
}

// 迷子の物品を取得してセレクトボックスに追加
async function fetchLostProperties() {
    const response = await fetch('http://localhost:5000/get_lostproperty');
    const properties = await response.json();
    const propertySelect = document.getElementById('propertySelect');

    properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.id;
        option.textContent = property.lostproperty_name;
        propertySelect.appendChild(option);
    });
}

// ユーザーキューを取得してテーブルに追加
async function fetchUserQueues() {
    const response = await fetch('/api/queues');
    const queues = await response.json();

    const waitingTableBody = document.getElementById('waitingTable').getElementsByTagName('tbody')[0];
    const calledTableBody = document.getElementById('calledTable').getElementsByTagName('tbody')[0];
    const inTableBody = document.getElementById('inTable').getElementsByTagName('tbody')[0];

    queues.forEach(queue => {
        const row = document.createElement('tr');
        if (queue.status === 'wait' || queue.status === 'called') {
            row.insertCell(0).textContent = queue.call_order;
            row.insertCell(1).textContent = formatUserId(queue.user_id);
        } else {
            row.insertCell(0).textContent = formatUserId(queue.user_id);
        }

        if (queue.status === 'wait') {
            const actionCell = row.insertCell(2);
            const callButton = document.createElement('button');
            callButton.textContent = '呼び出し済みに変更';
            callButton.onclick = () => updateStatus(queue.user_id, 'called');
            actionCell.appendChild(callButton);

            const inButton = document.createElement('button');
            inButton.textContent = '入場中に変更';
            inButton.onclick = () => updateStatus(queue.user_id, 'in');
            actionCell.appendChild(inButton);
            
            waitingTableBody.appendChild(row);
        } else if (queue.status === 'called') {
            const actionCell = row.insertCell(2);
            const inButton = document.createElement('button');
            inButton.textContent = '入場中に変更';
            inButton.onclick = () => updateStatus(queue.user_id, 'in');
            actionCell.appendChild(inButton);
            calledTableBody.appendChild(row);
        } else if (queue.status === 'in') {
            const actionCell = row.insertCell(1);
            const exitButton = document.createElement('button');
            exitButton.textContent = '退出';
            exitButton.onclick = () => updateStatus(queue.user_id, 'exited');
            actionCell.appendChild(exitButton);
            inTableBody.appendChild(row);
        }
    });

    sortTable(waitingTableBody);
    sortTable(calledTableBody);
}

// ストアの追加
async function addStore() {
    const name = document.getElementById('storenameInput').value;
    const storeName = document.getElementById('storenameInput').value;

    const response = await fetch('http://localhost:5000/add_store', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, store_name: storeName }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    console.log(result.message);
    alert(result.message);
}

// 迷子の物品の追加
async function addLostProperty() {
    const lostpropertyName = document.getElementById('lostpropertyInput').value;

    const response = await fetch('http://localhost:5000/add_lostproperty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lostproperty_name: lostpropertyName }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}

// 迷子の物品のステータスを更新
async function updateLostPropertyStatus() {
    const propertySelect = document.getElementById('propertySelect');
    const propertyId = propertySelect.value;
    const status = document.getElementById('statusInput').checked;

    const response = await fetch(`http://localhost:5000/update_lostproperty/${propertyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}

// ストアの在庫状況を更新
async function submitStoreStatus() {
    const storeSelect = document.getElementById('storeSelect');
    const storeId = storeSelect.value;
    const statusElements = document.getElementsByName('status');
    let stockStatus;

    for (const element of statusElements) {
        if (element.checked) {
            stockStatus = element.value;
            break;
        }
    }

    if (!storeId || !stockStatus) {
        alert('店名と在庫状況を選択してください');
        return;
    }

    const response = await fetch('http://localhost:5000/update_store_evaluation/' + storeId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ evaluation: stockStatus }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    console.log(result.message);
    alert(result.message);
}

// ユーザーIDをフォーマット
function formatUserId(userId) {
    return userId.toString().padStart(5, '0');
}

// キューのステータスを更新
async function updateStatus(userId, newStatus) {
    try {
        const response = await fetch(`/staff/update_status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, newStatus })
        });

        if (!response.ok) {
            const result = await response.json();
            throw new Error('ステータスの更新に失敗しました: ' + result.error);
        }

        alert('ステータスが更新されました');
        location.reload(); 
    } catch (error) {
        alert(error.message);
    }
}

// テーブルをソート
function sortTable(tbody) {
    Array.from(tbody.getElementsByTagName('tr'))
        .sort((a, b) => a.cells[0].textContent - b.cells[0].textContent)
        .forEach(row => tbody.appendChild(row));
}
