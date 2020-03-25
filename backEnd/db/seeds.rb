# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    james = User.create(name: "James")
    ames = User.create(name: "Ames")
    button1 = Button.create(name: "A1", sound: "sounds/clay.mp3")
    button2 = Button.create(name: "A2", sound: "sounds/moon.mp3")
    button3 = Button.create(name: "B1", sound: "sounds/clayMedi.mp3")
    button4 = Button.create(name: "G1", sound: "sounds/clayHigh.mp3")
    button5 = Button.create(name: "F2", sound: "sounds/pinwheel.mp3")
    button6 = Button.create(name: "F4", sound: "sounds/ufo.mp3")
    game = Game.create(user_id: james.id, highscore: 8, score: 0)
    game2 = Game.create(user_id: james.id, highscore: 10, score: 0)
    james.games << game
    james.games << game2
    ames.games.build([{highscore: 80, score: 0}, {highscore: 10, score: 0} ])
    ames.save
    james.save