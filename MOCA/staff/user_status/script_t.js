document.addEventListener('DOMContentLoaded', () => {
    fetchStores();
    setInterval(fetchStores, 10000);  // 10秒ごとに更新
});

async function fetchStores() {
    try {
        const response = await fetch('http://localhost:5000/get_stores');
        const stores = await response.json();
        const gridContainer = document.querySelector('grid-container');
        gridContainer.innerHTML = `
            <div class="grid-header">店名</div>
            <div class="grid-header">在庫状況</div>
        `;

        stores.forEach(store => {
            const storeNameDiv = document.createElement('div');
            storeNameDiv.textContent = store.store_name;
            storeNameDiv.classList.add('grid-item');

            const stockStatusDiv = document.createElement('div');
            stockStatusDiv.textContent = store.stock_status || '';
            stockStatusDiv.classList.add('grid-item');

            gridContainer.appendChild(storeNameDiv);
            gridContainer.appendChild(stockStatusDiv);
        });
    } catch (error) {
        console.error('Error fetching stores:', error);
    }
}
