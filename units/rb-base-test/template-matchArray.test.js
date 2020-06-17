import { matchArray } from '../rb-base-universal/template'
import { templTag_arrOr, templTag_arrRep, templTag_arrVar } from '../rb-base-universal/templateTags'

test('equal arrays, condition is arr tag', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'father' } }, { word: { text: 'mother' } } ],
    }),
  ).toEqual({ ixStart: 0, ixStop: 1, match: true, variables: {} })
})

test('equal arrays, condition is arr tag, float', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      float: true,
      template: [ { word: { text: 'father' } }, { word: { text: 'mother' } } ],
    }),
  ).toEqual({ ixStart: 0, ixStop: 1, match: true, variables: {} })
})

test('unequal arrays, criterion is shorter, condition is arr tag', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'father' } } ],
    }),
  ).toEqual({ match: false })
})

test('unequal arrays, criterion is shorter, condition is arr tag, float', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      float: true,
      template: [ { word: { text: 'father' } } ],
    }),
  ).toEqual({ ixStart: 0, ixStop: 0, match: true, variables: {} })
})

test('unequal arrays, criterion is starts later, condition is arr tag', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'mother' } } ],
    }),
  ).toEqual({ match: false })
})

test('unequal arrays, criterion is starts later, condition is arr tag, float', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      float: true,
      template: [ { word: { text: 'mother' } } ],
    }),
  ).toEqual({ ixStart: 1, ixStop: 1, match: true, variables: {} })
})

test('unequal arrays, criterion is encased, condition is arr tag', () => {
  expect(
    matchArray(
      [ { word: { text: 'father' } }, { word: { text: 'child' } }, { word: { text: 'mother' } } ],
      { template: [ { word: { text: 'child' } } ] },
    ),
  ).toEqual({ match: false })
})

test('unequal arrays, criterion is encased, condition is arr tag, float', () => {
  expect(
    matchArray(
      [ { word: { text: 'father' } }, { word: { text: 'child' } }, { word: { text: 'mother' } } ],
      { float: true, template: [ { word: { text: 'child' } } ] },
    ),
  ).toEqual({ ixStart: 1, ixStop: 1, match: true, variables: {} })
})

test('unequal arrays, criterion is longer, condition is arr tag', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [
        { word: { text: 'father' } },
        { word: { text: 'mother' } },
        { word: { text: 'child' } },
      ],
    }),
  ).toEqual({ match: false })
})

test('unequal arrays, same length, different values, condition is arr tag', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'father' } }, { word: { text: 'child' } } ],
    }),
  ).toEqual({ match: false })
})

test('condition is arr tag, test for wildcard word', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'father' } }, { word: {} } ],
    }),
  ).toEqual({ ixStart: 0, ixStop: 1, match: true, variables: {} })
})

test('condition is arr tag, test for wildcard symbol (missing)', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [ { word: { text: 'father' } }, { symbol: {} } ],
    }),
  ).toEqual({ match: false })
})

test('matching arrays, condition is arr tag, with array or', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [
        { word: { text: 'father' } },
        {
          [templTag_arrOr]: [ [ { word: { text: 'mother' } } ], [ { word: { text: 'child' } } ] ],
        },
      ],
    }),
  ).toEqual({ ixStart: 0, ixStop: 1, match: true, variables: {} })
})

test('non matching arrays, condition is arr tag, with array or', () => {
  expect(
    matchArray([ { word: { text: 'father' } }, { word: { text: 'mother' } } ], {
      template: [
        { word: { text: 'father' } },
        {
          [templTag_arrOr]: [ [ { word: { text: 'son' } } ], [ { word: { text: 'daughter' } } ] ],
        },
      ],
    }),
  ).toEqual({ match: false })
})

test('matching arrays, condition is arr tag, with array or, multi-word', () => {
  expect(
    matchArray(
      [ { word: { text: 'father' } }, { word: { text: 'mother' } }, { word: { text: 'of' } } ],
      {
        template: [
          { word: { text: 'father' } },
          {
            [templTag_arrOr]: [
              [ { word: { text: 'mother' } }, { word: { text: 'of' } } ],
              [ { word: { text: 'child' } }, { word: { text: 'of' } } ],
            ],
          },
        ],
      },
    ),
  ).toEqual({ ixStart: 0, ixStop: 2, match: true, variables: {} })
})

