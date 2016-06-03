/* @flow weak */

import React from 'react';

import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance'; // Speak in senate
import ActionAccessibility from 'material-ui/svg-icons/action/accessibility'; // Exercise
import ActionDoneAll from 'material-ui/svg-icons/action/done-all'; // Get things done
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'; // Play the stock market
import ContentCreate from 'material-ui/svg-icons/content/create'; // Write poems
import HardwareHeadset from 'material-ui/svg-icons/hardware/headset'; // Listen to music
import ImageLandscape from 'material-ui/svg-icons/image/landscape'; // Hike

export default function( theType: number )
{
  let itemIcon;
  if( theType == 1 ) itemIcon = <ActionAccountBalance />; // Speak in senate
  else if( theType == 2 ) itemIcon = <ActionAccessibility />; // Exercise
  else if( theType == 3 ) itemIcon = <ActionDoneAll />; // Get things done
  else if( theType == 4 ) itemIcon = <ActionTrendingUp />; // Speak in senate
  else if( theType == 5 ) itemIcon = <ActionTrendingUp />; // Play the stock market
  else if( theType == 6 ) itemIcon = <ContentCreate />; // Write poems
  else if( theType == 7 ) itemIcon = <HardwareHeadset />; // Listen to music
  else if( theType == 8 ) itemIcon = <ImageLandscape />; // Hike

  return itemIcon;
}
