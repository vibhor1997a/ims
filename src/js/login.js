(async () => {
    const contractInstance = await initialize();
    const frm = document.querySelector('form');
    frm.addEventListener('submit', async (evt) => {
        evt.preventDefault();
        const uname = frm.querySelector('#uname').value;
        const password = frm.querySelector('#password').value;
        await login(uname, password);
    });
    async function login(uname, password) {
        const success = await contractInstance.login.call(uname, password);
        if (success) {
            localStorage.setItem('username', uname);
            location.href = '/';
        }
        else {
            alert('Account Not Found!');
        }
    }
})().catch(err => console.log(err));