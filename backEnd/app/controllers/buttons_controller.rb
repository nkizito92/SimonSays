class ButtonsController < ApplicationController
    def index 
        buttons = Button.all 
        render json: buttons
    end 
end
