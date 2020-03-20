class Buttons {
    static all = []
    constructor({ id, name, sound }) {
        this.id = id
        this.name = name
        this.sound = sound
        this.keybtn = document.createElement("button")
        this.keybtn.className = ".keybutton"
        this.keybtn.id = `key-${this.id}`
        Buttons.all.push(this)
    }

    fullyRender() {
        this.keyPair = document.querySelector("#keysbuttons")
        this.keyPair.appendChild(this.keybtn)

        return this.keyPair
    }
}