class ButtonsAdapter {
    constructor(url) {
        this.url = url
    }


    fetchButtons() {
        fetch(this.url)
            .then(res => res.json())
            .then(btnObj => )
    }


}