document.addEventListener('DOMContentLoaded', () => {
    fetchStores();
    setInterval(fetchStores, 10000);  // 10秒ごとに更新
});

function fetchStores() {
    // サンプルデータ
    const stores = [
        { store_name: "3年B組", stock_status: "△　在庫少ない(?)" },
        { store_name: "1年5組", stock_status: "〇　在庫あり" },
        { store_name: "4年C組", stock_status: "✕　在庫なし" }
    ];

    const gridContainer = document.querySelector('.grid-container');
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
}
