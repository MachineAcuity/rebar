/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Badge from 'material-ui/badge';
import IconButton from 'material-ui/IconButton';
import IconNotificationsEventAvailable from 'material-ui/svg-icons/notification/event-available';


class AppBar_ToDo_OpenIndicator extends React.Component
{
  _handle_onTouchTap_IncompleteTODOs = ( ) =>
  {
    this.context.router.push( '/ToDos/active' );
  };

  render( )
  {
    let incompleteCount = this.props.Viewer.ToDo_TotalCount - this.props.Viewer.ToDo_CompletedCount;

    if( incompleteCount > 0 )
      return(
        <Badge key="top-incomplete" style={ { marginTop: -11, marginBottom: -17 } } badgeContent={ incompleteCount } primary={ true } badgeStyle={{top:20, right:16}}>
          <IconButton tooltip="Incomplete TODOs" onTouchTap={ this._handle_onTouchTap_IncompleteTODOs }>
            <IconNotificationsEventAvailable />
          </IconButton>
        </Badge>
      );
    else
      return <div />;
  }
}

//

AppBar_ToDo_OpenIndicator.contextTypes = {
  router: React.PropTypes.object.isRequired
};

//

export default Relay.createContainer( AppBar_ToDo_OpenIndicator, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_TotalCount,
        ToDo_CompletedCount,
      }
    `,
  },
});
