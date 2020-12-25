class AddJidToNote < ActiveRecord::Migration[6.0]
  def change
    add_column :notes, :job_id, :string
  end
end
