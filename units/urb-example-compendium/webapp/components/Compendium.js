/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';

import Compendium_updateMutation from '../../relay/Compendium_updateMutation';


class Compendium extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  constructor( props )
  {
    super( props );

    const node = this.props.Viewer.compendiums.edges[ 0 ].node;

    this.state = {
      Compendium_RangedNumber_error:      "",
      Compendium_FirstTextInput:          node.Compendium_FirstTextInput,
      Compendium_RangedNumber:            node.Compendium_RangedNumber,
      Compendium_Excitement:              node.Compendium_Excitement,
      Compendium_FollowUpQuestion:        node.Compendium_FollowUpQuestion,
      Compendium_FavoriteMammal:          node.Compendium_FavoriteMammal,
      Compendium_FavoriteMammalOtherText: node.Compendium_FavoriteMammalOtherText,
      Compendium_LastText:                node.Compendium_LastText,
      Compendium_LikedSunset_Ocean:       node.Compendium_LikedSunset_Ocean,
      Compendium_LikedSunset_Lake:        node.Compendium_LikedSunset_Lake,
      Compendium_LikedSunset_Mountains:   node.Compendium_LikedSunset_Mountains,
      Compendium_LikedSunset_Plains:      node.Compendium_LikedSunset_Plains,
      Compendium_LikedSunset_Purple:      node.Compendium_LikedSunset_Purple,
      Compendium_LikedSunset_Green:       node.Compendium_LikedSunset_Green,
      Compendium_LikedSunset_Other:       node.Compendium_LikedSunset_Other,
      Compendium_LikedSunset_OtherText:   node.Compendium_LikedSunset_OtherText,
    };
  }

  _handleUpdate = ( Compendium ) =>
  {
    this.context.relay.commitUpdate(
      new Compendium_updateMutation( {
        Compendium:                         Compendium,
        Compendium_FirstTextInput:          this.state.Compendium_FirstTextInput,
        Compendium_RangedNumber:            this.state.Compendium_RangedNumber,
        Compendium_Excitement:              this.state.Compendium_Excitement,
        Compendium_FollowUpQuestion:        this.state.Compendium_FollowUpQuestion,
        Compendium_FavoriteMammal:          this.state.Compendium_FavoriteMammal,
        Compendium_FavoriteMammalOtherText: this.state.Compendium_FavoriteMammalOtherText,
        Compendium_LastText:                this.state.Compendium_LastText,
        Compendium_LikedSunset_Ocean:       this.state.Compendium_LikedSunset_Ocean,
        Compendium_LikedSunset_Lake:        this.state.Compendium_LikedSunset_Lake,
        Compendium_LikedSunset_Mountains:   this.state.Compendium_LikedSunset_Mountains,
        Compendium_LikedSunset_Plains:      this.state.Compendium_LikedSunset_Plains,
        Compendium_LikedSunset_Purple:      this.state.Compendium_LikedSunset_Purple,
        Compendium_LikedSunset_Green:       this.state.Compendium_LikedSunset_Green,
        Compendium_LikedSunset_Other:       this.state.Compendium_LikedSunset_Other,
        Compendium_LikedSunset_OtherText:   this.state.Compendium_LikedSunset_OtherText,
      } )
    );
  };

  _handle_onChange_Compendium_FirstTextInput = ( event ) =>
  {
      this.setState( { Compendium_FirstTextInput: event.target.value } );
  };

  _handle_onChange_Compendium_RangedNumber = ( event ) =>
  {
    const value = event.target.value;
    let valueInt = parseInt( value, 10 );

    if( isNaN( valueInt ) )
      valueInt = 0;

    this.setState( { Compendium_RangedNumber: valueInt } );

    let errorText = "Enter a number between 18 and 65";

    if( value == valueInt )
      if( valueInt >= 18 && valueInt <= 65 )
        errorText = "";

    this.setState( { Compendium_RangedNumber_error: errorText } );
  };

  _handle_onChange_Compendium_Excitement = ( event, index, value ) =>
  {
    this.setState( { Compendium_Excitement: value } );
  };

  _handle_onChange_Compendium_LastText = ( event ) =>
  {
    this.setState( { Compendium_LastText: event.target.value } );
  };

  _handle_onChange_Compendium_FollowUpQuestion = ( event ) =>
  {
    this.setState( { Compendium_FollowUpQuestion: event.target.value } );
  };

  _handle_onChange_Compendium_FavoriteMammal = ( event, index, value ) =>
  {
    this.setState( { Compendium_FavoriteMammal: value } );
  };

  _handle_onChange_Compendium_FavoriteMammalOtherText = ( event ) =>
  {
    this.setState( { Compendium_FavoriteMammalOtherText: event.target.value } );
  };

  _handle_onChange_Compendium_LikedSunset_Ocean = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Ocean: value } );
  };

  _handle_onChange_Compendium_LikedSunset = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Lake: value } );
  };

  _handle_onChange_Compendium_LikedSunset_Mountains = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Mountains: value } );
  };

  _handle_onChange_Compendium_LikedSunset_Plains = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Plains: value } );
  };

  _handle_onChange_Compendium_LikedSunset_Purple = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Purple: value } );
  };

  _handle_onChange_Compendium_LikedSunset_Green = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Green: value } );
  };

  _handle_onChange_Compendium_LikedSunset_Other = ( event, value ) =>
  {
    this.setState( { Compendium_LikedSunset_Other: value } );
  };

  _handle_onChange_Compendium_LikedSunset_OtherText = ( event ) =>
  {
    this.setState( { Compendium_LikedSunset_OtherText: event.target.value } );
  };

  render( )
  {
    // Determine error text, since we already have the errors in state
    let formErrorText = "";
    if(
      this.state.Compendium_RangedNumber_error != ""
    )
      formErrorText = "There are errors";

    const edge = this.props.Viewer.compendiums.edges[ 0 ];

    return (
      <Card key={ edge.node.id }>
        <CardHeader
          title="User Compendium"
          subtitle="One to one properties for a user retrieved from an edge"
        />
        <CardText>
          <div>
            <TextField
              value={ this.state.Compendium_FirstTextInput }
              floatingLabelText="When we do a Haiku"
              fullWidth={ true }
              onChange={ this._handle_onChange_Compendium_FirstTextInput }
            />
            <TextField
              value={ this.state.Compendium_RangedNumber }
              floatingLabelText="A number between eighteen and sixty"
              fullWidth={ true }
              errorText={ this.state.Compendium_RangedNumber_error }
              onChange={ this._handle_onChange_Compendium_RangedNumber }
            />
            <SelectField
              value={ this.state.Compendium_FavoriteMammal }
              floatingLabelText="Which one is your favorite water mammal?"
              fullWidth={ true }
              onChange={ this._handle_onChange_Compendium_FavoriteMammal }
            >
              <MenuItem value={1} primaryText="Dolphin"/>
              <MenuItem value={2} primaryText="Whale"/>
              <MenuItem value={3} primaryText="Manatee"/>
              <MenuItem value={4} primaryText="Other"/>
            </SelectField>
            { ( this.state.Compendium_FavoriteMammal != 4 ) ||
              <TextField
                value={ this.state.Compendium_FavoriteMammalOtherText }
                fullWidth={ true }
                onChange={ this._handle_onChange_Compendium_FavoriteMammalOtherText }
              />
            }
            <TextField
              value={ this.state.Compendium_FollowUpQuestion }
              floatingLabelText="The middle has"
              fullWidth={ true }
              onChange={ this._handle_onChange_Compendium_FollowUpQuestion }
            />
            <SelectField
              value={ this.state.Compendium_Excitement }
              floatingLabelText="How excited are you about Relay?"
              fullWidth={ true }
              onChange={ this._handle_onChange_Compendium_Excitement }
            >
              <MenuItem value={1} primaryText="Ambivalent, just meh" label="Ambivalent"/>
              <MenuItem value={2} primaryText="Cautious, been burnt before" label="Cautious"/>
              <MenuItem value={3} primaryText="Optimistic, Facebook made it!" label="Optimistic"/>
              <MenuItem value={4} primaryText="Excited, I can do so much with it" label="Excited"/>
              <MenuItem value={5} primaryText="Enthusiastic, great productivity" label="Enthusiastic"/>
              <MenuItem value={6} primaryText="Ecstatic, death to REST!" label="Ecstatic"/>
              <MenuItem value={7} primaryText="Riled Up, can't wait for 1.0" label="Riled Up"/>
              <MenuItem value={8} primaryText="Mind = Blown, I will become a contributor" label="Mind = Blown"/>
            </SelectField>
            <TextField
              value={ this.state.Compendium_LastText }
              floatingLabelText="More than both the beginning and the end"
              fullWidth={ true }
              onChange={ this._handle_onChange_Compendium_LastText }
            />
            <div>
              What kind of sunsets do you like?
            </div>
            <Checkbox
              label="Over the ocean"
              defaultChecked={ this.state.Compendium_LikedSunset_Ocean }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Ocean }
            />
            <Checkbox
              label="Over a lake"
              defaultChecked={ this.state.Compendium_LikedSunset_Lake }
              onCheck={ this._handle_onChange_Compendium_LikedSunset }
            />
            <Checkbox
              label="From a mountain top"
              defaultChecked={ this.state.Compendium_LikedSunset_Mountains }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Mountains }
            />
            <Checkbox
              label="Over plains"
              defaultChecked={ this.state.Compendium_LikedSunset_Plains }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Plains }
            />
            <Checkbox
              label="Purple"
              defaultChecked={ this.state.Compendium_LikedSunset_Purple }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Purple }
            />
            <Checkbox
              label="Green"
              defaultChecked={ this.state.Compendium_LikedSunset_Green }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Green }
            />
            <Checkbox
              label="Other"
              defaultChecked={ this.state.Compendium_LikedSunset_Other }
              onCheck={ this._handle_onChange_Compendium_LikedSunset_Other }
            />
            { ( ! this.state.Compendium_LikedSunset_Other ) ||
              <TextField
                value={ this.state.Compendium_LikedSunset_OtherText }
                fullWidth={ true }
                onChange={ this._handle_onChange_Compendium_LikedSunset_OtherText }
              />
            }
            <div>
              <RaisedButton
                label="Update"
                secondary={true}
                disabled={ formErrorText != "" }
                onTouchTap={ ( ) => this._handleUpdate( edge.node ) }
              />
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

export default Relay.createContainer( Compendium, {
  fragments: {
    Viewer: ( ) => Relay.QL`
      fragment on Viewer {
        compendiums( first: 1 ){
          edges {
            node {
              id,
              Compendium_FirstTextInput,
              Compendium_RangedNumber,
              Compendium_Excitement,
              Compendium_FollowUpQuestion,
              Compendium_FavoriteMammal,
              Compendium_FavoriteMammalOtherText,
              Compendium_LastText,
              Compendium_LikedSunset_Ocean,
              Compendium_LikedSunset_Lake,
              Compendium_LikedSunset_Mountains,
              Compendium_LikedSunset_Plains,
              Compendium_LikedSunset_Purple,
              Compendium_LikedSunset_Green,
              Compendium_LikedSunset_Other,
              Compendium_LikedSunset_OtherText,
              ${Compendium_updateMutation.getFragment('Compendium')},
            },
          },
        },
      }
    `,
  },
});
