# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
    james = User.create(name: "James")
    ames = User.create(name: "Ames")
    jack = User.create(name: "Jack")

    game = Game.create(user_id: james.id, player: james.name, highscore: "8", score: "0")
    game2 = Game.create(user_id: james.id, player: james.name, highscore: "10", score: "0")
    james.games << game
    james.games << game2

    james.save