class User < ApplicationRecord
    has_many :games
    validates :scored, presence: false

    def highscore 
        self.games.maximum("score")
    end

    def attributes
        super.merge({
            "highscore" => highscore
        })
    end 
end
