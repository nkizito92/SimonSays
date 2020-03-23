class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users, include: [:games]
    end 

    def create 
        user = User.new(name: params[:name])
        user.games.build({highscore: params[:highscore], score: params[:highscore]})
        user.save
        render json: user
    end
end
