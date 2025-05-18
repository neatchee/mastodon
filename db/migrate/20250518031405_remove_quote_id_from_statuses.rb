# frozen_string_literal: true

class Status < ApplicationRecord
  self.ignored_columns += ['quote_id']
end

class RemoveQuoteIdFromStatuses < ActiveRecord::Migration[8.0]
  def change
    remove_index :statuses, :quote_id, if_exists: true
    safety_assured { remove_column :statuses, :quote_id, :bigint, if_exists: true }
  end
end