test('non matching arrays, condition is arr tag, with array or, multi-word', () => {
  expect(
    matchArray(
      [
        { word: { text: 'father' } },
        { word: { text: 'mother' } },
        { word: { text: 'savior' } },
        { word: { text: 'of' } },
      ],
      {
        template: [
          { word: { text: 'father' } },
          {
            [templTag_arrOr]: [
              [ { word: { text: 'mother' } }, { word: { text: 'of' } } ],
              [ { word: { text: 'child' } }, { word: { text: 'of' } } ],
            ],
          },
        ],
      },
    ),
  ).toEqual({ match: false })
})

test('Repeat, wildcard, matching', () => {
  expect(
    matchArray(
      [
        { word: { text: 'mother' } },
        { word: { text: 'father' } },
        { word: { text: 'daughter' } },
        { word: { text: 'son' } },
      ],
      {
        template: [
          {
            [templTag_arrRep]: {
              items: [ { word: {} } ],
              min: 0,
              max: 3,
            },
          },
          { word: { text: 'son' } },
        ],
      },
    ),
  ).toEqual({ ixStart: 0, ixStop: 3, match: true, variables: {} })
})

test('Repeat, wildcard, matching, no min or max specified', () => {
  expect(
    matchArray(
      [
        { word: { text: 'ba' } },
        { word: { text: 'ba' } },
        { word: { text: 'ba' } },
        { word: { text: 'barbarra' } },
        { word: { text: 'ann' } },
      ],
      {
        template: [
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'ba' } } ],
              min: 0,
              max: 3,
            },
          },
          { word: { text: 'barbarra' } },
          { word: { text: 'ann' } },
        ],
      },
    ),
  ).toEqual({ ixStart: 0, ixStop: 4, match: true, variables: {} })
})

test('Repeat, wildcard, not matching, no min or max specified', () => {
  expect(
    matchArray(
      [
        { word: { text: 'ba' } },
        { word: { text: 'ba' } },
        { word: { text: 'ba' } },
        { word: { text: 'barbarra' } },
        { word: { text: 'ann' } },
      ],
      {
        template: [
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'ma' } } ],
              min: 0,
              max: 3,
            },
          },
          { word: { text: 'barbarra' } },
          { word: { text: 'ann' } },
        ],
      },
    ),
  ).toEqual({ match: false })
})

test('Repeat, wildcard, more than max', () => {
  expect(
    matchArray(
      [
        { word: { text: 'mother' } },
        { word: { text: 'father' } },
        { word: { text: 'daughter' } },
        { word: { text: 'son' } },
      ],
      {
        template: [
          {
            [templTag_arrRep]: {
              items: [ { word: {} } ],
              min: 0,
              max: 2,
            },
          },
          { word: { text: 'son' } },
        ],
      },
    ),
  ).toEqual({ match: false })
})

test('Repeat, certain word, match, but fail because of more than max repeats', () => {
  expect(
    matchArray(
      [
        { word: { text: 'i' } },
        { word: { text: 'like' } },
        { word: { text: 'ice ' } },
        { word: { text: 'cream' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'much' } },
      ],
      {
        template: [
          { word: { text: 'i' } },
          { word: { text: 'like' } },
          { word: { text: 'ice ' } },
          { word: { text: 'cream' } },
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'very' } } ],
              min: 2,
              max: 4,
            },
          },
          { word: { text: 'much' } },
        ],
      },
    ),
  ).toEqual({ match: false })
})

test('Repeat, certain word, match, succeed with max reps', () => {
  expect(
    matchArray(
      [
        { word: { text: 'i' } },
        { word: { text: 'like' } },
        { word: { text: 'ice ' } },
        { word: { text: 'cream' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'much' } },
      ],
      {
        template: [
          { word: { text: 'i' } },
          { word: { text: 'like' } },
          { word: { text: 'ice ' } },
          { word: { text: 'cream' } },
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'very' } } ],
              min: 2,
              max: 4,
            },
          },
          { word: { text: 'much' } },
        ],
      },
    ),
  ).toEqual({ ixStart: 0, ixStop: 8, match: true, variables: {} })
})

test('Repeat, certain word, match, succeed with min reps', () => {
  expect(
    matchArray(
      [
        { word: { text: 'i' } },
        { word: { text: 'like' } },
        { word: { text: 'ice ' } },
        { word: { text: 'cream' } },
        { word: { text: 'very' } },
        { word: { text: 'very' } },
        { word: { text: 'much' } },
      ],
      {
        template: [
          { word: { text: 'i' } },
          { word: { text: 'like' } },
          { word: { text: 'ice ' } },
          { word: { text: 'cream' } },
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'very' } } ],
              min: 2,
              max: 4,
            },
          },
          { word: { text: 'much' } },
        ],
      },
    ),
  ).toEqual({ ixStart: 0, ixStop: 6, match: true, variables: {} })
})

