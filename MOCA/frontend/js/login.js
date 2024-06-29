const DB_URL = 'https://api.project-moca.com';
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;

async function staffAuth(name,pass) {
    await axios.get('/staff/auth',{
        auth: {
            username: name,
            password: pass
        },
    }).then((res) => {
        if (res.status == 200) {
            localStorage.setItem('staffId', name);
            localStorage.setItem('staffPass', pass);
            localStorage.setItem('programId',res.data.programIds[0].id)
            window.location.href = 'index.html';
        }
    }).catch((err) => {
        alert('ログインに失敗しました');
    });
}

let loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
    let name = document.getElementById('staffId').value;
    let pass = document.getElementById('staffPass').value;
    staffAuth(name, pass);
});