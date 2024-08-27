'use client'

import { ThemeProvider } from 'styled-components'
import { GlobalStyle, normalTheme } from 'styles'
import { LenisWrapper } from 'components'

export default function Template({ children }) {
  return (
    <ThemeProvider theme={normalTheme}>
      <GlobalStyle />
      <LenisWrapper>
        <main>{children}</main>
      </LenisWrapper>
    </ThemeProvider>
  )
}
