
fetch("http://localhost:3000/users")
    .then(res => res.json())
    .then(user => {
        let body = document.querySelector("body");
        user.forEach(player => {
            debugger
            let div = document.createElement("div");
            div.innerHTML = `${player.name} and ${player.games.length}`
            body.appendChild(div)
        })
    })