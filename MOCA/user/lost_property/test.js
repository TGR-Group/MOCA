async function addTestLostProperty(lostpropertyName) {
    const response = await fetch('http://localhost:5001/add_lostproperty', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lostproperty_name: lostpropertyName }),
    });

    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
    }

    const result = await response.json();
    console.log(result.message);
}

async function runTests() {
    const testLostProperties = [
        'Umbrella',
        'Wallet',
        'Phone',
        'Keys',
        'Bag',
        'Glasses',
        'Book',
        'Watch',
        'Hat',
        'Scarf'
    ];

    for (const item of testLostProperties) {
        await addTestLostProperty(item);
    }

    console.log('All test lost properties have been added.');
}

document.addEventListener('DOMContentLoaded', runTests);
