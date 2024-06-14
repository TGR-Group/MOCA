document.addEventListener('DOMContentLoaded', () => {
    // サンプルデータ
    const sampleQueues = [
        { user_id: 1, status: 'wait', wait_time: 300 },
        { user_id: 2, status: 'called', wait_time: 600 },
        { user_id: 3, status: 'wait', wait_time: 120 },
        { user_id: 4, status: 'called', wait_time: 1800 },
        { user_id: 5, status: 'in', wait_time: 2400 }
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
            const callButton = document.createElement('button');
            callButton.textContent = '呼び出し済みに変更';
            callButton.onclick = () => mockUpdateStatus(queue.user_id, 'called');
            actionCell.appendChild(callButton);
            waitingTableBody.appendChild(row);
        } else if (queue.status === 'called') {
            const actionCell = row.insertCell(2);
            const inButton = document.createElement('button');
            inButton.textContent = '入場中に変更';
            inButton.onclick = () => mockUpdateStatus(queue.user_id, 'in');
            actionCell.appendChild(inButton);
            calledTableBody.appendChild(row);
        } else if (queue.status === 'in') {
            const actionCell = row.insertCell(2);
            const exitButton = document.createElement('button');
            exitButton.textContent = '退出に変更';
            exitButton.onclick = () => mockUpdateStatus(queue.user_id, 'exited');
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

function mockUpdateStatus(userId, newStatus) {
    // サンプルデータのステータス更新を模倣
    alert(`ユーザーID: ${formatUserId(userId)} のステータスを ${newStatus} に更新しました（サンプルデータの模倣）`);
    location.reload(); // ページを再読み込みしてサンプルデータを再表示
}
