'use client'

import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle, normalTheme } from 'styles'
import { LenisWrapper, Loader } from 'components'

export default function Template({ children }) {
  const [showLoader, setShowLoader] = useState(false)

  return (
    <ThemeProvider theme={normalTheme}>
      <GlobalStyle />
      <LenisWrapper>
        {showLoader ? <Loader setShowLoader={setShowLoader} /> : null}
        <main>{children}</main>
      </LenisWrapper>
    </ThemeProvider>
  )
}
