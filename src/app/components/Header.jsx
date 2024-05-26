'use client'
import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { Button as EFButton } from '@ef-global/backpack/Button'
import { HeaderState } from './headerState';
import { IntroState } from './introState';
import {IconClose} from '@ef-global/backpack-icons'
import {IconMenu} from '@ef-global/backpack-icons'
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
// import Image from 'next/image';
import { Image } from '@ef-global/backpack/Image';
import Box from '@mui/material/Box';
import Link from 'next/link';
import PhotoUpload from '../components/PhotoUpload';
import ThankYou from '../components/ThankYou';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


const logo = '/EF_logo.svg'
const alt_logo = '/EF_logo_white.svg'

export default function Header(pathname, children) {
    const { headerState, setHeaderState } = React.useContext(HeaderState);
    const { isIntroVisible, setIsIntroVisible } = React.useContext(IntroState);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false); // Add this
    const [drawer, setDrawer] = useState(false);
    const [isUploadOpen, setIsUploadOpen] = useState(false);
    const [isThankYouOpen, setIsThankYouOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // const text_color = pathname.currentPage === '/about' && !drawer ? '#FFFFFF' : '#000000'
    const text_color = '#000000'
    const isMobile = useMediaQuery('(max-width:600px)')

    const toggleUpload = () => {
        setIsUploadOpen(!isUploadOpen);
      };
  
    const StyledIconButton = styled(IconButton)({
      '&:hover': {
        backgroundColor: 'transparent',
      },
    });

    const handleHeaderMenuClick = (event) => {
        setMenuOpen(!isVisible); // Add this
        setDrawer(!drawer);
        setIsIntroVisible(false);
      };
      
      const handleHeaderMenuClose = () => {
        setMenuOpen(false); // Add this
        setDrawer(false);
      };

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollPos > currentScrollPos;
    
        setPrevScrollPos(currentScrollPos);
        setVisible(visible);
      };

      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, [prevScrollPos, visible, handleScroll]);

    return (
    <div>
        {isMobile ? (
            //////////
            // MOBILE
            //////////
            <div
            style={{ 
                position: 'fixed', 
                width: '100%',
                zIndex: 1005,
                top: 0,
            }}
            >
            <div
            style={{
                width: '100%',
                height: '10vh',
                background: (pathname.currentPage === '/') & (headerState == 'default') ? 'transparent' : '#FFFFFF',
                zIndex: 600,
                borderBottom: pathname.currentPage === '/' ? '' : '1px solid rgba(37, 37, 37, .3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignContent: 'center',
            }}>
                <div style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: '2.5vh',
                    left: '4vw',
                    zIndex: 1002,
                }}>
                    <StyledIconButton 
                    onClick={handleHeaderMenuClick}
                    >
                        {drawer ? 
                            <IconClose 
                            style={{
                                color: '#191919'
                            }}
                            />
                            :
                            <IconMenu 
                            style={{
                                color: '#191919'
                            }}
                            />
                        }
                    </StyledIconButton>
                </div>
                {isVisible && !drawer && (
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        top: 0,
                        zIndex: 1000
                    }}>
                        <Link 
                        href="/" 
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '10vh',
                            alignItems: 'center'
                        }}
                        >
                            <Image 
                            height={70}
                            width={70}
                            src={logo}
                            alt="Education First Logo"
                            />
                        </Link>
                    </div>
                )}
            </div>

                {isVisible && !drawer && (
                    <div style={{
                        position: 'fixed',
                        // left: '23.5%',
                        bottom: '10%',
                        left: '50.5%', //no idea why but this is the center
                        transform: 'translate(-50%, -50%)',
                    }}>
                        <EFButton
                            as="button"
                            onClick={toggleUpload}
                            variant="primary"
                            size="regular"
                            style={{
                                fontFamily: 'EFCircularBook',
                                color: '#FFFFFF !important',
                            }}
                        >
                            Submit Your Shot
                        </EFButton>
                    </div>
                )}
                <SwipeableDrawer
                    anchor='top'
                    open={drawer}
                    onClose={() => handleHeaderMenuClose()}
                    onOpen={() => setDrawer(true)}
                    sx={{
                        zIndex: 1001,
                        backgroundColor: '#E3F7FF',
                    }}
                >
                    <Box
                        role="presentation"
                        onKeyDown={() => handleHeaderMenuClose()}
                        style={{
                            top: 100,
                            flexDirection: 'column', // Keep this as 'column' to sort the links in a column
                            width: 'auto',
                            display: 'flex',
                            justifyContent: 'flex-start', // Change this from 'center' to 'flex-start' to align the text on the left
                            alignItems: 'flex-start', // Change this from 'flex-end' to 'flex-start' to align the text on the left
                            height: '100vh',
                            marginTop: '10vh'
                        }}
                        PaperProps={{
                            style: {
                                backgroundColor: '#E3F7FF', // Move the backgroundColor property here
                                height: '100%', // Add this property
                              },
                        }}
                    >
                        <Divider
                            style={{
                                backgroundColor: '#E3F7FF',
                                width: '100%',
                            }}  
                        />

                        <Link 
                            onClick={() => handleHeaderMenuClose()}
                            href="/" 
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '10vh',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                            style={{ 
                                color: '#191919',
                                fontSize:'25px',
                                marginLeft: '10vw',
                                fontFamily: pathname.currentPage === '/' ? 'EFCircularBold' : 'EFCircularBook'
                            }}
                            >
                            EF Everywhere
                            </Typography>
                        </Link>

                        <Divider
                            style={{
                                backgroundColor: '#E3F7FF',
                                width: '90%'
                            }}  
                            variant='middle'
                        />

                        <Divider variant='middle'  style={{ backgroundColor: '#000000' }} />

                        <Link 
                            onClick={() => handleHeaderMenuClose()}
                            href="/about" 
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '10vh',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                            style={{ 
                            color: '#000000',
                            fontSize:'25px',
                            marginLeft: '10vw',
                            fontFamily: pathname.currentPage === '/about' ? 'EFCircularBold' : 'EFCircularBook'
                            }}>
                            Play
                            </Typography>
                        </Link> 

                        <Divider
                            style={{
                                backgroundColor: '#E3F7FF',
                                width: '90%'
                            }}  
                            variant='middle'
                        />
                        
                        <Link 
                            onClick={() => handleHeaderMenuClose()}
                            href="/scoreboard" 
                            style={{
                                textDecoration: 'none',
                                display: 'flex',
                                justifyContent: 'space-between',
                                height: '10vh',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                            style={{ 
                                color: '#000000',
                                fontSize:'25px',
                                marginLeft: '10vw',
                                fontFamily: pathname.currentPage === '/scoreboard' ? 'EFCircularBold' :  'EFCircularBook'
                            }}>
                                Score
                            </Typography>
                        </Link> 

                        <Divider
                            style={{
                                backgroundColor: '#E3F7FF',
                                width: '90%'
                            }}  
                            variant='middle'
                        />
                        <div 
                            onClick={toggleUpload}
                            style={{
                                textDecoration: 'none',
                                backgroundColor: '#0075E1',
                                width: '100%',
                                height: '15vh',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}
                        >
                            <Typography
                            sx={{ 
                                fontSize:'25px',
                                marginLeft: '10vw',
                                fontFamily: 'EFCircularBook',
                                color: '#FFFFFF !important',
                            }}>
                                Submit Your Shot
                            </Typography>
                            <ArrowForwardIcon 
                            sx={{ 
                                color: '#FFFFFF',
                                marginRight: '10vw',
                                }} />
                        </div> 

                    </Box>
                </SwipeableDrawer>
                {isUploadOpen && 
                    <PhotoUpload 
                    isOpen={isUploadOpen} 
                    handleClose={() => setIsUploadOpen(false)}
                    setIsThankYouOpen={setIsThankYouOpen} />
                }
                {isThankYouOpen &&
                    <ThankYou
                    isOpen={isThankYouOpen}
                    handleClose={() => {
                        setIsUploadOpen(false)
                        setIsThankYouOpen(false)}
                    }
                    />
                }
            </div>

            ) : (
            
            //////////
            // DESKTOP
            //////////
            <div
                style ={{
                    position: 'fixed',
                    width: '100%',
                    height: '10vh',
                    top: 0,
                    background: pathname.currentPage === '/' ? 'transparent' : '#FFFFFF',
                    zIndex: 600,
                    // top: visible ? '0' : '-100px',  //uncomment if you want the header to disappear on scroll
                    top: '0',
                    transition: 'top 0.3s',
                    borderBottom: pathname.currentPage === '/' ? '' : '1px solid rgba(37, 37, 37, .3)',
                }}
            >
                <div 
                style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    position: pathname.currentPage === '/' ? 'fixed' : 'absolute',
                    width: '80%', 
                    height: '5vh',
                    left: '10%',
                    zIndex: 502,
                    backgroundColor: 'transparent'
                    }}>
                    <Box
                        style={{
                            position: 'relative',
                            width: '4vw',
                            height: '3vw',
                        }}
                        >
                        <Link 
                        onClick={() => {window.location.href = "/"}}
                        href="/" 
                        style={{
                            textDecoration: 'none',
                            display: 'flex',
                            justifyContent: 'space-between',
                            height: '10vh',
                            alignItems: 'center',
                        }}
                        >
                            <Image 
                                src={logo}
                                alt="Education First Logo"
                                />
                        </Link>
                    </Box>
                    <Box
                        role="presentation"
                        style={{
                            width: 'auto',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: '5vh'
                        }}
                        >
                            <Link 
                                onClick={() => {window.location.href = "/"}}
                                href="/" style={{textDecoration: 'none'}}
                                
                            >
                                <Typography
                                    sx={{ 
                                        color: text_color,
                                        fontSize:'16px',
                                        marginRight: '2vw',
                                        fontFamily: pathname.currentPage == '/' ? 'EFCircularBold' : 'EFCircularBook'
                                    }}
                                >
                                EF Everywhere
                                </Typography>
                            </Link>
                            
                            <Link 
                                href="/about" 
                                style={{textDecoration: 'none'}}
                            >
                                <Typography
                                sx={{ 
                                    color: text_color,
                                    fontSize:'16px',
                                    marginRight: '2vw',
                                    fontFamily: pathname.currentPage == '/about' ? 'EFCircularBold' : 'EFCircularBook'
                                }}>
                                Play
                                </Typography>
                            </Link> 

                            <Link 
                                href="/scoreboard" style={{textDecoration: 'none'}}
                            >
                                <Typography
                                sx={{ 
                                color: text_color,
                                fontSize:'16px',
                                marginRight: '2vw',
                                fontFamily: pathname.currentPage == '/scoreboard' ? 'EFCircularBold' : 'EFCircularBook'
                                }}>
                                Score
                                </Typography>
                            </Link>
                                <EFButton
                                    as="button"
                                    onClick={toggleUpload}
                                    variant="primary"
                                    size="regular"
                                    style={{
                                        fontFamily: 'EFCircularBook',
                                    }}
                                >
                                    Submit Your Shot
                                </EFButton>
                    </Box>
                </div>
                {isUploadOpen && 
                        <PhotoUpload 
                        isOpen={isUploadOpen} 
                        handleClose={() => setIsUploadOpen(false)}
                        setIsThankYouOpen={setIsThankYouOpen} 
                        />
                }
                {isThankYouOpen &&
                    <ThankYou
                    isOpen={isThankYouOpen}
                    handleClose={() => {
                        setIsUploadOpen(false)
                        setIsThankYouOpen(false)
                    }}
                    />
                }
            </div>
        )} 
    </div>
    )
}