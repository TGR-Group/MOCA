async function writeToSpreadsheet() {
    const storeName = document.getElementById('storenameInput').value;
  
    const response = await fetch('http://localhost:5001/add_store', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ store_name: storeName }),
    });
  
    if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        console.error(message);
        throw new Error(message);
    }
  
    const result = await response.json();
    console.log(result.message);
    alert(result.message);
  }
  