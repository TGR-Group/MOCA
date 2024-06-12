document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/queues');
        if (!response.ok) {
            throw new Error('データの取得に失敗しました');
        }

        const queues = await response.json();
        const waitingTableBody = document.getElementById('waitingTable').getElementsByTagName('tbody')[0];
        const calledTableBody = document.getElementById('calledTable').getElementsByTagName('tbody')[0];

        queues.forEach(queue => {
            const row = document.createElement('tr');
            row.insertCell(0).textContent = queue.user_id;
            row.insertCell(1).textContent = queue.status;
            row.insertCell(2).textContent = formatWaitTime(queue.wait_time);

            if (queue.status === 'wait') {
                const actionCell = row.insertCell(3);
                const callButton = document.createElement('button');
                callButton.textContent = '呼び出し済みに変更';
                callButton.onclick = () => updateStatus(queue.user_id, 'called');
                actionCell.appendChild(callButton);
                waitingTableBody.appendChild(row);
            } else if (queue.status === 'called') {
                calledTableBody.appendChild(row);
            }
        });
    } catch (error) {
        alert(error.message);
    }
});

function formatWaitTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}分${remainingSeconds}秒`;
}

async function updateStatus(userId, newStatus) {
    try {
        const response = await fetch(`/api/queues/${userId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
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
