// const car = {
//     model: "Tesla",
//     year: 2023,
// };
// const json = JSON.stringify(car);
// const parsed = JSON.parse(json);
// console.log(json, parsed);
const list = document.querySelector("#list"),
    filter = document.querySelector("#filter");
let USERS = [];


const toHTML = (user) => `<li class="list-group-item">${user.name}</li>`;

const render = (users = []) => {
    if (users.length === 0) {
        list.innerHTML = "No matched users";
    } else {
        const html = users.map(toHTML).join("");
        list.innerHTML = html;
    }
};

async function start() {
    list.innerHTML = "Loading...";
    try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const data  = await resp.json()
        setTimeout(() => {
            USERS = data
            render(data)
        }, 100)
    } catch (err) {
        list.style.color = "red";
        list.innerHTML = err.message;
    }
}

start();

filter.addEventListener("input", (event) => {
    const value = event.target.value.toLowerCase(),
        filteredUsers = USERS.filter(user => user.name.toLowerCase().includes(value));

    render(filteredUsers)
});