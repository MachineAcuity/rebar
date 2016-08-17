const fs = require('fs');
const rrs = require('recursive-readdir-sync');

let importsSource = [ ];
let cardItemsSource = [ ];
let key = 0;

rrs('./node_modules/material-ui/src/svg-icons/').forEach(function(file) {
	if( file !== 'node_modules/material-ui/src/svg-icons/index-generator.js' && file !== 'node_modules/material-ui/src/svg-icons/index.js' )
	{
		let fileLines = fs.readFileSync(file, 'utf8').split('\n');
		let index = 0, found = false;

		// In order to display all the icons, comment out the following:
		if( key > 50 ) return;

		while(found === false && index < fileLines.length)
		{
			if(fileLines[index].indexOf('export default ') > -1)
			{
        let fileName = file.substring(0, file.length - 4).replace( 'node_modules/', '' ).replace( 'src/svg-icons', 'lib/svg-icons' );
				let moduleName = fileLines[index].replace('export default ', '').replace(';','').trim( );

        importsSource.push( `import ${moduleName} from '${fileName}';` );
        cardItemsSource.push( `            <ListItem key="${key++}" primaryText="${moduleName}" secondaryText="${fileName}" leftIcon={<${moduleName} />} />` );
        cardItemsSource.push( `            <Divider inset={true} />` );

				found = true;
			}
			else
				index++;
		}
	}
});

let sourceCode = [
	`/* @flow weak */`,
	`/* eslint react/prop-types: 0 */`,
	``,
  `import React from 'react';`,
  `import Relay from 'react-relay';`,
  ``,
  `import {Card} from 'material-ui/Card';`,
  `import {List, ListItem} from 'material-ui/List';`,
  `import Divider from 'material-ui/Divider';`,
  ``,
  importsSource.join( '\n' ),
  // `import IconNotificationsEventAvailable from 'material-ui/svg-icons/notification/event-available';`,
  ``,
  `class MUI_Icons extends React.Component`,
  `{`,
  `  render( )`,
  `  {`,
  `    return (`,
  `      <div>`,
  `        <Card>`,
  `          <List>`,
  cardItemsSource.join( '\n' ),
  // `            <ListItem key="2" primaryText="IconNotificationsEventAvailable" leftIcon={<IconNotificationsEventAvailable />} />`,
  // `            <Divider inset={true} />`,
  `          </List>`,
  `        </Card>`,
  `      </div>`,
  `    )`,
  `  }`,
  `}`,
  ``,
  `export default Relay.createContainer(MUI_Icons, {`,
  `  fragments: {`,
  `    Viewer: () => Relay.QL\``,
  `      fragment on Viewer {`,
  `        User_IsAnonymous,`,
  `      }`,
  `    \`,`,
  `  },`,
  `});`,
];

fs.writeFileSync('./units/urb-example-mui/webapp/components/MUI_Icons', sourceCode.join('\n'));
