import { useCallback } from 'react';

import { defineMessages, useIntl } from 'react-intl';

import { replyCompose } from 'flavours/glitch/actions/compose';
import type { Status } from 'flavours/glitch/models/status';
import { useAppDispatch } from 'flavours/glitch/store';

import type { BaseConfirmationModalProps } from './confirmation_modal';
import { ConfirmationModal } from './confirmation_modal';

const messages = defineMessages({
  replyTitle: {
    id: 'confirmations.reply.title',
    defaultMessage: 'Overwrite post?',
  },
  replyConfirm: { id: 'confirmations.reply.confirm', defaultMessage: 'Reply' },
  replyMessage: {
    id: 'confirmations.reply.message',
    defaultMessage:
      'Replying now will overwrite the message you are currently composing. Are you sure you want to proceed?',
  },
});

export const ConfirmReplyModal: React.FC<
  {
    status: Status;
    rebloggedBy: string;
  } & BaseConfirmationModalProps
> = ({ status, rebloggedBy, onClose }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const onConfirm = useCallback(() => {
    dispatch(replyCompose(status, rebloggedBy));
  }, [dispatch, status, rebloggedBy]);

  return (
    <ConfirmationModal
      title={intl.formatMessage(messages.replyTitle)}
      message={intl.formatMessage(messages.replyMessage)}
      confirm={intl.formatMessage(messages.replyConfirm)}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};
