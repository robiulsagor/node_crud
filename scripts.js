const userForm = () => {
    const inputContainer = document.getElementById("inputUser");
    if (inputContainer.style.display == "block") {
        inputContainer.style.display = "none"
    } else {
        inputContainer.style.display = "block"
    }
}

const sendUser = () => {
    const input = document.getElementById("userName").value;
    fetch('http://localhost:8080/addUser', {
        method: 'POST',
        body: JSON.stringify({ name: input }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log("completed!");
            console.log(json)
            users.push(json)
            fetchUsers(json);
        });
}

const fetchUsers = () => {
    const userContainer = document.getElementById('names');
    fetch("http://localhost:8080/users")
        .then(res => res.json())
        .then(users => {
            console.log(users);
            userContainer.innerHTML ='';
            users.map(user => {
                userContainer.innerHTML +=  `
                    <li>${user}</li>
                `
            })
        })
}