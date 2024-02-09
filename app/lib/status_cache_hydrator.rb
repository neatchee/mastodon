# frozen_string_literal: true

class StatusCacheHydrator
  def initialize(status)
    @status = status
  end

  def hydrate(account_id)
    # The cache of the serialized hash is generated by the fan-out-on-write service
    payload = Rails.cache.fetch("fan-out/#{@status.id}") { InlineRenderer.render(@status, nil, :status) }

    # If we're delivering to the author who disabled the display of the application used to create the
    # status, we need to hydrate the application, since it was not rendered for the basic payload
    payload[:application] = payload_application if payload[:application].nil? && @status.account_id == account_id

    # We take advantage of the fact that some relationships can only occur with an original status, not
    # the reblog that wraps it, so we can assume that some values are always false
    if payload[:reblog]
      hydrate_reblog_payload(payload, account_id)
    else
      hydrate_non_reblog_payload(payload, account_id)
    end
  end

  private

  def hydrate_non_reblog_payload(empty_payload, account_id)
    empty_payload.tap do |payload|
      payload[:favourited] = Favourite.exists?(account_id: account_id, status_id: @status.id)
      payload[:reblogged]  = Status.exists?(account_id: account_id, reblog_of_id: @status.id)
      payload[:muted]      = ConversationMute.exists?(account_id: account_id, conversation_id: @status.conversation_id)
      payload[:bookmarked] = Bookmark.exists?(account_id: account_id, status_id: @status.id)
      payload[:pinned]     = StatusPin.exists?(account_id: account_id, status_id: @status.id) if @status.account_id == account_id
      payload[:filtered]   = mapped_applied_custom_filter(account_id, @status)
      payload[:reactions]  = serialized_reactions(account_id)

      if payload[:poll]
        payload[:poll][:voted] = @status.account_id == account_id
        payload[:poll][:own_votes] = []
      end
    end
  end

  def hydrate_reblog_payload(empty_payload, account_id)
    empty_payload.tap do |payload|
      payload[:muted]      = false
      payload[:bookmarked] = false
      payload[:pinned]     = false if @status.account_id == account_id
      payload[:filtered]   = mapped_applied_custom_filter(account_id, @status.reblog)

      # If the reblogged status is being delivered to the author who disabled the display of the application
      # used to create the status, we need to hydrate it here too
      payload[:reblog][:application] = payload_reblog_application if payload[:reblog][:application].nil? && @status.reblog.account_id == account_id

      payload[:reblog][:favourited] = Favourite.exists?(account_id: account_id, status_id: @status.reblog_of_id)
      payload[:reblog][:reblogged]  = Status.exists?(account_id: account_id, reblog_of_id: @status.reblog_of_id)
      payload[:reblog][:muted]      = ConversationMute.exists?(account_id: account_id, conversation_id: @status.reblog.conversation_id)
      payload[:reblog][:bookmarked] = Bookmark.exists?(account_id: account_id, status_id: @status.reblog_of_id)
      payload[:reblog][:pinned]     = StatusPin.exists?(account_id: account_id, status_id: @status.reblog_of_id) if @status.reblog.account_id == account_id
      payload[:reblog][:filtered]   = payload[:filtered]
      payload[:reblog][:reactions]  = serialized_reactions(account_id)

      if payload[:reblog][:poll]
        if @status.reblog.account_id == account_id
          payload[:reblog][:poll][:voted] = true
          payload[:reblog][:poll][:own_votes] = []
        else
          own_votes = PollVote.where(poll_id: @status.reblog.poll_id, account_id: account_id).pluck(:choice)
          payload[:reblog][:poll][:voted] = !own_votes.empty?
          payload[:reblog][:poll][:own_votes] = own_votes
        end
      end

      payload[:favourited] = payload[:reblog][:favourited]
      payload[:reblogged]  = payload[:reblog][:reblogged]
      payload[:reactions]  = payload[:reblog][:reactions]
    end
  end

  def mapped_applied_custom_filter(account_id, status)
    CustomFilter
      .apply_cached_filters(CustomFilter.cached_filters_for(account_id), status)
      .map { |filter| serialized_filter(filter) }
  end

  def serialized_filter(filter)
    ActiveModelSerializers::SerializableResource.new(
      filter,
      serializer: REST::FilterResultSerializer
    ).as_json
  end

  def serialized_reactions(account_id)
    reactions = @status.reactions(account_id)
    ActiveModelSerializers::SerializableResource.new(
      reactions,
      each_serializer: REST::ReactionSerializer,
      scope: account_id, # terrible
      scope_name: :current_user
    ).as_json
  end

  def payload_application
    @status.application.present? ? serialized_status_application_json : nil
  end

  def serialized_status_application_json
    ActiveModelSerializers::SerializableResource.new(
      @status.application,
      serializer: REST::StatusSerializer::ApplicationSerializer
    ).as_json
  end

  def payload_reblog_application
    @status.reblog.application.present? ? serialized_status_reblog_application_json : nil
  end

  def serialized_status_reblog_application_json
    ActiveModelSerializers::SerializableResource.new(
      @status.reblog.application,
      serializer: REST::StatusSerializer::ApplicationSerializer
    ).as_json
  end
end
