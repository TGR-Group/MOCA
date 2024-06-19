document.addEventListener('DOMContentLoaded', async () => {
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
});

function formatUserId(userId) {
    return userId.toString().padStart(5, '0');
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
        location.reload(); 
    } catch (error) {
        alert(error.message);
    }
}

function sortTable(tbody) {
    Array.from(tbody.getElementsByTagName('tr'))
        .sort((a, b) => a.cells[0].textContent - b.cells[0].textContent)
        .forEach(row => tbody.appendChild(row));
}
