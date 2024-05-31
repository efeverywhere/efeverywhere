'use client'
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Carousel as EFCarousel} from '@ef-global/backpack/Carousel'
import { 
          TeaserCard,     
          CardImage,
          CardTitle 
        } from '@ef-global/backpack/TeaserCard'
import {
          SurfaceCard,
          SurfaceCardContent,
        } from '@ef-global/backpack/SurfaceCard';
import { Button } from '@mui/material';
import { Image } from '@ef-global/backpack/Image';
import Footer from '../components/Footer';
import { Button as EFButton } from '@ef-global/backpack/Button'
import ThankYou from '../components/ThankYou';
import PhotoUpload from '../components/PhotoUpload';
import ErrorIcon from '@mui/icons-material/Error';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../css/About.css'

export default function Page(){
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const iconWidthMobile = '50px'
  const iconHeightMobile = '50px'
  const iconWidth = '28px'
  const iconHeight = '24px'
  const isMobile = useMediaQuery('(max-width:600px)')
  const sliderWidth = '60vw'
  const sliderHeight = '20vh'

  const toggleUpload = () => {
    setIsUploadOpen(!isUploadOpen);
  };

  const closeUpload = () => {
    setIsUploadOpen(false);
  }

    return (
      <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'white',
          width: '100%',
          height: '100%',
          marginTop: isMobile ? '0vh' : '10vh',
          padding: 0
        }}>
          <div
            style={{
              width: '100%',
              height: isMobile ? '100vh' : '',
              padding: 0,
              marginTop: isMobile ? '10vh': 0
            }}
          >
            <Carousel
              style={{
                height: isMobile ? '100vh' : '',
              }}
              autoPlay
              infiniteLoop
              showThumbs={false}
              dynamicHeight={true}
              showStatus={false}
              showArrows={false}
              showIndicators={false}
            >
                    <div>
                        <img 
                        src= {isMobile ? "Mobile_Play_Banner1.png" : "Banner 1.png" }
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                          }}/>
                    </div>
                    <div>
                        <img src= {isMobile ? "Mobile_Play_Banner2.png" : "Banner 2.png" }
                        style={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'contain'}}/>
                    </div>
              </Carousel>
            {/* <EFCarousel
              sizes="mx-m md:max-lg:mx-l lg:mx-auto lg:max-xl:w-[960px] xl:w-[1200px]"
              slidesInView={1}
              themeConfig={{
                slots: {
                  sliderInnerContainer: 'overflow-hidden',
                  pagination: 'ef-carousel-pagination h-s flex items-center gap-xxs',
                  paginationIndicator: 'left-10'
                }
              }}
              controls= "none"
            >
              <TeaserCard
              >
                <CardImage
                  alt="Image alternate"
                  aspectRatios={{
                    m: '16/9',
                    s: '1/1'
                  }}
                  src="Banner 1.png" 
                />
                <CardTitle>
                  This is a title
                </CardTitle>
              </TeaserCard>
              <TeaserCard
              >
                <CardImage
                  alt="Image alternate"
                  aspectRatios={{
                    m: '16/9',
                    s: '1/1'
                  }}
                  src="Banner 2.png" 
                />
                <CardTitle>
                  This is a title
                </CardTitle>
              </TeaserCard>
            </EFCarousel> */}

              <Image
                  src="60th logo.svg" 
                  style={{ 
                    position: 'absolute', 
                    width: isMobile ? '65%' : '50%', 
                    height: isMobile ? '65%' : '50%', 
                    top: isMobile ? '50%' : '60%', 
                    left: isMobile ? '50%': '30%', 
                    transform: 'translate(-50%, -50%)' ,
                    pointerEvents: 'none'
                  }} 
                />
          </div>
          <div style={{ 
            width: '80vw', 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'left',
            alignItems: 'left',
            position: 'relative',
            margin: 100
            
            }}>
              <Typography
                fontFamily='EFCircularBold'
                sx ={{
                  fontSize: isMobile ? '40px' : '56px',
                  color: 'black'
                }}
              >
              Show us EF Everywhere!
              </Typography>
              <Typography
                sx = {{
                  fontSize: '18px',
                  color: 'black',
                  marginTop: '20px'
                }}
              >
