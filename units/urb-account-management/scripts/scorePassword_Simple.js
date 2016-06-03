/* @flow weak */

export default function scorePassword_Simple(
  pass,
  uniqueLettersAwardUntilRepetitions,
  variationAwardCoefficient,
)
{
  let score = 0
  if (!pass)
      return 0

  // award every unique letter until 5 repetitions
  let letters = new Object()
  for (var i=0; i<pass.length; i++)
  {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1
      score += uniqueLettersAwardUntilRepetitions / letters[pass[i]]
  }

  // bonus points for mixing it up
  let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass),
  }

  let variationCount = 0
  for (var check in variations)
      variationCount += (variations[check] == true) ? 1 : 0

  score += (variationCount - 1) * variationAwardCoefficient

  return score
}
