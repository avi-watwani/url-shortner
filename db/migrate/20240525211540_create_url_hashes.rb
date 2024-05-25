class CreateUrlHashes < ActiveRecord::Migration[7.1]
  def change
    create_table :url_hashes do |t|
      t.string :short, null: false
      t.string :long, null: false

      t.timestamps
    end
  end
end
