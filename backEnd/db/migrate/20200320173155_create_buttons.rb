class CreateButtons < ActiveRecord::Migration[6.0]
  def change
    create_table :buttons do |t|
      t.string :name
      t.string :sound

      t.timestamps
    end
  end
end
