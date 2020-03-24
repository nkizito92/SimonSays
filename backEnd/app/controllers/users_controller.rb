class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users, include: [:games]
    end 

    def create 
        user = User.find_or_create_by(user_params)
        user.games.build({highscore: user_params[:scored], score: user_params[:scored]})
        user.save
        render json: user
    end

    private 

    def user_params 
        params.require(:user).permit(:name, :scored)
    end 
end
