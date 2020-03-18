class AddUserToGame < ActiveRecord::Migration[6.0]
    def change 
        add_column :games, :user_id, :integer
    end 
end