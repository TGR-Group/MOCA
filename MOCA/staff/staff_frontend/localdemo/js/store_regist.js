async function writeToSpreadsheet() {
  const name = document.getElementById('storenameInput').value;
  const storeName = document.getElementById('storenameInput').value;

  const response = await fetch('http://localhost:5000/add_store', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, store_name: storeName }),
  });

  if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
  }

  const result = await response.json();
  console.log(result.message);
  alert(result.message);
}
