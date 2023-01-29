import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { injectIntl } from 'react-intl';
import { useCallback } from 'react';

function NameLink({ onClick, children, href }) {
  return (
    <a
      href={href}
      className='status__display-name'
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function NameList({ intl, accounts, onAccountClick, onViewMoreClick, viewMoreHref }) {
  if (accounts.size === 1) {
    const handleClick = useCallback((ev) => {
      onAccountClick(accounts.get(0), ev);
    }, [accounts]);

    return (
      <span>
        <NameLink href={accounts.get(0).get('url')} onClick={handleClick}>
          {accounts.get(0).get('display_name_html') || accounts.get(0).get('username')}
        </NameLink>
      </span>
    );
  }

  const accountsToIntl = accounts.slice(0, 2).map(acct => acct.get('display_name_html') || acct.get('username'));
  if (accounts.size > 2) {
    accountsToIntl.push(intl.formatMessage({ id: 'status.n_others', defaultMessage: '{n} others' }, { n: accounts.size - 2 }));
  }

  const parts = new Intl.ListFormat(intl.locale, { type: 'conjunction' }).formatToParts(accountsToIntl);

  let elementNum = 0;
  return parts.map(({ type, value }) => {
    if (type === 'element') {
      const currentElement = elementNum;
      elementNum++;
      if (currentElement === 2) {
        return <NameLink href={viewMoreHref} onClick={onViewMoreClick}>{value}</NameLink>;
      }
      let href = accounts.get(currentElement).get('url');
      let handleClick = (ev) => {
        onAccountClick(accounts.get(currentElement), ev);
      };

      return <NameLink href={href} onClick={handleClick}>{value}</NameLink>;
    } else {
      return value;
    }
  });
}

NameLink.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  href: PropTypes.string,
};

NameList.propTypes = {
  intl: PropTypes.object,
  accounts: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
  viewMoreHref: PropTypes.string,
  onAccountClick: PropTypes.func,
  onViewMoreClick: PropTypes.func,
};

export default injectIntl(NameList);
