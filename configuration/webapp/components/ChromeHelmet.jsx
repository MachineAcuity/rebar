/* @flow weak */
/* eslint react/prop-types: 0 */

import Helmet from "react-helmet"
import React from 'react'


export default class ChromeHelmet extends React.Component
{
  render( )
  {
    return (
      <Helmet
        title="Universal Relay Boilerplate"
        meta={ [
          { name : "description", content: "Boilerplate + examples for React Native (iOS, Android), React (isomorphic, Material-UI), Relay, GraphQL, JWT, Node.js, Apache Cassandra" },
        ] }
      />
    )
  }
}
