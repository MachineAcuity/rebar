// @flow

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import React from 'react'
import EventListener from 'react-event-listener'

import SiteConfigurationContext from './SiteConfigurationContext'
import ViewportContext from './ViewportContext'

export default class AppWrapperBase extends React.Component<
  {
    siteConfiguration: Object,
    children: any,
    url: string,
  },
  { totalWidth: number, totalHeight: number },
> {
  constructor(props: Object, context: Object) {
    super(props, context)

    this.state = { totalWidth: 100, totalHeight: 100 }
  }

  componentDidCatch(err: any, err_info: any) {
    if (window && window.__rebar_error_handler__) {
      window.__rebar_error_handler__({ err, err_info })
    }
  }

  componentDidMount() {
    this.handle_onResize() // Will populate the data structures for dimensions with current values
  }

  // This should be overridden in AppDrawer
  createMUITheme() {
    return null
  }

  handle_onResize = () => {
    const totalWidth = window.innerWidth
    const totalHeight = window.innerHeight

    this.setState({ totalWidth, totalHeight })
  }

  render() {
    const { totalWidth, totalHeight } = this.state

    return (
      <EventListener target="window" onResize={this.handle_onResize}>
        <MuiThemeProvider theme={this.createMUITheme()}>
          <ViewportContext.Provider value={{ totalWidth, totalHeight }}>
            <SiteConfigurationContext.Provider value={this.props.siteConfiguration}>
              {this.props.children}
            </SiteConfigurationContext.Provider>
          </ViewportContext.Provider>
        </MuiThemeProvider>
      </EventListener>
    )
  }
}
