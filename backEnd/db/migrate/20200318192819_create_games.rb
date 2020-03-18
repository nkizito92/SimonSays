class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.string :player
      t.string :highscore
      t.string :score

      t.timestamps
    end
  end
end
