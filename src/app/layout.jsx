'use client'
import React, { Suspense } from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from '@mui/material/styles';
import { Providers } from './providers';
import { fonts } from './fonts'
import { HeaderState } from './components/headerState';
import { IntroState } from './components/introState';
import { Head } from 'next/head';
import theme from './styles/theme';
import Header from './components/Header'
import './global.css'
// import '@ef-global/backpack/ef-global-minimal.css';
import '@ef-global/backpack/ef-global.css';

export default function RootLayout({children}){
  const pathname = usePathname(); // Add this line
  const [headerState, setHeaderState] = React.useState('default');
  const [isIntroVisible, setIsIntroVisible] = React.useState(true);

  return (
    <html lang="en">
      <head>
        <title> EF Everywhere - The Official 60th Anniversary Website </title>
        <meta name="description" content="EF Everywhere is the official 60th anniversary website for EF Education First. Explore how EF members from all around the globe are celebrating their love for EF and discover how we are helping to make the world a better place." />
      </head>
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <ThemeProvider theme={theme}>
                <HeaderState.Provider value={{headerState, setHeaderState}}>
                  <IntroState.Provider value={{isIntroVisible, setIsIntroVisible}}>
                  <Header
                      currentPage={pathname}
                      style={{
                        zIndex: 1000,
                      }}
                    />
                  <Suspense fallback={<div>Loading...</div>}>
                    {children}
                  </Suspense>
                  </IntroState.Provider>
                </HeaderState.Provider>
            </ThemeProvider>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}