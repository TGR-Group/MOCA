async function writeToSpreadsheet() {
  const name = document.getElementById('nameInput').value;

  const response = await fetch('http://localhost:5000/add_class', {  // URLが正しいことを確認
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  const result = await response.json();
  console.log(result.message);
}
