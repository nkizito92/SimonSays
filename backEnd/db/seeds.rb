#  Seed theses objects to set the game up
    james = User.create(name: "James")
    ames = User.create(name: "Ames")
    button1 = Button.create(name: "A1", sound: "sounds/clay.mp3")
    button2 = Button.create(name: "A2", sound: "sounds/moon.mp3")
    button3 = Button.create(name: "B1", sound: "sounds/clayMedi.mp3")
    button4 = Button.create(name: "G1", sound: "sounds/clayHigh.mp3")
    button5 = Button.create(name: "F2", sound: "sounds/pinwheel.mp3")
    button6 = Button.create(name: "F4", sound: "sounds/ufo.mp3")
    game = Game.create(user_id: james.id, score: 2)
    game2 = Game.create(user_id: james.id,  score: 10)
    james.games << game
    james.games << game2
    ames.games.build([{score: 80}, {score: 10} ])
    ames.save
    james.save