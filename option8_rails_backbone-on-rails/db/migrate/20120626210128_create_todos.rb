class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.string :content
      t.boolean :done
      t.integer :order

      t.timestamps
    end
  end
end
