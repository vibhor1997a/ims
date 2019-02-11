(async () => {
    const contractInstance = await initialize();
    const frm = document.querySelector('#frm');
    frm.addEventListener('submit', async evt => {
        evt.preventDefault();
        const uname = frm.querySelector('#uname').value
        const password = frm.querySelector('#password').value;
        const data = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            gender: document.getElementById('gender').value,
            DOB: document.getElementById('DOB').value,
            sonOfOp: document.getElementById('sonOfOp').value,
            sonOfVal: document.getElementById('sonOfVal').value,
            addressLine1: document.getElementById('addressLine1').value,
            addressLine2: document.getElementById('addressLine2').value,
            pincode: document.getElementById('pincode').value,
            state: document.getElementById('state').value,
        };
        if (!(await contractInstance.signup.call(uname, password, JSON.stringify(data)))) {
            alert('Account Already exists!');
        }
        else {
            await contractInstance.signup(uname, password, JSON.stringify(data));
            localStorage.setItem('username', uname);
            location.href = '/';
        }
    });
})().catch(err => {
    console.log(err);
});


/**
 * @param {File} file 
 */
function getBase64(file) {
    return new Promise((res, rej) => {
        if (!file) {
            res('abc');
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            res(reader.result);
        };
        reader.onerror = function (error) {
            rej(error);
        };
    });
}
