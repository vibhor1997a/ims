(async () => {
    const contractInstance = await initialize();
    let data = await contractInstance.display_data.call(localStorage.getItem('username'));
    if (data) {
        data = JSON.parse(data);
        console.log(data);
        document.getElementById('uname').value = localStorage.getItem('username');
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('DOB').value = data.DOB;
        document.getElementById('gender').value = data.gender;
        document.getElementById('sonOfOp').innerText = data.sonOfOp;
        document.getElementById('sonOfVal').value = data.sonOfVal;
        document.getElementById('addressLine1').value = data.addressLine1;
        document.getElementById('addressLine2').value = data.addressLine2;
        document.getElementById('state').value = data.state;
        document.getElementById('pincode').value = data.pincode;
    }
})().catch(err => console.log(err));