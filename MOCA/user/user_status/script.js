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
            row.insertCell(1).textContent = formatWaitTime(queue.wait_time);

            if (queue.status === 'waiting') {
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
