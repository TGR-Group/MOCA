async function addLostProperty() {
    const lostpropertyName = document.getElementById('lostpropertyInput').value;

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
    alert(result.message);
}

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');

    mobileMenu.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});
