document.addEventListener('DOMContentLoaded', async () => {
    const sampleQueues = [
        { user_id: 10001, status: 'wait', wait_time: 300 },
        { user_id: 10002, status: 'called', wait_time: 600 },
        { user_id: 10003, status: 'wait', wait_time: 120 },
        { user_id: 10004, status: 'called', wait_time: 1800 },
        { user_id: 10005, status: 'in', wait_time: 2400 }
    ];

    const waitingTableBody = document.getElementById('waitingTable').getElementsByTagName('tbody')[0];
    const calledTableBody = document.getElementById('calledTable').getElementsByTagName('tbody')[0];
    const inTableBody = document.getElementById('inTable').getElementsByTagName('tbody')[0];

    sampleQueues.forEach(queue => {
        const row = document.createElement('tr');
        row.insertCell(0).textContent = formatUserId(queue.user_id);
        row.insertCell(1).textContent = formatWaitTime(queue.wait_time);

        if (queue.status === 'wait') {
            const actionCell = row.insertCell(2);
            actionCell.classList.add('action-cell'); 
            const callButton = document.createElement('button');
            callButton.textContent = '呼び出し済み';
            callButton.onclick = () => updateStatus(queue.user_id, 'called');
            actionCell.appendChild(callButton);

            const inButton = document.createElement('button');
            inButton.textContent = '入場';
            inButton.onclick = () => updateStatus(queue.user_id, 'in');
            actionCell.appendChild(inButton);

            waitingTableBody.appendChild(row);
        } else if (queue.status === 'called') {
            const actionCell = row.insertCell(2);
            const inButton = document.createElement('button');
            inButton.textContent = '入場';
            inButton.onclick = () => updateStatus(queue.user_id, 'in');
            actionCell.appendChild(inButton);
            calledTableBody.appendChild(row);
        } else if (queue.status === 'in') {
            const actionCell = row.insertCell(2);
            const exitButton = document.createElement('button');
            exitButton.textContent = '退出';
            exitButton.onclick = () => updateStatus(queue.user_id, 'exited');
            actionCell.appendChild(exitButton);
            inTableBody.appendChild(row);
        }
    });
});

function formatUserId(userId) {
    return userId.toString().padStart(5, '0');
}

function formatWaitTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
}

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
        location.reload(); // ページを再読み込みして最新のデータを表示
    } catch (error) {
        alert(error.message);
    }
}
