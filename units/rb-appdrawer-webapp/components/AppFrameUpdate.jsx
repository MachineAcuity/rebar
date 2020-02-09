// @flow

import React, { Fragment } from 'react'

import AppFrameContext from './AppFrameContext'

class AppFrameUpdateExecutor extends React.Component<{
  title: string,
  setTitle: Function,
  clearTitle: Function,
}> {
  componentDidMount() {
    const { title, setTitle } = this.props

    setTitle(title)
  }

  componentWillUnmount() {
    const { clearTitle } = this.props

    clearTitle()
  }

  render() {
    return <Fragment />
  }
}

class AppFrameUpdate extends React.Component<{
  title: string,
}> {
  render() {
    const { title } = this.props

    return (
      <AppFrameContext.Consumer>
        {({ setTitle, clearTitle }) => (
          <AppFrameUpdateExecutor
            title={title}
            setTitle={setTitle}
            clearTitle={clearTitle}
          />
        )}
      </AppFrameContext.Consumer>
    )
  }
}

export default AppFrameUpdate
