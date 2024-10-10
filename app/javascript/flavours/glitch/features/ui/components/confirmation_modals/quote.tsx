import { useCallback } from 'react';

import { defineMessages, useIntl } from 'react-intl';

import { quoteCompose } from 'flavours/glitch/actions/compose';
import type { Status } from 'flavours/glitch/models/status';
import { useAppDispatch } from 'flavours/glitch/store';

import type { BaseConfirmationModalProps } from './confirmation_modal';
import { ConfirmationModal } from './confirmation_modal';

const messages = defineMessages({
  quoteTitle: {
    id: 'confirmations.quote.title',
    defaultMessage: 'Quote post?',
  },
  quoteConfirm: { id: 'confirmations.quote.confirm', defaultMessage: 'Quote' },
  quoteMessage: {
    id: 'confirmations.quote.message',
    defaultMessage:
      'Quoting now will overwrite the message you are currently composing. Are you sure you want to proceed?',
  },
});

export const ConfirmQuoteModal: React.FC<
  {
    status: Status;
    rebloggedBy: string;
  } & BaseConfirmationModalProps
> = ({ status, rebloggedBy, onClose }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();

  const onConfirm = useCallback(() => {
    dispatch(quoteCompose(status, rebloggedBy));
  }, [dispatch, status, rebloggedBy]);

  return (
    <ConfirmationModal
      title={intl.formatMessage(messages.quoteTitle)}
      message={intl.formatMessage(messages.quoteMessage)}
      confirm={intl.formatMessage(messages.quoteConfirm)}
      onConfirm={onConfirm}
      onClose={onClose}
    />
  );
};
