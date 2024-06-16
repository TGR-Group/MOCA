document.addEventListener('DOMContentLoaded', async () => {
    const programId = 'YOUR_PROGRAM_ID'; // 対象のプログラムIDを設定
    const waitingResponse = await fetch(`/staff/wait/${programId}`);
    const calledResponse = await fetch(`/staff/called/${programId}`);
    const waitingQueues = await waitingResponse.json();
    const calledQueues = await calledResponse.json();

    const waitingTableBody = document.getElementById('waitingTable').getElementsByTagName('tbody')[0];
    const calledTableBody = document.getElementById('calledTable').getElementsByTagName('tbody')[0];

    waitingQueues.forEach(queue => {
        const row = document.createElement('tr');
        row.insertCell(0).textContent = queue.userId;
        row.insertCell(1).textContent = queue.status;

        const actionCell = row.insertCell(2);
        const callButton = document.createElement('button');
        callButton.textContent = '呼び出し済みに変更';
        callButton.onclick = () => updateStatus(queue.userId, 'called', programId);
        actionCell.appendChild(callButton);
        waitingTableBody.appendChild(row);
    });

    calledQueues.forEach(queue => {
        const row = document.createElement('tr');
        row.insertCell(0).textContent = queue.userId;
        row.insertCell(1).textContent = queue.status;

        const actionCell = row.insertCell(2);
        const enterButton = document.createElement('button');
        enterButton.textContent = '入場済みに変更';
        enterButton.onclick = () => updateStatus(queue.userId, 'in', programId);
        actionCell.appendChild(enterButton);
        calledTableBody.appendChild(row);
    });
});

async function updateStatus(userId, newStatus, programId) {
    try {
        const response = await fetch(`/staff/${newStatus}/${programId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId })
        });

        if (response.ok) {
            alert('ステータスが更新されました');
            location.reload(); // ページを再読み込みして最新のデータを表示
        } else {
            const result = await response.json();
            throw new Error('ステータスの更新に失敗しました: ' + result.error);
        }
    } catch (error) {
        alert(error.message);
    }
}
