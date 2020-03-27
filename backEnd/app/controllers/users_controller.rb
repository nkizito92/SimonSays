class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users, include: [:games]
    end 

    def create 
        user = User.find_or_create_by(name: user_params[:name])
        user.games.build({score: params[:scored] })
        user.save
        render json: user
    end

    private 

    def user_params 
        params.require(:user).permit(:name, :scored)
    end 
end
