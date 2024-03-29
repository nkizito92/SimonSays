class Button {
    static all = []
    constructor({ id, name, sound }) {
        this.id = id
        this.name = name
        this.sound = sound
        this.keybtn = document.createElement("button")
        this.keybtn.className = "keybutton"
        this.keybtn.innerHTML = `${this.name} <audio> <source src="${this.sound}" type="audio/mp3"> </audio>`
        this.keybtn.id = `key-${this.id}`
        this.keyPair = document.querySelector("#keysbuttons")
        this.loading = document.querySelector("#loading")
        Button.all.push(this)
    }

    fullyRender() {
        this.keyPair.appendChild(this.keybtn)
        this.loading.innerHTML = ""
        // setTimeout(() => startPressCpuButton([Math.floor(6 * Math.random(1))]), 3000)
        setTimeout(() => cpuPressbuttons(), 3000)
        return this.keyPair
    }

    static removeButtons() {
        Button.all.forEach(btn => {
            btn.keyPair.removeChild(btn.keybtn)
        })
    }
}