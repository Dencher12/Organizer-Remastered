class AddTimeToNotes < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :time, :time
  end
end
