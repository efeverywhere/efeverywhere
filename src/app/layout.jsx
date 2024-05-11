'use client'
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import { Providers } from './providers';
import { fonts } from './fonts'
import { HeaderState } from './components/headerState';
import theme from './styles/theme';
import Header from './components/Header'
import './global.css'

export default function RootLayout({children}){
  const pathname = usePathname(); // Add this line
  const [headerState, setHeaderState] = React.useState('default');

  return (
    <html lang="en" className={fonts.rubik.variable}>
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
                <HeaderState.Provider value={{headerState, setHeaderState}}>
                  <Header
                    currentPage={pathname}
                    style={{
                      zIndex: 1000,
                    }}
                  />
                {children}
                
                </HeaderState.Provider>
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}