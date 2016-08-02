/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import Checkbox from 'material-ui/Checkbox';
import {List} from 'material-ui/List';
import {Tabs, Tab} from 'material-ui/Tabs';

import ToDo_list_updateMarkAllMutation from '../../relay/ToDo_list_updateMarkAllMutation';
import ToDo_Item from './ToDo_Item';

class ToDo_List extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  _handle_onCheck_MarkAll = ( event, checked ) =>
  {
    this.context.relay.commitUpdate(
      new ToDo_list_updateMarkAllMutation( {
        ToDo_Complete: checked,
        ToDos: this.props.Viewer.ToDos,
        Viewer: this.props.Viewer,
      } )
    );
  };

  renderToDos( )
  {
    return this.props.Viewer.ToDos.edges.map(edge =>
      <ToDo_Item
        key={edge.node.id}
        ToDo={edge.node}
        Viewer={this.props.Viewer}
      />
    );
  }

  _handle_requestChange = ( value ) =>
  {
    this.context.router.push( '/ToDos/' + value );
  };

  renderTabs( )
  {
    return(
      <Tabs valueLink={ { value: this.props.relay.variables.status, requestChange: this._handle_requestChange } }>
        <Tab label="All" value="any" />
        <Tab label="Active" value="active" />
        <Tab label="Completed" value="completed" />
      </Tabs>
    );
  }

  render( )
  {
    var numToDos = this.props.Viewer.ToDo_TotalCount;
    var numCompletedToDos = this.props.Viewer.ToDo_CompletedCount;
    return (
      <div>
        { this.renderTabs( ) }
        <Checkbox
          label="Mark all as complete"
          defaultChecked={ numToDos === numCompletedToDos }
          onCheck={ this._handle_onCheck_MarkAll }
        />
        <List>
          { this.renderToDos( ) }
        </List>
      </div>
    );
  }
}

ToDo_List.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default Relay.createContainer( ToDo_List, {
  initialVariables:
  {
    status: 'any',
    limit: 2147483647,
  },

  prepareVariables( { status } )
  {
    var nextStatus;
    if (status === 'active' || status === 'completed')
      nextStatus = status;
    else
      // This matches the Backbone example, which displays all ToDos on an
      // invalid route.
      nextStatus = 'any';

    return {
      status: nextStatus,
      limit: 2147483647,
    };
  },

  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ToDo_CompletedCount,
        ToDos(status: $status, first: $limit) {
          edges {
            node {
              id,
              ${ToDo_Item.getFragment('ToDo')},
            },
          },
          ${ToDo_list_updateMarkAllMutation.getFragment('ToDos')},
        },
        ToDo_TotalCount,
        ${ToDo_list_updateMarkAllMutation.getFragment('Viewer')},
        ${ToDo_Item.getFragment('Viewer')},
      }
    `,
  },
});
