import axios from 'axios'

const DB_URL = 'http://api.project-moca.com';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = DB_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true;

async function staffAuth(name,pass) {
    await axios.post('/staff/program', {
        auth: {
            username: name,
            password: pass
        }
    }).then((res) => {
        if (res.status == 200) {
            localStorage.setItem('staffId', name);
            localStorage.setItem('staffPass', pass);
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