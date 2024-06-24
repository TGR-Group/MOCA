document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('https://staff-api.project-moca.com/get_lostproperty');
    const properties = await response.json();
    const tableBody = document.getElementById('lostPropertyTable').getElementsByTagName('tbody')[0];

    properties.forEach(property => {
        const row = document.createElement('tr');
        row.insertCell(0).textContent = property.lostproperty_name;
        row.insertCell(1).textContent = property.status ? '受け取り済み' : '未受け取り';
        tableBody.appendChild(row);
    });
});
