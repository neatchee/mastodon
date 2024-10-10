# frozen_string_literal: true

class AddQuoteIdToStatuses < ActiveRecord::Migration[6.1]
  def change
    add_column :statuses, :quote_id, :bigint, null: true, default: nil
  end
end