Our goal is to collect photos and videos in every single country in the world—in front of famous monuments, scenic spots, world cities, deserts, plains, mountains, more creative the better. We welcome submissions from EF team members, students, past travellers, family, friends, and pets. Prizes will be given to the wackiest, the rarest, the most viral, and the most EF. We can’t wait to see EF Everywhere!              </Typography>

              <Typography
                fontFamily='EFCircularBold'
                sx = {{
                  fontSize: '24px',
                  color: 'black',
                  marginTop: '70px',
                }}
              >
              How to be a part of this:
              </Typography>

              <Typography
                sx = {{
                  fontSize: '18px',
                  color: 'black',
                  marginTop: '20px',
                }}
              >
                <ul>
                  <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >
                    Bring anything EF with you on your travels and take a photo or video of it
                  </li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Submit this photo or video and make sure to tell us where you took it</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Or, use the hashtag #efeverywhere on social when you post</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >We will put a pin on the map in the country or region or spot where you took a shot in</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Not sure where to go? Check out the scoreboard to see what countries/territories we haven’t visited</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Have a brilliant idea? Great! Get creative and we will award you with cool prizes to the 20 best submissions (2 winners per category)</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Everyone is welcome to participate-EF staff, friends, travellers, students, parents—the more the merrier!</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      listStylePosition: 'inside',
                    }}
                  >Don’t forget to hashtag #efeverywhere</li>
                </ul>
              </Typography>

              <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: isMobile ? 'top' : 'center',
                gap: '1vw',
                marginTop: '60px',
                marginBottom: '60px'
              }}>

                <ErrorIcon 
                fontSize='large'
                style={{ 
                    color: '#D1334A', 
                    fontSize: '52px',
                    }}
                />
                <Typography
                  fontFamily='EFCircularMedium'
                >
                  *IMPORTANT! Safety First! Please do not do anything unsafe to get a photo or video. 
                </Typography>
              </div>

              <Typography
                fontFamily='EFCircularBold'
                sx = {{
                  fontSize: '24px',
                  color: 'black',
                  marginTop: '20px',
                }}
              >
                Cool prizes for two winners per category
              </Typography>
              {isMobile ? (
              <div >
                <EFCarousel
                scrollToHighlightedSlideOnClick
                slidesInView = {1.2}
                gap = {20}
                themeConfig={{
                  slots: {
                    sliderInnerContainer: 'overflow-hidden',
                  }
                }}
                controls = 'none'
                >
                <SurfaceCard
                style={{
                  boxShadow: 'none'
                }}
                >
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                        <img src="category_icons/Guarantee.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Most EF
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                    You know EF, we pink different. Now show us your version of pink different.
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                      <Image src="category_icons/EF logo block.svg" style={{ width: iconWidthMobile, height: iconHeightMobile}}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Biggest EF Logo
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                    What about a flash mob? Or a billboard, that works too!
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                      <img src="category_icons/Camera.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Most Breathtaking View
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                    Top of the Burj Khalifa. Denali, Alaska. The Grand Canyon. Too many to list!
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                    <img src="category_icons/Location.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    One of a Kind Location
                    </Typography>
                    <Typography
                  fontFamily='EFCircular'
                  sx={{
                    marginTop: '5px',
                    wordWrap: 'break-word',
                    
                    overflowX: 'none',
                    overflowY: 'auto',
                    height: sliderHeight,
                    width: sliderWidth,
                    fontSize: '18px'
                  }}
                    >
                    The currently viral country of Kiribati is one of the rarest visited countries in the world. Try there.
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                      <img src="category_icons/Music.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                      </div>
                      <Typography
                      fontFamily='EFCircularBold'
                      sx={{
                        fontSize: '20px'
                      }}
                      >
                        Craziest Idea
                      </Typography>
                      <Typography
                      fontFamily='EFCircular'
                      sx={{
                        marginTop: '5px',
                        wordWrap: 'break-word',
                        
                        overflowX: 'none',
                        overflowY: 'auto',
                        height: sliderHeight,
                        width: sliderWidth,
                        fontSize: '18px'
                      }}
                      >
                      We’re not saying you should sky dive with an EF backpack, but we’re also not saying you shouldn’t.
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                      <img src="category_icons/Heart.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Most Viral
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                      Share your pic with the world. The highest number of views, likes, comments, and shares win. Don’t forget to use the hashtag #efeverywhere
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                        <img src="category_icons/Trophy.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                   
                      </div>
                      <Typography
                      fontFamily='EFCircularBold'
                      sx={{
                        fontSize: '20px'
                      }}
                      >
                        Most Ad-worthy
                      </Typography>
                      <Typography
                      fontFamily='EFCircular'
                      sx={{
                        marginTop: '5px',
                        wordWrap: 'break-word',
                        
                        overflowX: 'none',
                        overflowY: 'auto',
                        height: sliderHeight,
                        width: sliderWidth,
                        fontSize: '18px'
                      }}
                      >
                        Beautiful cinematography. Aesthetic tumblreqsue pics. Unleash your inner artist.
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                      <img src="category_icons/Balloon.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>          
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Highest Altitude
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                      The EF flag has been to Mt Everest. Think you can go higher?
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                      <img src="category_icons/Beach.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Lowest Altitude
                    </Typography>
                    <Typography
                    fontFamily='EFCircular'
                    sx={{
                      marginTop: '5px',
                      wordWrap: 'break-word',
                      
                      overflowX: 'none',
                      overflowY: 'auto',
                      height: sliderHeight,
                      width: sliderWidth,
                      fontSize: '18px'
                    }}
                    >
                      We’ve also been to the bottom of the Red Sea. Your challenge is to go down under. 
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                <SurfaceCard style={{ boxShadow: 'none'}}>
                  <SurfaceCardContent>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                      <img src="category_icons/CriticsChoice.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Critics' Choice
                    </Typography>
                    <Typography
                   fontFamily='EFCircular'
                   sx={{
                     marginTop: '5px',
                     wordWrap: 'break-word',
                     overflowX: 'none',
                     overflowY: 'auto',
                     height: sliderHeight,
                     width: sliderWidth,
                     fontSize: '18px'
                   }}
                    >
                      A discerning group of judges will select the one submission that doesn’t just speak to them, but sings to them!
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>
                </EFCarousel>
                </div>
              ):(
              <div
              >
                <Grid 
                  sx = {{
                    marginTop: '0px',
                    marginBottom: '20px'
                  }}
                  container 
                  spacing={6}
                >

                  <Grid item xs={12/5}>
                    <div
                    style={{
                      marginBottom: '20px',
                    }}
                    >
                        <img src="category_icons/Guarantee.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most EF
                    </Typography>
                    <Typography>
                    You know EF, we pink different. Now show us your version of pink different.
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <Image src="category_icons/EF logo block.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                  </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Biggest EF Logo
                    </Typography>
                    <Typography>
                    What about a flash mob? Or a billboard, that works too!
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px'
                    }}
                  >
                        <img src="category_icons/Camera.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most Breathtaking View
                    </Typography>
                    <Typography>
                    Top of the Burj Khalifa. Denali, Alaska. The Grand Canyon. Too many to list!
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Location.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    One of a Kind Location
                    </Typography>
                    <Typography>
                    The currently viral country of Kiribati is one of the rarest visited countries in the world. Try there.
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Music.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Craziest Idea
                    </Typography>
                    <Typography>
                    We’re not saying you should sky dive with an EF backpack, but we’re also not saying you shouldn’t.
                    </Typography>
                  </Grid>


                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Heart.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most Viral
                    </Typography>
                    <Typography>
                    Share your pic with the world. The highest number of views, likes, comments, and shares win. Don’t forget to use the hashtag #efeverywhere
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Trophy.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most Ad-worthy
                    </Typography>
                    <Typography>
                    Beautiful cinematography. Aesthetic tumblreqsue pics. Unleash your inner artist.
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Balloon.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Highest Altitude
                    </Typography>
                    <Typography>
                    The EF flag has been to Mt Everest. Think you can go higher?
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/Beach.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Lowest Altitude
                    </Typography>
                    <Typography>
                    We’ve also been to the bottom of the Red Sea. Your challenge is to go down under. 
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/CriticsChoice.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Critics' Choice
                    </Typography>
                    <Typography>
                    A discerning group of judges will select the one submission that doesn’t just speak to them, but sings to them!
                    </Typography>
                  </Grid>


                </Grid>

              </div>
              )}
              
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'left',
              alignItems: 'left',
              marginTop: '10vh'
            }}
          >
            { !isMobile && (
              <div>
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
            </div>
            )}

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
          </div>
        <Footer/>
      </div>

    );
  };
