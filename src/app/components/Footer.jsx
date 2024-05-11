'use client'
import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Link from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid, Typography } from '@mui/material';

export default function Footer() {
    const isMobile = useMediaQuery('(max-width:600px)')
    return (
    <div>
      {isMobile ? (
        //////////
        // MOBILE
        //////////
      <div
        style={{
          display: 'flex', 
          flexDirection: 'column',
          width: '100vw',
          backgroundColor: '#E5EBEF',
          paddingTop: '5vh',
          paddingBottom: '2vh',
        }} 
        id="section_footer"
      >
          <div
          style={{
            display: 'flex',
            alignItem: 'center',
            justifyContent: 'center'
          }}>
            <Image src="EF 60th.svg" 
              width={400} 
              height={70}
            />
          </div>

          <Box
              role="presentation"
              style={{
                  width: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'left',
                  alignItems: 'flex-start',
                  gap: '5vh',
                  marginLeft: '10vw',
                  marginTop: '5vh'
              }}
            >
            <a 
              href="https://www.ef.com/wwen/about-us/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography 
                align="left"
                fontFamily={'EFCircularBook'}
                >
                About Us
              </Typography>
            </a>

            {/* <a 
              href="https://www.ef.com/wwen/contact/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                EF Offices
              </Typography>
            </a>

            <a 
              href="https://www.ef.com/wwen/pg/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                All EF Programs
              </Typography>
            </a> */}

            <a 
              href="https://careers.ef.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ 
                textDecoration: 'none', 
                color: 'inherit',}}>
              <Typography
              fontFamily={'EFCircularBook'}
              >
              Careers at EF
              </Typography>
            </a>
          </Box>
          <div
          style={{
            marginTop: '5vh'
          }}
          >
            <hr 
              style={{ 
                width: '80vw',
                borderColor: '#19191933',
                marginTop: '0px'
              }} 
              />
          </div>
            <Box
                role="presentation"
                style={{
                    width: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'left',
                    alignItems: 'flex-start',
                    gap: '5vh',
                    marginLeft: '10vw',
                    marginTop: '5vh'
                }}
                >
              <a 
                  href="https://careers.ef.com/privacy-notice/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    fontFamily={'EFCircularBook'}
                  >
                    Privacy Policy
                  </Typography>
                </a>

                <a 
                  href="https://www.ef.com/wwen/about-us/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    fontFamily={'EFCircularBook'}
                  >
                    Cookies
                  </Typography>
                </a>

                <a 
                  href="https://www.ef.com/wwen/legal/contact-us/?_ga=2.109880642.670757033.1708918306-1067468413.1667877572&utm_source=(direct)&utm_medium=(none)&utm_campaign=efcentral" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography
                    fontFamily={'EFCircularBook'}
                  >
                  © EF Education First 2024. All rights reserved.
                  </Typography>
                </a>
            </Box>
      </div>
      
        ) : (

          //////////
          // DESKTOP
          //////////
      <div
      style={{
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center', 
            width: '100vw',
            backgroundColor: '#E5EBEF',
            paddingTop: '5vh',
            paddingBottom: '2vh',
      }} 
        id="section_footer">
        <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          width: '80vw',
        }}
        >
          <div
          style={{
            alignItem: 'baseline'
          }}>
            <Image src="EF 60th.svg" 
              width={200} 
              height={100}
            />
          </div>
          <Box
              role="presentation"
              sx={{
                  width: 'auto',
                  display: 'flex', // Add this
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '3vw'
              }}
              >
            <a 
              href="https://www.ef.com/wwen/about-us/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                About Us
              </Typography>
            </a>

            {/* <a 
              href="https://www.ef.com/wwen/contact/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                EF Offices
              </Typography>
            </a>

            <a 
              href="https://www.ef.com/wwen/pg/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                All EF Programs
              </Typography>
            </a> */}

            <a 
              href="https://careers.ef.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
              Careers at EF
              </Typography>
            </a>
          </Box>
          
        </div>

        <div>
          <hr 
            style={{ 
              width: '80vw',
              borderColor: '#19191933',
              marginTop: '0px'
            }} 
            />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'self-start',
            width: '80vw',
            gap: '3vw'
          }}
        >
            <a 
              href="https://careers.ef.com/privacy-notice/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                Privacy Policy
              </Typography>
            </a>

            <a 
              href="https://www.ef.com/wwen/about-us/" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
                Cookies
              </Typography>
            </a>

            <a 
              href="https://www.ef.com/wwen/legal/contact-us/?_ga=2.109880642.670757033.1708918306-1067468413.1667877572&utm_source=(direct)&utm_medium=(none)&utm_campaign=efcentral" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>
              © EF Education First 2024. All rights reserved.
              </Typography>
            </a>
        </div>
      </div>
      )}
    </div>
    );
  }
