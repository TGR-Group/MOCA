document.addEventListener('DOMContentLoaded', async () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    const response = await fetchWithAuth('https://api.project-moca.com/get_lostproperty');
    const properties = await response.json();
    const propertySelect = document.getElementById('propertySelect');

    properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.id;
        option.textContent = property.lostproperty_name;
        propertySelect.appendChild(option);
    });
});

async function addLostProperty() {
    const lostpropertyName = document.getElementById('lostpropertyInput').value;
    const staffId = sessionStorage.getItem('staffId');

    const response = await fetchWithAuth('https://api.project-moca.com/add_lostproperty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lostproperty_name: lostpropertyName, staffId }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}

async function updateStatus() {
    const propertySelect = document.getElementById('propertySelect');
    const propertyId = propertySelect.value;
    const status = document.getElementById('statusInput').checked;
    const staffId = sessionStorage.getItem('staffId');

    const response = await fetchWithAuth(`https://api.project-moca.com/update_lostproperty/${propertyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status, staffId }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}

async function fetchWithAuth(url, options = {}) {
    const token = sessionStorage.getItem('authToken');
    if (!token) {
        throw new Error('未認証');
    }

    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };

    return fetch(url, { ...options, headers });
}
