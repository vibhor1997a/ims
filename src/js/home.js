(async () => {
    const contractInstance = await initialize();
    const uname = localStorage.getItem('username');
    if (uname) {
        document.querySelector('#loginsignup').setAttribute('hidden', 'true');
        document.querySelector('#uname').innerText = uname;
        document.querySelector('#logout').addEventListener('click', async () => {
            await logout();
        });
    }
    else {
        document.querySelector('#username').setAttribute('hidden', 'true');
    }
    async function logout() {
        const res = await contractInstance.logout.call(uname);
        console.log(res);
        localStorage.removeItem('username');
        location.reload();
    }
})().catch(err => console.log(err));