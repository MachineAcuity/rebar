import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native'
import React, { Component, PropTypes } from 'react'
import Relay from 'react-relay'

import NetworkLayer from '../NetworkLayer'

class RelayComponentRenderer extends Component
{
  static propTypes = {
    component: PropTypes.func,
    renderLoading: PropTypes.func,
    renderError: PropTypes.func,
    navigationState: PropTypes.object,
  }

  renderLoading( )
  {
    return <View>
      <Text>Loading...</Text>
    </View>
  }

  renderError( error, retry )
  {
    return <View style={{padding: 30}}>
      <Text>Error while fetching data from the server</Text>
      <TouchableHighlight onPress={retry}>
        <Text>Retry?</Text>
      </TouchableHighlight>
    </View>
  }

  render( )
  {
    let queryConfig

    if( this.props.navigationState.queries )
      queryConfig = {
        queries: this.props.navigationState.queries,
        params: { ...(this.props) }, // TODO x7000 not sure if it is correct to pass all the data, find the way extract only needed variables
        name: `rnrf-relay-renderer_${this.props.navigationState.key}_route`, // construct route name based on navState key
      }
    else if( this.props.navigationState.route )
    {
      const routeData = JSON.parse( this.props.navigationState.data )
      queryConfig = new this.props.navigationState.route( routeData )
    }
    else
      throw new Error( "Neither queries nor route specified" )

    return <Relay.Renderer
      Container={this.props.component}
      queryConfig={ queryConfig }
      environment={ this.context.environment }
      render={ ( {done, error, props, retry, stale} ) =>
      {
        if (error) {
          return (this.props.renderError || this.renderError)(error, retry);
        }

        if (props) {
          // render component itself
          return <this.props.component {...props} />;
        }

        // render loading
        return (this.props.renderLoading || this.renderLoading)(this.props.navigationState)
      } }
    />
  }
}

RelayComponentRenderer.contextTypes = {
  environment: Relay.PropTypes.Environment
};

export default ( moduleProps ) => ( Component ) =>
  !Relay.isContainer(Component)
  ?
    Component // not a Relay container, return component itself
  :
    (props) => // relay container - wrap it with renderer
      <RelayComponentRenderer
        {...moduleProps}
        {...props}
        component={Component}
      />
