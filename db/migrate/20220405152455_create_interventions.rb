class CreateInterventions < ActiveRecord::Migration[5.2]
  def change
    create_table :interventions do |t|
      t.references :author, foreign_key: { to_table: :employees }
      t.references :customer, foreign_key: true
      t.references :building, foreign_key: true
      t.references :battery, foreign_key: true
      t.references :column, foreign_key: true
      t.references :elevator, foreign_key: true
      t.references :employee, foreign_key: { to_table: :employees }
      t.datetime :start_date
      t.datetime :end_date
      t.string :result
      t.text :report
      t.string :status

      t.timestamps
    end
  end
end
