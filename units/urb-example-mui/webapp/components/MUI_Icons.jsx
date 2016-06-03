/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';

import ActionAccessibility from 'material-ui/svg-icons/action/accessibility';
import ActionAccessible from 'material-ui/svg-icons/action/accessible';
import ActionAccountBalanceWallet from 'material-ui/svg-icons/action/account-balance-wallet';
import ActionAccountBalance from 'material-ui/svg-icons/action/account-balance';
import ActionAccountBox from 'material-ui/svg-icons/action/account-box';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionAddShoppingCart from 'material-ui/svg-icons/action/add-shopping-cart';
import ActionAlarmAdd from 'material-ui/svg-icons/action/alarm-add';
import ActionAlarmOff from 'material-ui/svg-icons/action/alarm-off';
import ActionAlarmOn from 'material-ui/svg-icons/action/alarm-on';
import ActionAlarm from 'material-ui/svg-icons/action/alarm';
import ActionAllOut from 'material-ui/svg-icons/action/all-out';
import ActionAndroid from 'material-ui/svg-icons/action/android';
import ActionAnnouncement from 'material-ui/svg-icons/action/announcement';
import ActionAspectRatio from 'material-ui/svg-icons/action/aspect-ratio';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionAssignmentInd from 'material-ui/svg-icons/action/assignment-ind';
import ActionAssignmentLate from 'material-ui/svg-icons/action/assignment-late';
import ActionAssignmentReturn from 'material-ui/svg-icons/action/assignment-return';
import ActionAssignmentReturned from 'material-ui/svg-icons/action/assignment-returned';
import ActionAssignmentTurnedIn from 'material-ui/svg-icons/action/assignment-turned-in';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionAutorenew from 'material-ui/svg-icons/action/autorenew';
import ActionBackup from 'material-ui/svg-icons/action/backup';
import ActionBook from 'material-ui/svg-icons/action/book';
import ActionBookmarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import ActionBookmark from 'material-ui/svg-icons/action/bookmark';
import ActionBugReport from 'material-ui/svg-icons/action/bug-report';
import ActionBuild from 'material-ui/svg-icons/action/build';
import ActionCached from 'material-ui/svg-icons/action/cached';
import ActionCameraEnhance from 'material-ui/svg-icons/action/camera-enhance';
import ActionCardGiftcard from 'material-ui/svg-icons/action/card-giftcard';
import ActionCardMembership from 'material-ui/svg-icons/action/card-membership';
import ActionCardTravel from 'material-ui/svg-icons/action/card-travel';
import ActionChangeHistory from 'material-ui/svg-icons/action/change-history';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import ActionChromeReaderMode from 'material-ui/svg-icons/action/chrome-reader-mode';
import ActionClass from 'material-ui/svg-icons/action/class';
import ActionCode from 'material-ui/svg-icons/action/code';
import ActionCompareArrows from 'material-ui/svg-icons/action/compare-arrows';
import ActionCopyright from 'material-ui/svg-icons/action/copyright';
import ActionCreditCard from 'material-ui/svg-icons/action/credit-card';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ActionDateRange from 'material-ui/svg-icons/action/date-range';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ActionDescription from 'material-ui/svg-icons/action/description';
import ActionDns from 'material-ui/svg-icons/action/dns';
import ActionDoneAll from 'material-ui/svg-icons/action/done-all';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionDonutLarge from 'material-ui/svg-icons/action/donut-large';
import ActionDonutSmall from 'material-ui/svg-icons/action/donut-small';

