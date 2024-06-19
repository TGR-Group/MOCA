document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:5001/get_lostproperty');
    const properties = await response.json();
    const propertySelect = document.getElementById('propertySelect');

    properties.forEach(property => {
        const option = document.createElement('option');
        option.value = property.id;
        option.textContent = property.lostproperty_name;
        propertySelect.appendChild(option);
    });
});

async function updateStatus() {
    const propertySelect = document.getElementById('propertySelect');
    const propertyId = propertySelect.value;
    const status = document.getElementById('statusInput').checked;

    const response = await fetch(`http://localhost:5001/update_lostproperty/${propertyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    alert(result.message);
}
