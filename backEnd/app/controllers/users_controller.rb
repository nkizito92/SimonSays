class UsersController < ApplicationController

    def index 
        users = User.all 
        render json: users, include: [:games]
    end 
end
