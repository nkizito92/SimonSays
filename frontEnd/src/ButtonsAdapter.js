class ButtonsAdapter {
  constructor(url) {
    this.url = url;
  }
  fetchButtons() {
    fetch(this.url)
      .then(res => res.json())
      .then(btnObj => {
         for (let btn in btnObj) {
          let newBtn = new Button(btnObj[btn]);
          newBtn.fullyRender();
        }
      });
  }
}