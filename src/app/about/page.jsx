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
import {IconAlertCircle} from '@ef-global/backpack-icons'
import {IconAirplane} from '@ef-global/backpack-icons'
import useMediaQuery from '@mui/material/useMediaQuery';
import '../css/About.css'
import Link from 'next/link';

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
                  src="60_anniversary-logo.svg" 
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
                  color: 'black',
                  lineHeight: '1.3',
                }}
              >
              Help show EF Everywhere!
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
                <ul style={{ marginLeft: '20px'}}>
                  <li
                    style={{
                      listStyleType: 'disc',
                      // 
                    }}
                  >
                    Bring anything EF with you on your travels and take a photo or video with it
                  </li>
                                    <li
                    style={{
                      listStyleType: 'disc',

                    }}
                  > <a 
                  style={{
                    color: '#0000EE', // Change the color to link blue
                    textDecoration: 'underline', // Add an underline
                    cursor: 'pointer', // Change the cursor to a pointer when hovering
                  }}
                  onClick={toggleUpload}>Submit</a> this photo or video and make sure to tell us where you took it</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                    }}
                  >Or, use the hashtag #efeverywhere on social when you post</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      
                    }}
                  >We will put a <Link 
                                    style={{
                                        color: '#0000EE', // Change the color to link blue
                                        textDecoration: 'underline', // Add an underline
                                        cursor: 'pointer', // Change the cursor to a pointer when hovering
                                      }}
                                    href="/">pin on the map</Link> in the country or region or spot where you took a shot in</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      
                    }}
                  >Not sure where to go? Check out the <Link 
                                                    style={{
                                                      color: '#0000EE', // Change the color to link blue
                                                      textDecoration: 'underline', // Add an underline
                                                      cursor: 'pointer', // Change the cursor to a pointer when hovering
                                                    }}
                                                    href="/scoreboard">  
                                                    scoreboard</Link> to see what countries/territories we haven’t visited</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      
                    }}
                  >Have a brilliant idea? Great! Get creative and win cool prizes</li>
                                    <li
                    style={{
                      listStyleType: 'disc',
                      
                    }}
                  >Everyone is welcome to participate—EF staff, friends, travellers, students, parents—the more the merrier!</li>
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

                <IconAlertCircle
                fontSize='large'
                style={{ 
                    color: '#D1334A', 
                    fontSize: '52px',
                    marginRight: isMobile ? '20px' : '0px'
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
                These are the prize categories, more to come!
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
                        <img 
                          src="category_icons/best_EF_office.svg" 
                          style={{ 
                            width: iconWidthMobile, 
                            height: iconHeightMobile, 
                            objectFit: 'contain',
                          }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Best EF office/school/campus spirit!
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
                    Photo or video.
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
                      <Image src="category_icons/entries_on_map.svg" style={{ width: iconWidthMobile, height: iconHeightMobile}}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Product with most entries on the map
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
                    Think high quality high volume i.e. let’s be proud of being EF Everywhere!
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
                      <img src="category_icons/customer_entries.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Product with best customer entries
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
                    Our customers are awesome, let’s invite them to join!
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
                    <img src="category_icons/product_photos.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                    Product photos in the most cities
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
                    Or villages, or towns, or havens, nooks or hamlets.
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
                      <img src="category_icons/biggest_crowd.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                      </div>
                      <Typography
                      fontFamily='EFCircularBold'
                      sx={{
                        fontSize: '20px'
                      }}
                      >
                        Biggest crowd in a photo
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
                      Think big, like really big!
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
                      <img src="category_icons/10_people.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                    
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Most creative with 10 or more people
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
                      Perhaps a great pyramid by the Great Pyramids?
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
                        <img src="category_icons/essence_homecity.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>                   
                      </div>
                      <Typography
                      fontFamily='EFCircularBold'
                      sx={{
                        fontSize: '20px'
                      }}
                      >
                        Group that most represents the essence of their home city
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
                        Lederhosen. Always a good idea.
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
                      <img src="category_icons/plane.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>          
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best shot on a plane
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
                      Use your flight time effectively and get your flight crew and fellow passengers involved!
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
                      <img src="category_icons/iconic_landmark.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best shot of iconic landmark
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
                      Can you EF-ify the Roman Forum? Or Easter Island? Just putting it out there. 
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
                      <img src="category_icons/celebrity.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best shot of celebrity with EF logo
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
                      EF some A-listers.
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
                      <img src="category_icons/unique_place.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      EF logo in most unique place
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
                      Space X anyone?
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
                      <img src="category_icons/random_EF_logo.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best randomly spotted EF logo
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
                      Spot some EF-alike clouds? Or a cheetah with an ‘EF’ shaped birthmark? Snap it!
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
                      <img src="category_icons/photo_bomb.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best EF photobomb
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
                      But in a safe, fun way. We hear King Charles’ security has little patience for that sort of thing.
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
                      <img src="category_icons/represent_city.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Best representation of your city
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
                      Show your home town some EF love.
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
                      <img src="category_icons/viral_photo.svg" style={{ width: iconWidthMobile, height: iconHeightMobile, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularBold'
                    sx={{
                      fontSize: '20px'
                    }}
                    >
                      Most viral EF photo
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
                      Do it for the likes.
                    </Typography>
                  </SurfaceCardContent>
                </SurfaceCard>

                </EFCarousel>
                </div>
              ):(
              <div>
                <Grid 
                  sx = {{
                    marginTop: '-30px',
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
                        <img src="category_icons/best_EF_office.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best EF office/school/campus spirit!
                    </Typography>
                    <Typography>
                    Photo or video.
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <Image src="category_icons/entries_on_map.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                  </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Product with most entries on the map
                    </Typography>
                    <Typography>
                    Think high quality high volume i.e. let’s be proud of being EF Everywhere!
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px'
                    }}
                  >
                        <img src="category_icons/customer_entries.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Product with best customer entries
                    </Typography>
                    <Typography>
                    Our customers are awesome, let’s invite them to join!
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/product_photos.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Product photos in the most cities
                    </Typography>
                    <Typography>
                    Or villages, or towns, or havens, nooks or hamlets.
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div>
                        <img src="category_icons/biggest_crowd.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Biggest crowd in a photo
                    </Typography>
                    <Typography>
                    Think big, like really big!
                    </Typography>
                  </Grid>


                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/10_people.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most creative with 10 or more people
                    </Typography>
                    <Typography>
                    Perhaps a great pyramid by the Great Pyramids?
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/essence_homecity.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Group that most represents the essence of their home city
                    </Typography>
                    <Typography>
                    Lederhosen. Always a good idea.
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/plane.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best shot on a plane
                    </Typography>
                    <Typography>
                    Use your flight time effectively and get your flight crew and fellow passengers involved!
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/iconic_landmark.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best shot of iconic landmark
                    </Typography>
                    <Typography>
                    Can you EF-ify the Roman Forum? Or Easter Island? Just putting it out there. 
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/celebrity.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best shot of celebrity with EF logo
                    </Typography>
                    <Typography>
                    EF some A-listers.
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/unique_place.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    EF logo in most unique place
                    </Typography>
                    <Typography>
                    Space X anyone?
                    </Typography>
                  </Grid>
                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/random_EF_logo.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best randomly spotted EF logo
                    </Typography>
                    <Typography>
                    Spot some EF-alike clouds? Or a cheetah with an ‘EF’ shaped birthmark? Snap it!
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/photo_bomb.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                    <Typography
                    fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best EF photobomb
                    </Typography>
                    <Typography>
                    But in a safe, fun way. We hear King Charles’ security has little patience for that sort of thing.
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/represent_city.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Best representation of your city
                    </Typography>
                    <Typography>
                    Show your home town some EF love.
                    </Typography>
                  </Grid>

                  <Grid item xs={12/5}>
                  <div
                    style={{
                      marginBottom: '20px',
                    }}
                  >
                        <img src="category_icons/viral_photo.svg" style={{ width: iconWidth, height: iconHeight, objectFit: 'contain' }}/>
                    </div>
                  <Typography
                  fontFamily='EFCircularMedium'
                    sx={{
                      
                    }}>
                    Most viral EF photo
                    </Typography>
                    <Typography>
                    Do it for the likes.
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
                        '--color-component-button-primary-bg': '#DA2381'
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