test('Repeat, certain word, match, fail  with less than min', () => {
  expect(
    matchArray(
      [
        { word: { text: 'i' } },
        { word: { text: 'like' } },
        { word: { text: 'ice ' } },
        { word: { text: 'cream' } },
        { word: { text: 'very' } },
        { word: { text: 'much' } },
      ],
      {
        template: [
          { word: { text: 'i' } },
          { word: { text: 'like' } },
          { word: { text: 'ice ' } },
          { word: { text: 'cream' } },
          {
            [templTag_arrRep]: {
              items: [ { word: { text: 'very' } } ],
              min: 2,
              max: 4,
            },
          },
          { word: { text: 'much' } },
        ],
      },
    ),
  ).toEqual({ match: false })
})

test('unequal arrays, criterion is longer, condition is arr tag, with variable', () => {
  expect(
    matchArray(
      [
        { word: { text: 'father' } },
        { word: { text: 'mother' } },
        { word: { text: 'daughter' } },
      ],
      {
        template: [
          { word: { text: 'father' } },
          { word: { text: 'mother' } },
          {
            [templTag_arrVar]: {
              name: 'myVar',
              items: [ { word: { text: 'daughter' } } ],
            },
          },
        ],
      },
    ),
  ).toEqual({
    ixStart: 0,
    ixStop: 2,
    match: true,
    variables: { myVar: [ { word: { text: 'daughter' } } ] },
  })
})

const templateRepeatInRepeatWithOr = [
  {
    [templTag_arrOr]: [
      [ { word: { text: 'take' } } ],
      [ { word: { text: 'bring' } } ],
      [ { word: { text: 'carry' } } ],
    ],
  },
  {
    [templTag_arrRep]: {
      items: [
        {
          [templTag_arrOr]: [ [ { word: { text: 'my' } } ], [ { word: { text: 'our' } } ] ],
        },
        {
          [templTag_arrRep]: {
            items: [ { word: { text: 'own' } } ],
            min: 0,
            max: 1,
          },
        },
      ],
      min: 0,
      max: 1,
    },
  },
]

test('Repeat in repeat with OR, just first word, match at the end', () => {
  expect(
    matchArray([ { word: { text: 'may' } }, { word: { text: 'I' } }, { word: { text: 'take' } } ], {
      float: true,
      template: templateRepeatInRepeatWithOr,
    }),
  ).toEqual({ ixStart: 2, ixStop: 2, match: true, variables: {} })
})

test('Repeat in repeat with OR, just first word, match not at the end', () => {
  expect(
    matchArray(
      [
        { word: { text: 'can' } },
        { word: { text: 'I' } },
        { word: { text: 'bring' } },
        { word: { text: 'it' } },
      ],
      {
        float: true,
        template: templateRepeatInRepeatWithOr,
      },
    ),
  ).toEqual({ ixStart: 2, ixStop: 2, match: true, variables: {} })
})

test('Repeat in repeat with OR, just first word, longer match', () => {
  expect(
    matchArray(
      [
        { word: { text: 'can' } },
        { word: { text: 'I' } },
        { word: { text: 'bring' } },
        { word: { text: 'my' } },
        { word: { text: 'bottle' } },
      ],
      {
        float: true,
        template: templateRepeatInRepeatWithOr,
      },
    ),
  ).toEqual({ ixStart: 2, ixStop: 3, match: true, variables: {} })
})

test('Repeat in repeat with OR, just first word, longest match', () => {
  expect(
    matchArray(
      [
        { word: { text: 'can' } },
        { word: { text: 'I' } },
        { word: { text: 'carry' } },
        { word: { text: 'our' } },
        { word: { text: 'own' } },
        { word: { text: 'bottle' } },
      ],
      {
        float: true,
        template: templateRepeatInRepeatWithOr,
      },
    ),
  ).toEqual({ ixStart: 2, ixStop: 4, match: true, variables: {} })
})

// IDEA [Project E] Make versions of the above tests with variable extraction, both true and false

// IDEA [Project E] Implement variables in matching sub-arrays

// IDEA [Project E] Repeat with OR condition
