/* @flow weak */

import scorePassword_Simple from '../../../../units/urb-account-management/scripts/scorePassword_Simple'

export default function( pass )
{
  return scorePassword_Simple(
    pass,
    5.0, // uniqueLettersAwardUntilRepetitions
    10, // variationAwardCoefficient
  )
}
