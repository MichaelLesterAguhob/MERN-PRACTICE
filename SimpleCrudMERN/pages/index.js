
function showUserDetails() {
    let userDetails = `<table border="1">
                        <thead>
                            <th>First Name</th>
                            <th>Middle Name</th>
                            <th>Last Name</th>
                            <th>Actions</th>
                        </thead>
                        </tbody>
                        `;
    fetch('/users')
    .then(function(response) {
        return response.json()
    })
    .then(function(users) {
        users.forEach(function(user) {
            userDetails += `<tr>
                <td id="fname-${user._id}">${user.fName}</td>
                <td id="mname-${user._id}">${user.mName}</td>
                <td id="lname-${user._id}">${user.lName}</td>
                <td>
                    <button onclick="editUser('${user._id}')">Edit</button>
                    <button onclick="deleteUser('${user._id}')">Delete</button>
                </td>
                </tr>
            `
        })
        userDetails += `
            </tbody>
            </table>
        `;
        document.querySelector('#users').innerHTML = userDetails;
    });
}
showUserDetails();


document.querySelector('#add-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let firstName = document.querySelector('#fname');
    let middleName = document.querySelector('#mname');
    let lastName = document.querySelector('#lname');

    fetch('/users/add', {
        method: 'POST',
        body: JSON.stringify({
            fName: firstName.value,
            mName: middleName.value,
            lName: lastName.value
        }),headers: {'Content-Type' : 'application/json'}
    }).then(function(response){
        return response.json();
    }).then(function(data) {
        alert("Use added successfully");
        firstName.value = null;
        middleName.value = null;
        lastName.value = null;
        console.log(data);
        showUserDetails();
    })
})


function deleteUser(userId) {
    fetch(`/users/delete/${userId}`, {
        method: 'DELETE'
    }).then(function(response){
        return response.json()
    }).then(function(data){
        alert(`User has been deleted!`);
        showUserDetails();
    })  
}


function editUser(userId) {
    let firstName = document.querySelector(`#fname-${userId}`);
    let middleName = document.querySelector(`#mname-${userId}`);
    let lastName = document.querySelector(`#lname-${userId}`);

    document.querySelector(`#fname-edit`).value = firstName.innerHTML;
    document.querySelector(`#mname-edit`).value = middleName.innerHTML;
    document.querySelector(`#lname-edit`).value = lastName.innerHTML;
    document.querySelector(`#to-edit-id`).value = userId;
}


document.querySelector('#edit-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let userId = document.querySelector(`#to-edit-id`).value;
    let firstName =   document.querySelector(`#fname-edit`);
    let middleName =  document.querySelector(`#mname-edit`);
    let lastName =  document.querySelector(`#lname-edit`);

    fetch(`/users/update/${userId}`, {
        method: 'PUT',
        body: JSON.stringify({
            fname: firstName.value,
            mname: middleName.value,
            lname: lastName.value
        }), headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        firstName.value = null,
        middleName.value = null,
        lastName.value = null
        userId = null;
        alert(data.message);
        showUserDetails();
    })
})