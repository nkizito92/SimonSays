class Button {
    static all = []
    constructor({ id, name, sound }) {
        this.id = id
        this.name = name
        this.sound = sound
        this.keybtn = document.createElement("button")
        this.keybtn.className = "keybutton"
        this.keybtn.innerHTML = this.name
        this.keybtn.id = `key-${this.id}`
        this.keyPair = document.querySelector("#keysbuttons")
        Button.all.push(this)
    }

    fullyRender() {
        this.keyPair.appendChild(this.keybtn)
        return this.keyPair
    }

    static removeButtons() {
        Button.all.forEach(btn => {
            debugger
            btn.keyPair.removeChild(btn.keybtn)
        })
    }

    static renderAll() {
        Button.all.forEach(button => {
            button.fullyRender()
        })
    }
}