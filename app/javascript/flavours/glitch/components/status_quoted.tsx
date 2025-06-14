import { FormattedMessage } from 'react-intl';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import type { Map as ImmutableMap } from 'immutable';

import QuoteIcon from '@/images/quote.svg?react';
import ArticleIcon from '@/material-icons/400-24px/article.svg?react';
import ChevronRightIcon from '@/material-icons/400-24px/chevron_right.svg?react';
import { Icon } from 'flavours/glitch/components/icon';
import StatusContainer from 'flavours/glitch/containers/status_container';
import type { Status } from 'flavours/glitch/models/status';
import { useAppSelector } from 'flavours/glitch/store';

const MAX_QUOTE_POSTS_NESTING_LEVEL = 1;

const QuoteWrapper: React.FC<{
  isError?: boolean;
  children: React.ReactElement;
}> = ({ isError, children }) => {
  return (
    <div
      className={classNames('status__quote', {
        'status__quote--error': isError,
      })}
    >
      <Icon id='quote' icon={QuoteIcon} className='status__quote-icon' />
      {children}
    </div>
  );
};

const QuoteLink: React.FC<{
  status: Status;
}> = ({ status }) => {
  const accountId = status.get('account') as string;
  const account = useAppSelector((state) =>
    accountId ? state.accounts.get(accountId) : undefined,
  );

  const quoteAuthorName = account?.display_name_html;

  if (!quoteAuthorName) {
    return null;
  }

  const quoteAuthorElement = (
    <span dangerouslySetInnerHTML={{ __html: quoteAuthorName }} />
  );
  const quoteUrl = `/@${account.get('acct')}/${status.get('id') as string}`;

  return (
    <Link to={quoteUrl} className='status__quote-author-button'>
      <FormattedMessage
        id='status.quote_post_author'
        defaultMessage='Post by {name}'
        values={{ name: quoteAuthorElement }}
      />
      <Icon id='chevron_right' icon={ChevronRightIcon} />
      <Icon id='article' icon={ArticleIcon} />
    </Link>
  );
};

type QuoteMap = ImmutableMap<'state' | 'quoted_status', string | null>;

export const QuotedStatus: React.FC<{
  quote: QuoteMap;
  contextType?: string;
  variant?: 'full' | 'link';
  nestingLevel?: number;
}> = ({ quote, contextType, nestingLevel = 1, variant = 'full' }) => {
  const quotedStatusId = quote.get('quoted_status');
  const state = quote.get('state');
  const status = useAppSelector((state) =>
    quotedStatusId ? state.statuses.get(quotedStatusId) : undefined,
  );
  let quoteError: React.ReactNode = null;

  if (state === 'deleted') {
    quoteError = (
      <FormattedMessage
        id='status.quote_error.removed'
        defaultMessage='This post was removed by its author.'
      />
    );
  } else if (state === 'unauthorized') {
    quoteError = (
      <FormattedMessage
        id='status.quote_error.unauthorized'
        defaultMessage='This post cannot be displayed as you are not authorized to view it.'
      />
    );
  } else if (state === 'pending') {
    quoteError = (
      <FormattedMessage
        id='status.quote_error.pending_approval'
        defaultMessage='This post is pending approval from the original author.'
      />
    );
  } else if (state === 'rejected' || state === 'revoked') {
    quoteError = (
      <FormattedMessage
        id='status.quote_error.rejected'
        defaultMessage='This post cannot be displayed as the original author does not allow it to be quoted.'
      />
    );
  } else if (!status || !quotedStatusId) {
    quoteError = (
      <FormattedMessage
        id='status.quote_error.not_found'
        defaultMessage='This post cannot be displayed.'
      />
    );
  }

  if (quoteError) {
    return <QuoteWrapper isError>{quoteError}</QuoteWrapper>;
  }

  if (variant === 'link' && status) {
    return <QuoteLink status={status} />;
  }

  const childQuote = status?.get('quote') as QuoteMap | undefined;
  const canRenderChildQuote =
    childQuote && nestingLevel <= MAX_QUOTE_POSTS_NESTING_LEVEL;

  return (
    <QuoteWrapper>
      <StatusContainer
        isQuotedPost
        id={quotedStatusId}
        contextType={contextType}
        avatarSize={40}
      >
        {canRenderChildQuote && (
          <QuotedStatus
            quote={childQuote}
            contextType={contextType}
            variant={
              nestingLevel === MAX_QUOTE_POSTS_NESTING_LEVEL ? 'link' : 'full'
            }
            nestingLevel={nestingLevel + 1}
          />
        )}
      </StatusContainer>
    </QuoteWrapper>
  );
};

interface StatusQuoteManagerProps {
  id: string;
  contextType?: string;
  [key: string]: unknown;
}

/**
 * This wrapper component takes a status ID and, if the associated status
 * is a quote post, it renders the quote into `StatusContainer` as a child.
 * It passes all other props through to `StatusContainer`.
 */

export const StatusQuoteManager = (props: StatusQuoteManagerProps) => {
  const status = useAppSelector((state) => {
    const status = state.statuses.get(props.id);
    const reblogId = status?.get('reblog') as string | undefined;
    return reblogId ? state.statuses.get(reblogId) : status;
  });
  const quote = status?.get('quote') as QuoteMap | undefined;

  if (quote) {
    return (
      <StatusContainer {...props}>
        <QuotedStatus quote={quote} contextType={props.contextType} />
      </StatusContainer>
    );
  }

  return <StatusContainer {...props} />;
};
