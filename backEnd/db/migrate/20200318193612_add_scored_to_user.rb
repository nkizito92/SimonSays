class AddScoredToUser < ActiveRecord::Migration[6.0]
    def change 
        add_column :users, :scored, :integer
    end
end
