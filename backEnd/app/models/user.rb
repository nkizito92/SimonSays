class User < ApplicationRecord
    has_many :games
    validates :scored, presence: false
end