class MUI_Icons extends React.Component
{
  render( )
  {
    return (
      <div>
        <Card>
          <List>
            <ListItem key="0" primaryText="ActionAccessibility" secondaryText="material-ui/svg-icons/action/accessibility" leftIcon={<ActionAccessibility />} />
            <Divider inset={true} />
            <ListItem key="1" primaryText="ActionAccessible" secondaryText="material-ui/svg-icons/action/accessible" leftIcon={<ActionAccessible />} />
            <Divider inset={true} />
            <ListItem key="2" primaryText="ActionAccountBalanceWallet" secondaryText="material-ui/svg-icons/action/account-balance-wallet" leftIcon={<ActionAccountBalanceWallet />} />
            <Divider inset={true} />
            <ListItem key="3" primaryText="ActionAccountBalance" secondaryText="material-ui/svg-icons/action/account-balance" leftIcon={<ActionAccountBalance />} />
            <Divider inset={true} />
            <ListItem key="4" primaryText="ActionAccountBox" secondaryText="material-ui/svg-icons/action/account-box" leftIcon={<ActionAccountBox />} />
            <Divider inset={true} />
            <ListItem key="5" primaryText="ActionAccountCircle" secondaryText="material-ui/svg-icons/action/account-circle" leftIcon={<ActionAccountCircle />} />
            <Divider inset={true} />
            <ListItem key="6" primaryText="ActionAddShoppingCart" secondaryText="material-ui/svg-icons/action/add-shopping-cart" leftIcon={<ActionAddShoppingCart />} />
            <Divider inset={true} />
            <ListItem key="7" primaryText="ActionAlarmAdd" secondaryText="material-ui/svg-icons/action/alarm-add" leftIcon={<ActionAlarmAdd />} />
            <Divider inset={true} />
            <ListItem key="8" primaryText="ActionAlarmOff" secondaryText="material-ui/svg-icons/action/alarm-off" leftIcon={<ActionAlarmOff />} />
            <Divider inset={true} />
            <ListItem key="9" primaryText="ActionAlarmOn" secondaryText="material-ui/svg-icons/action/alarm-on" leftIcon={<ActionAlarmOn />} />
            <Divider inset={true} />
            <ListItem key="10" primaryText="ActionAlarm" secondaryText="material-ui/svg-icons/action/alarm" leftIcon={<ActionAlarm />} />
            <Divider inset={true} />
            <ListItem key="11" primaryText="ActionAllOut" secondaryText="material-ui/svg-icons/action/all-out" leftIcon={<ActionAllOut />} />
            <Divider inset={true} />
            <ListItem key="12" primaryText="ActionAndroid" secondaryText="material-ui/svg-icons/action/android" leftIcon={<ActionAndroid />} />
            <Divider inset={true} />
            <ListItem key="13" primaryText="ActionAnnouncement" secondaryText="material-ui/svg-icons/action/announcement" leftIcon={<ActionAnnouncement />} />
            <Divider inset={true} />
            <ListItem key="14" primaryText="ActionAspectRatio" secondaryText="material-ui/svg-icons/action/aspect-ratio" leftIcon={<ActionAspectRatio />} />
            <Divider inset={true} />
            <ListItem key="15" primaryText="ActionAssessment" secondaryText="material-ui/svg-icons/action/assessment" leftIcon={<ActionAssessment />} />
            <Divider inset={true} />
            <ListItem key="16" primaryText="ActionAssignmentInd" secondaryText="material-ui/svg-icons/action/assignment-ind" leftIcon={<ActionAssignmentInd />} />
            <Divider inset={true} />
            <ListItem key="17" primaryText="ActionAssignmentLate" secondaryText="material-ui/svg-icons/action/assignment-late" leftIcon={<ActionAssignmentLate />} />
            <Divider inset={true} />
            <ListItem key="18" primaryText="ActionAssignmentReturn" secondaryText="material-ui/svg-icons/action/assignment-return" leftIcon={<ActionAssignmentReturn />} />
            <Divider inset={true} />
            <ListItem key="19" primaryText="ActionAssignmentReturned" secondaryText="material-ui/svg-icons/action/assignment-returned" leftIcon={<ActionAssignmentReturned />} />
            <Divider inset={true} />
            <ListItem key="20" primaryText="ActionAssignmentTurnedIn" secondaryText="material-ui/svg-icons/action/assignment-turned-in" leftIcon={<ActionAssignmentTurnedIn />} />
            <Divider inset={true} />
            <ListItem key="21" primaryText="ActionAssignment" secondaryText="material-ui/svg-icons/action/assignment" leftIcon={<ActionAssignment />} />
            <Divider inset={true} />
            <ListItem key="22" primaryText="ActionAutorenew" secondaryText="material-ui/svg-icons/action/autorenew" leftIcon={<ActionAutorenew />} />
            <Divider inset={true} />
            <ListItem key="23" primaryText="ActionBackup" secondaryText="material-ui/svg-icons/action/backup" leftIcon={<ActionBackup />} />
            <Divider inset={true} />
            <ListItem key="24" primaryText="ActionBook" secondaryText="material-ui/svg-icons/action/book" leftIcon={<ActionBook />} />
            <Divider inset={true} />
            <ListItem key="25" primaryText="ActionBookmarkBorder" secondaryText="material-ui/svg-icons/action/bookmark-border" leftIcon={<ActionBookmarkBorder />} />
            <Divider inset={true} />
            <ListItem key="26" primaryText="ActionBookmark" secondaryText="material-ui/svg-icons/action/bookmark" leftIcon={<ActionBookmark />} />
            <Divider inset={true} />
            <ListItem key="27" primaryText="ActionBugReport" secondaryText="material-ui/svg-icons/action/bug-report" leftIcon={<ActionBugReport />} />
            <Divider inset={true} />
            <ListItem key="28" primaryText="ActionBuild" secondaryText="material-ui/svg-icons/action/build" leftIcon={<ActionBuild />} />
            <Divider inset={true} />
            <ListItem key="29" primaryText="ActionCached" secondaryText="material-ui/svg-icons/action/cached" leftIcon={<ActionCached />} />
            <Divider inset={true} />
            <ListItem key="30" primaryText="ActionCameraEnhance" secondaryText="material-ui/svg-icons/action/camera-enhance" leftIcon={<ActionCameraEnhance />} />
            <Divider inset={true} />
            <ListItem key="31" primaryText="ActionCardGiftcard" secondaryText="material-ui/svg-icons/action/card-giftcard" leftIcon={<ActionCardGiftcard />} />
            <Divider inset={true} />
            <ListItem key="32" primaryText="ActionCardMembership" secondaryText="material-ui/svg-icons/action/card-membership" leftIcon={<ActionCardMembership />} />
            <Divider inset={true} />
            <ListItem key="33" primaryText="ActionCardTravel" secondaryText="material-ui/svg-icons/action/card-travel" leftIcon={<ActionCardTravel />} />
            <Divider inset={true} />
            <ListItem key="34" primaryText="ActionChangeHistory" secondaryText="material-ui/svg-icons/action/change-history" leftIcon={<ActionChangeHistory />} />
            <Divider inset={true} />
            <ListItem key="35" primaryText="ActionCheckCircle" secondaryText="material-ui/svg-icons/action/check-circle" leftIcon={<ActionCheckCircle />} />
            <Divider inset={true} />
            <ListItem key="36" primaryText="ActionChromeReaderMode" secondaryText="material-ui/svg-icons/action/chrome-reader-mode" leftIcon={<ActionChromeReaderMode />} />
            <Divider inset={true} />
            <ListItem key="37" primaryText="ActionClass" secondaryText="material-ui/svg-icons/action/class" leftIcon={<ActionClass />} />
            <Divider inset={true} />
            <ListItem key="38" primaryText="ActionCode" secondaryText="material-ui/svg-icons/action/code" leftIcon={<ActionCode />} />
            <Divider inset={true} />
            <ListItem key="39" primaryText="ActionCompareArrows" secondaryText="material-ui/svg-icons/action/compare-arrows" leftIcon={<ActionCompareArrows />} />
            <Divider inset={true} />
            <ListItem key="40" primaryText="ActionCopyright" secondaryText="material-ui/svg-icons/action/copyright" leftIcon={<ActionCopyright />} />
            <Divider inset={true} />
            <ListItem key="41" primaryText="ActionCreditCard" secondaryText="material-ui/svg-icons/action/credit-card" leftIcon={<ActionCreditCard />} />
            <Divider inset={true} />
            <ListItem key="42" primaryText="ActionDashboard" secondaryText="material-ui/svg-icons/action/dashboard" leftIcon={<ActionDashboard />} />
            <Divider inset={true} />
            <ListItem key="43" primaryText="ActionDateRange" secondaryText="material-ui/svg-icons/action/date-range" leftIcon={<ActionDateRange />} />
            <Divider inset={true} />
            <ListItem key="44" primaryText="ActionDelete" secondaryText="material-ui/svg-icons/action/delete" leftIcon={<ActionDelete />} />
            <Divider inset={true} />
            <ListItem key="45" primaryText="ActionDescription" secondaryText="material-ui/svg-icons/action/description" leftIcon={<ActionDescription />} />
            <Divider inset={true} />
            <ListItem key="46" primaryText="ActionDns" secondaryText="material-ui/svg-icons/action/dns" leftIcon={<ActionDns />} />
            <Divider inset={true} />
            <ListItem key="47" primaryText="ActionDoneAll" secondaryText="material-ui/svg-icons/action/done-all" leftIcon={<ActionDoneAll />} />
            <Divider inset={true} />
            <ListItem key="48" primaryText="ActionDone" secondaryText="material-ui/svg-icons/action/done" leftIcon={<ActionDone />} />
            <Divider inset={true} />
            <ListItem key="49" primaryText="ActionDonutLarge" secondaryText="material-ui/svg-icons/action/donut-large" leftIcon={<ActionDonutLarge />} />
            <Divider inset={true} />
            <ListItem key="50" primaryText="ActionDonutSmall" secondaryText="material-ui/svg-icons/action/donut-small" leftIcon={<ActionDonutSmall />} />
            <Divider inset={true} />
          </List>
        </Card>
      </div>
    )
  }
}

export default Relay.createContainer(MUI_Icons, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        User_IsAnonymous,
      }
    `,
  },
});
