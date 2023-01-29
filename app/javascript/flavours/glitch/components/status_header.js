//  Package imports.
import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

//  Mastodon imports.
import Avatar from './avatar';
import AvatarOverlay from './avatar_overlay';
import DisplayName from './display_name';

export default class StatusHeader extends React.PureComponent {

  static propTypes = {
    status: ImmutablePropTypes.map.isRequired,
    friends: ImmutablePropTypes.listOf(ImmutablePropTypes.map),
    parseClick: PropTypes.func.isRequired,
  };

  //  Handles clicks on account name/image
  handleClick = (acct, e) => {
    const { parseClick } = this.props;
    parseClick(e, `/@${acct}`);
  }

  handleAccountClick = (e) => {
    const { status } = this.props;
    this.handleClick(status.getIn(['account', 'acct']), e);
  }

  //  Rendering.
  render () {
    const {
      status,
      friends,
    } = this.props;

    const account = status.get('account');

    let statusAvatar;
    if (friends === undefined || friends === null || friends.size === 0) {
      statusAvatar = <Avatar account={account} size={48} />;
    } else {
      statusAvatar = <AvatarOverlay account={account} friend={friends.get(0)} />;
    }

    return (
      <div className='status__info__account'>
        <a
          href={account.get('url')}
          target='_blank'
          className='status__avatar'
          onClick={this.handleAccountClick}
          rel='noopener noreferrer'
        >
          {statusAvatar}
        </a>
        <a
          href={account.get('url')}
          target='_blank'
          className='status__display-name'
          onClick={this.handleAccountClick}
          rel='noopener noreferrer'
        >
          <DisplayName account={account} />
        </a>
      </div>
    );
  }

}
