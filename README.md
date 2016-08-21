[![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social&maxAge=2592000)](https://twitter.com/CodeFoundries)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![StackShare](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/code-foundries/code-foundries)


# Universal Relay Boilerplate (URB)
Boilerplate + examples for React Native (iOS, Android), React (isomorphic, Material-UI), Relay, GraphQL, JWT, Node.js, Apache Cassandra, other databases.


[Project Overview](http://codefoundries.com/products/UniversalRelayBoilerplate.html).

[Project Details](http://codefoundries.com/developer/rebar/).

[Live demo](http://universal-relay-boilerplate.herokuapp.com/). Live demo is broken pending fixing [#198](https://github.com/codefoundries/UniversalRelayBoilerplate/issues/198).



# Updates and Announcements

Please follow [@CodeFoundries](https://twitter.com/CodeFoundries) and [our blog](http://codefoundries.com/blog/) if you are interested in news about the boilerplate.



# Technologies used in Rebar and Universal Relay Boilerplate

For the most up to date list of technologies used please go to [CodeFoundries.com](http://codefoundries.com/developer/rebar/technologies-used.html).

## Client side

| **Technology** | **Description**|
|----------------|----------------|
| [React JS](https://facebook.github.io/react/)                                | Library for building Single Page Applications and apps. Often called the 'V' in the MVC model. |
| [react-router](https://github.com/reactjs/react-router)         | React Router keeps your UI in sync with the URL. It has a simple API with powerful features like lazy code loading, dynamic route matching, and location transition handling built right in. Make the URL your first thought, not an after-thought. |
| [React Native](https://facebook.github.io/react-native/)                        | React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. |
| [react-native-router-flux](https://github.com/aksonov/react-native-router-flux) | Router for React Native based on new React Native Navigation API. |
| [Relay](https://facebook.github.io/relay/)                                      | A Javascript framework for building data-driven react applications. |
| [Material UI](http://www.material-ui.com/)                      | Library for implementing [Material Design](https://www.google.com/design/spec/material-design/introduction.html) in React. All user interface in this kit is built exclusively with Material UI components. |
| [material-ui-country-flags](https://github.com/codefoundries/material-ui-country-flags) | Library with flag icons for Material-UI, used for the language selector. |
| [material-ui-credit-card-icons](https://github.com/codefoundries/material-ui-credit-card-icons) | Library with icons for all major credit cards. |

## Server side

| **Technology** | **Description**|
|----------------|----------------|
| [Node.js](https://nodejs.org/en/)                               | Event-driven, non-blocking I/O runtime based on JavaScript that is lightweight and efficient. |
| [GraphQL](http://graphql.org/docs/getting-started/)             | A query language created by Facebook in 2012 for describing the capabilities and requirements of data models for client‐server applications. |
| [GraphiQL](https://github.com/graphql/graphiql)                 | An graphical interactive in-browser GraphQL IDE. It allows to test the entire schema provided by GraphQL and can be an excellent tool for exploring the boilerplate, as well as a part of applications built on top of it. |
| [Express GraphQL](https://github.com/graphql/express-graphql)   | A Node.js express library that allows the creation of GraphQL servers. |
| [Isomorphic Relay](https://github.com/denvned/isomorphic-relay) | Adds server side rendering support to React Relay. The boilerplate fully utilizes this library. |
| [Data Loader](https://github.com/facebook/dataloader)           | Generic utility to be used as part of your application's data fetching layer to provide a consistent API over various backends and reduce requests to those backends via batching and caching. |
| [Apache Cassandra](http://cassandra.apache.org/)                | The right choice when you need scalability and high availability without compromising performance. Linear scalability and proven fault-tolerance on commodity hardware or cloud infrastructure make it the perfect platform for mission-critical data. Cassandra's support for replicating across multiple datacenters is best-in-class, providing lower latency for your users and the peace of mind of knowing that you can survive regional outages. |
| [JWT](https://jwt.io/)                                          | JSON Web Tokens is an industry standard [RFC 7519](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. |
| [React Helmet](https://github.com/nfl/react-helmet)             | Reusable React component will manage all of your changes to the document head with support for document title, meta, link, script, and base tags. |

## Development tools

| **Technology** | **Description**|
|----------------|----------------|
| [Flow](http://flowtype.org/)                                    | Static type checker, designed to find type errors in JavaScript programs. |
| [ESLint](http://eslint.org/)                                    | Pluggable linting utility for JavaScript and JSX. |
| [Babel](http://babeljs.io)                                      | Compiles ES6/ES7 to ES5. Allows using features from ES6 and ES7 today. Also, used by Relay. |
| [Webpack](http://webpack.github.io)                             | Bundles npm packages and the application Java Script into a single file. Includes hot reloading via [react-transform-hmr](https://www.npmjs.com/package/react-transform-hmr). Also, Webpack can bundle any required CSS. |
| [NPM Scripts](https://docs.npmjs.com/misc/scripts)              | Glues all this together in a handy automated build. |



# Development Setup

For the most up to date setup instructions please go to [CodeFoundries.com](http://codefoundries.com/developer/rebar/technologies-used.html).

## Initial Development Machine Setup

The setup is for OS X only. Prerequisites:

* **Install [Node.js](https://nodejs.org)**.  
* **Install [Git](https://git-scm.com/downloads)**.
* **Make sure** that Node.js is at least version 5.0 and NPM is at least version 3.
* **In order to speed up NPM** run `npm set progress=false`. This [speeds up NPM significantly](https://twitter.com/gavinjoyce/status/691773956144119808).

## Initial Project setup on local machine

In order to set up the project locally, perform the following steps:

* **Clone from github.** `git clone https://github.com/codefoundries/UniversalRelayBoilerplate`.
* **Install node packages.** `npm install`. You will see errors like `Error: ENOENT: no such file or directory, open '.env'.`. They can be ignored.
* **Perform initial setup.** `npm run setup-local`.
* **Specify JWT_SECRET** by modifying the `.env` file. This step can be skipped if you do not care about the actual security and simply want to get the project running.

## Running in development mode

Two separate servers need to be started. The first one is the actual application in development mode. The second server is the webpack server which is to be run at all times for hot replace. This can be done with one command.

* Start application HTTP and Webpack server: `npm run dev`.

To open the app:

* Navigate to `http://localhost:4444`, unless you specified a different IP and/or port either manually or by using `npm run update-ip`.

## Configuring to use Cassandra

* Install and configure Cassandra following the steps in [Cassandra Installation on Mac](http://codefoundries.com/developer/cassandra/cassandra-installation-mac.html).
* Verify that the name of the database in `/.env` is the name of the database you want.
* Modify [defaultPersister.js](https://github.com/codefoundries/UniversalRelayBoilerplate/blob/master/configuration/graphql/defaultPersister.js) to use Cassandra persister in the following way:

```JavaScript
import PersisterCassandra from '../../units/urb-persister-cassandra/graphql/PersisterCassandra'
const defaultPersister = new PersisterCassandra( )

export default defaultPersister
```

* Create the database with `npm run setup-database`.

Instructions for other databases will be added as support for those is added.


# Further Details

We keep the information about the Universal Relay Boilerplate and Rebar updated on our website:

## Additional Information About the Boilerplate

* [Environment Variables Configuration](http://codefoundries.com/developer/rebar/configuration-environment-variables.html).
* [Customizing Material-UI Look and Feel](http://codefoundries.com/developer/rebar/configuration-material-ui.html).
* [Configuration Folder](http://codefoundries.com/developer/rebar/configuration-folder.html).
* [NPM Tasks](http://codefoundries.com/developer/rebar/npm-tasks.html).
* [Project Structure](http://codefoundries.com/developer/rebar/project-structure.html).
* [Troubleshooting](http://codefoundries.com/developer/rebar/troubleshooting.html).

## Architecture Details

The following documents explain in detail certain aspects of the architecture in depth:

* [Cassandra, meet Relay. Relay, meet Cassandra](http://codefoundries.com/developer/cassandra/cassandra-meet-relay.html). Explanation of how Cassandra and Express GraphQL work together.
* [Isomorphic React Relay](http://codefoundries.com/developer/single-page-application/isomorphic-react-relay.html). Explains the approach to isomorphism taken in implementing the starter kit.
* [Isomorphic Server Variables](http://codefoundries.com/developer/single-page-application/isomorphic-server-variables.html). Using variables and settings in an isomorphic application - client rendering, server rendering.
* [SEO Using Isomorphic Application With Relay and Helmet](http://codefoundries.com/developer/single-page-application/seo-isomorphic-react-helmet.html). How to make SEO-friendly pages with React, Relay and Helmet.

## Additional resources

The following documents, while not explicitly related to the boilerplate, can be useful while running and modifying the kit:

* [Cassandra Cheatsheet](http://codefoundries.com/developer/cassandra/cassandra-cheatsheet.html). List of common commands in CQL.
* [Cassandra Installation on Mac](http://codefoundries.com/developer/cassandra/cassandra-installation-mac.html). Simple steps for setting up an instance of Cassandra for development.
* [Git Cheatsheet](http://codefoundries.com/developer/git/git-cheatsheet.html). Some useful git commands.
* [React Cheatsheet](http://codefoundries.com/developer/react/react-cheatsheet.html). Techniques for working with React used in the starter kit.
* [Where to Store Your JWTs - Cookies vs HTML5 Web Storage](https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage/). Explains the advantages of using HTTP only cookies.
