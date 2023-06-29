# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ActivityPub::Activity::EmojiReact do
  let(:sender) { Fabricate(:account) }
  let(:remote_sender) { Fabricate(:account, domain: 'example.com') }
  let(:recipient) { Fabricate(:account) }
  let(:status)    { Fabricate(:status, account: recipient) }
  let(:custom_emoji) { Fabricate(:custom_emoji) }
  let(:remote_custom_emoji) { Fabricate(:custom_emoji, domain: 'example.com') }

  let(:json) do
    {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'foo',
      type: 'EmojiReact',
      content: '👍',
      actor: ActivityPub::TagManager.instance.uri_for(sender),
      object: ActivityPub::TagManager.instance.uri_for(status),
    }.with_indifferent_access
  end

  let(:json_custom_emoji) do
    {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'foo',
      type: 'EmojiReact',
      content: ":#{custom_emoji.shortcode}:",
      tag: ['Emoji', custom_emoji],
      actor: ActivityPub::TagManager.instance.uri_for(sender),
      object: ActivityPub::TagManager.instance.uri_for(status),
    }.with_indifferent_access
  end

  let(:json_remote_custom_emoji) do
    {
      '@context': 'https://www.w3.org/ns/activitystreams',
      id: 'foo',
      type: 'EmojiReact',
      content: ":#{remote_custom_emoji.shortcode}:",
      tag: ['Emoji', remote_custom_emoji],
      actor: ActivityPub::TagManager.instance.uri_for(sender),
      object: ActivityPub::TagManager.instance.uri_for(status),
    }.with_indifferent_access
  end

  describe '#perform' do
    context 'with an emoji' do
      subject { described_class.new(json, sender) }

      before do
        subject.perform
      end

      it 'creates a reaction from sender to status' do
        expect(sender.reacted?(status, '👍')).to be true
      end
    end

    context 'with a custom emoji' do
      subject { described_class.new(json_custom_emoji, sender) }

      before do
        subject.perform
      end

      it 'creates a reaction from sender to status' do
        expect(sender.reacted?(status, custom_emoji.shortcode)).to be true
      end
    end

    context 'with a remote custom emoji' do
      subject { described_class.new(json_remote_custom_emoji, remote_sender) }

      before do
        subject.perform
      end

      it 'creates a reaction from sender to status' do
        expect(remote_sender.reacted?(status, remote_custom_emoji.shortcode)).to be true
      end
    end
  end
end
