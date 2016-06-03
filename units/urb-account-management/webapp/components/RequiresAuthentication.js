import React from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';


let authenticationRequiredCallback = null;

export function registerAuthenticationRequiredCallback( cb )
{
  authenticationRequiredCallback = cb;
}

export class RequiresAuthenticationNotice extends React.Component
{
  componentDidMount( )
  {
    if( authenticationRequiredCallback )
       authenticationRequiredCallback( );
  }

  render( )
  {
    return(
      <Card>
        <CardHeader title="Please log in" />
        <CardText>
          Accessing this area of the application requires you to be logged in.
        </CardText>
      </Card>
    );
  }
}
