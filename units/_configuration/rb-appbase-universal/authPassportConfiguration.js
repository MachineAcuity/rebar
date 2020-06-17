// @flow

type ProviderConfiguration = {
  disabled?: {
    disabledMessageText: string,
  },
}

type AllSupportedProviders = {
  facebook?: ProviderConfiguration,
  google?: ProviderConfiguration,
  linkedin?: ProviderConfiguration,
  microsoft?: ProviderConfiguration,
  twitter?: ProviderConfiguration,
}

const authPassportConfiguration: AllSupportedProviders = {
  // facebook: {},
  // google: {},
  // linkedin: {
  //   disabled: {},
  // },
  // microsoft: {
  //   disabled: {
  //     disabledMessageText:
  //       'We do not currently support authentication through Microsoft/Azure AD/Active Directory. However, if this is of interest to you, please let us know.',
  //   },
  // },
  // twitter: {
  //   disabled: {
  //     disabledMessageText:
  //       'We do not currently support authentication through Twitter. However, if this is of interest to you, please let us know.',
  //   },
  // },
}

export default authPassportConfiguration
