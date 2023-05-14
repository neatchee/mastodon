# frozen_string_literal: true

class ActivityPub::Activity::EmojiReact < ActivityPub::Activity
  def perform
    original_status = status_from_uri(object_uri)
    name = @json['content']
    return if original_status.nil? ||
              !original_status.account.local? ||
              delete_arrived_first?(@json['id'])

    custom_emoji = nil
    if /^:.*:$/.match?(name)
      process_emoji_tags(@json['tag'])

      name.delete! ':'
      custom_emoji = CustomEmoji.find_by(shortcode: name, domain: @account.domain)
      return if custom_emoji.nil?
    end

    return if @account.reacted?(original_status, name, custom_emoji)

    reaction = original_status.status_reactions.create!(account: @account, name: name, custom_emoji: custom_emoji)

    LocalNotificationWorker.perform_async(original_status.account_id, reaction.id, 'StatusReaction', 'reaction')
  end
end
