
import React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { HeaderState } from './headerState';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import {IconClose} from '@ef-global/backpack-icons'
import {FlagLoader} from '@ef-global/backpack-flags/FlagLoader';
import CircularProgress from '@mui/material/CircularProgress';



export default function LocationGallery({ onClose, name, images, countryISOCode }) {

  const isMobile = useMediaQuery('(max-width:600px)')

  // Replace this with your actual data
  const {headerState, setHeaderState} = React.useContext(HeaderState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isCardBottom, setIsCardBottom] = useState(false);
  const [viewState, setViewState] = useState(isMobile ? 'squares' : 'quilted');
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesPerPage] = useState(20); 

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const colsList = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2]; // Replace with your list of numbers for cols
  const rowsList = [2, 1, 1, 1, 1, 1, 2, 1, 1, 1];
  const currentImages = images.map((image, index) => ({
    src: image.file_name,
    caption_person: image.caption_person,
    caption_location: image.caption_location,
    caption_text: image.caption_text,
    submitter_details: image.submitter_details,
    alt: image.caption,
    file_type: image.file_type,
    cols: colsList[index % colsList.length],
    rows: rowsList[index % rowsList.length],
  })).slice(indexOfFirstImage, indexOfLastImage);

  const thumbnailDir = "https://ckwgnbjfta.cloudimg.io/_ef-everywhere_/ef_images/_thumbnails/"

  function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?width=${size * cols}&height=${size * rows}&func=crop`,
    };
  }

  useEffect(() => {
    console.log(countryISOCode)
  }, []);

  useEffect(() => { //We need to use this for CardMedia image loading checks
    const img = new Image();
    if (!selectedImage) {
      return;
    }
    img.src = selectedImage.src;
    img.onload = handleImageLoad;
  }, [selectedImage]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  useEffect(() => {
    const video = document.createElement('video');
  
    if (!selectedVideo) {
      return;
    }
  
    video.onloadedmetadata = handleVideoLoad;
    video.src = selectedVideo.src;
  
    // Cleanup function
    return () => {
      video.onloadedmetadata = null;
    };
  }, [selectedVideo]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  const handleCardScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop < (e.target.clientHeight + 5);
    console.log(e.target.scrollHeight)
    console.log(e.target.scrollTop)
    console.log(e.target.scrollHeight - e.target.scrollTop )
    console.log(e.target.clientHeight)
    console.log(bottom)
    setIsCardBottom(bottom);
  };

  return (
        <div>
        {
          isMobile ? (
            //////////
            // MOBILE
            //////////
            <div style={{
              backgroundColor: 'white',
              width: '100%',
              height: '120%',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1000,
              paddingTop: '10vh',
              paddingLeft: '10vw',
              touchAction: 'pan-y', // TODO: remove this later if scrolling is needed
              boxSizing: 'border-box', //This makes sure that padding is included in the width and height
              // overscrollBehavior: 'contain'
            }}>
              <div
                style={{
                  display: 'flex',
                  // justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: '100%',
                  position: 'fixed',
                  zIndex: 502,
                  background: 'white',
                  paddingBottom: '3vh',
                  }}
                >
                    {countryISOCode === "PG" ? (
                        <img 
                        style={{
                          marginRight: '10px',
                          marginTop: '18px',
                          marginLeft: '-15px'
                        }}
                        src="papua-new-guinea-flag.png" 
                        alt="Papua New Guinea Flag"
                        width='14px'
                        height='14px'/>
                  ) : countryISOCode === "JP" ? (
                      <img 
                      style={{
                        marginRight: '10px',
                        marginTop: '18px',
                        marginLeft: '-15px'
                      }}
                      src="japan-flag.png" 
                      alt="Japan Flag"
                      width='14px'
                      height='14px'
                    />
                  ) : countryISOCode === "VA" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="vatican-city-flag.svg" 
                    alt="Vatican City Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "MV" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="maldives-flag.svg" 
                    alt="Maldives Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "LA" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="laos-flag.svg" 
                    alt="Laos Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "SI" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="slovenia-flag.svg"
                    alt="Slovenia Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "CN" && name === "Hong Kong" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="hongkong-flag.svg"
                    alt="Hong Kong Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "CN" && name === "Macau" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="macau-flag.svg"
                    alt="Macau Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "BZ" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="belize-flag.svg"
                    alt="Belize Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "CW" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="curacao-flag.svg"
                    alt="Curacao Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "IS" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="iceland-flag.svg"
                    alt="Iceland Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "TO" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="tonga-flag.svg"
                    alt="Tonga Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "LI" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="liechtenstein-flag.svg"
                    alt="Liechtenstein Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "CV" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="cape-verde-flag.svg"
                    alt="Cape Verde Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "SL" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="sierra-leone-flag.svg"
                    alt="Sierra Leone Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "BT" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="bhutan-flag.svg"
                    alt="Bhutan Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "JM" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="jamaica-flag.svg"
                    alt="Jamaica Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "DM" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="dominica-flag.svg"
                    alt="Dominica Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "FJ" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="fiji-flag.svg"
                    alt="Fiji Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "ET" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="ethiopia-flag.svg"
                    alt="Ethiopia Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "NA" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="namibia-flag.svg"
                    alt="Namibia Flag"
                    width='14px'
                    height='14px'
                    />
                  ) : countryISOCode === "UG" ? (
                    <img 
                    style={{
                      marginRight: '10px',
                      marginTop: '18px',
                      marginLeft: '-15px'
                    }}
                    src="uganda-flag.svg"
                    alt="Uganda Flag"
                    width='14px'
                    height='14px'
                    />
                    ) : (
                        <FlagLoader 
                            style={{
                                marginRight: '10px',
                                marginTop: '18px',
                                marginLeft: '-15px'
                            }}
                            width='14px'
                            height='14px'
                            countryIsoCode={countryISOCode ? countryISOCode : 'rainbow'}
                            color='#EFEFEF' 
                            ratio={'rounded'} 
                        />
                    )}
                  <Typography 
                    variant="h1"
                    style={{
                      fontSize: '20px'
                    }}
                  >
                    {name}
                  </Typography>
                </div>
                {images && viewState === 'squares' &&
                  <ImageList
                  sx={{ 
                    width: '90%',
                    paddingTop: '5vh',
                    overflowX: 'hidden',
                    touchAction: 'pan-y',
                    overscrollBehavior: 'contain',
                    paddingBottom: '30vh'
                  }} 
                  cols={2} 
                  rowHeight={180}
                  gap={10}
                  >
                  {currentImages.map((image, index) => (
                    <ImageListItem 
                      key={image.img}
                      sx={{
                        borderRadius: '10px',
                      }}
                    >
                      {image.file_type == "video" ? (
                        <img autoplay="true"
                          key={index}
                          src={image.src  + '?width=300&height=300&func=crop'} 
                          alt={image.caption_person}
                          onClick={() => {
                            setSelectedImage(image)
                          }}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                      ) : (
                        <img
                          key={index}
                          src={image.src  + '?width=300&height=300&func=crop'} 
                          alt={image.caption_person}
                          loading="lazy"
                          onClick={() => {
                            setSelectedImage(image)
                          }}
                          style={{
                            borderRadius: '3px',
                          }}
                        />
                      )}
                        <ImageListItemBar
                          title={image.caption_person}
                          subtitle={image.caption_location}
                          sx={{
                            background: 'rgba(0, 0, 0, 0)',
                          }}
                        />
                    </ImageListItem>
                  ))}
                </ImageList>
                }
                {images && viewState === 'quilted' &&
                  <ImageList
                  sx={{ 
                    width: '90%',
                    height: '100%',
                    overflowX: 'hidden',
                    // touchAction: 'none',
                    paddingBottom: '50vh',
                    marginBottom: '10vh'
                  }} 
                  variant="quilted"
                  cols={4}
                  rowHeight={121}
                  >
                  {currentImages.map((image, index) => (
                    <ImageListItem 
                      key={image.img}
                      cols={image.cols || 1} rows={image.rows || 1}
                    >
                      {image.file_type == "video" ? (
                        <img
                          key={index}
                          src={image.src  + '?width=300&height=300&func=crop'} 
                          alt={image.caption_person}
                          onClick={() => {
                            setSelectedVideo(image.src)
                            setHeaderState('gallery_image')
                          }}
                          controls
                        />
                      ) : (
                      <img
                        key={index}
                        src={image.src  + '?width=300&height=300&func=crop'} 
                        alt={image.caption_person}
                        loading="lazy"
                        onClick={() => {
                          setSelectedImage(image)
                        }}
                        style={{
                          borderRadius: '3px',
                        }}
                      />
                      )}
                        <ImageListItemBar
                          title={name}
                          subtitle={image.alt}
                          sx={{
                            background: 'rgba(0, 0, 0, 0)',
                          }}

                        />
                    </ImageListItem>
                  ))}
                </ImageList>
                }

              {selectedImage && (
                <Modal
                open={selectedImage}
                onClose={() => {
                  setSelectedImage(null)
                  setHeaderState('default')
                  }
                }
                closeAfterTransition
              >
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 600
                  }}
                  onClick={() => {
                    setSelectedImage(null)
                    setIsImageLoaded(false)
                  }}
                  >
                    {!isImageLoaded && 
                      <img 
                      src="LoadingIcon.gif" 
                      alt="Loading..." 
                      style={{ 
                        height: '100px',
                        position: 'absolute',
                        zIndex: 10000000000
                      }} 
                    />
                    }
                    <Card
                      id="myMobileCard"
                      onScroll={handleCardScroll}
                      sx={{ 
                        maxHeight: '80%', 
                        maxWidth: '80%',
                        overflow: 'scroll',
                        paddingBottom:'50px',
                      }} 
                    >
                      <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '24px',

                          }}
                      >
                        <CardMedia
                          src={selectedImage.src} 
                          title={selectedImage.name}
                          component="img"
                          sx={{
                            maxHeight: '70vh',
                            objectFit: 'contain',
                          }}
                        />
                        { selectedImage.caption_person &&
                            <Box 
                              display="flex"
                              width="90%"
                              align="left"
                              justifyContent="flex-start"
                              alignItems="flex-end"
                              marginTop="40px"
                            >
                                <Typography
                                  paddingTop='10px'
                                  sx={{
                                    fontFamily: 'EFCircularMedium',
                                    fontSize: '20px',
                                    marginRight: '15px'
                                  }}
                                >
                                  {selectedImage.caption_person}
                                </Typography>
                            </Box>
                          }
                          {selectedImage.submitter_details &&
                            <Typography
                              paddingTop='10px'
                              display="flex"
                              width="90%"
                              align="left"
                              justifyContent="flex-start"
                              alignItems="flex-end"
                              marginTop='5px'
                              sx={{
                                fontFamily: 'EFCircularMedium',
                                fontSize: '18px',
                                color: '#DA2381 !important',
                                marginBottom: '1.25px'
                              }}
                            >
                              {selectedImage.submitter_details}
                            </Typography>
                          }
                          {
                            selectedImage.caption_location &&
                            <Typography
                            align='left'
                            paddingLeft='5%'
                            marginTop='5px'
                            sx={{
                              fontFamily: 'EFCircularBook',
                              fontSize: '18px',
                              width: '100%'
                            }}
                            >
                              {selectedImage.caption_location}
                            </Typography>
                          }
                          {
                            selectedImage.caption_text &&
                            <Typography
                              align='left'
                              paddingLeft='5%'
                              marginTop='40px'
                              sx={{
                                fontFamily: 'EFCircularBook',
                                fontSize: '18px',
                                width: '100%'
                              }}
                            >
                              {selectedImage.caption_text}
                            </Typography>
                          }
                            <Button
                            onClick={(event) => {
                              event.stopPropagation(); // prevent card from closing
                              const card = document.getElementById('myMobileCard');
                              card.scrollTop = card.scrollHeight;
                              disableRipple
                              disableFocusRipple
                              disableTouchRipple
                            }}
                            style={{
                              position: 'sticky',
                              bottom: '0px',
                              left: '100%', //somehow works to align arrow to the right
                            }}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'transparent', // Removes hover effect
                              },
                              '&:focus': {
                                outline: 'none',
                              },
                              }}
                            >
                              <img
                                src="ArrowDown.svg"
                                style={{
                                  color: 'grey',
                                  width: '40px'
                                }}
                              />
                          </Button>
                        </CardContent>
                    </Card>
                </div>
                </Modal>
              )}

                {selectedVideo && (
                    <Modal
                    open={selectedImage}
                    onClose={() => {
                      setSelectedVideo(null)
                      setHeaderState('default')
                      }
                    }
                    closeAfterTransition
                  >
                    <div style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100%', 
                        height: '100%', 
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 600
                      }}
                      onClick={() => {
                        setSelectedVideo(null)
                        setIsImageLoaded(false)
                      }}
                      >
                      {!isImageLoaded && 
                        <CircularProgress 
                        style = {{
                          position: 'absolute',
                        }}
                        />
                      }
                      <img 
                        src={selectedVideo} 
                        alt="" 
                        style={{ maxHeight: '80%', maxWidth: '80%'}} 
                        onLoad={handleImageLoad}
                        onClick={() => {
                          setSelectedVideo(null)
                          setIsImageLoaded(false)
                        }}
                        />
                    </div>
                    </Modal>
                  )}

              <Button
                onClick={onClose}
                className={{
                  root: {
                    '&:hover': {
                      backgroundColor: 'transparent', // Removes hover effect
                    },
                  }
                }}
                style={{
                  position: 'fixed',
                  left: '5%', // Adjust this value as needed
                  bottom: '12.7%',
                  color: '#000000',
                  backgroundColor: 'white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.25)',
                }}
                disableRipple //removes the ripple effect when clicked
                disableFocusRipple
                disableTouchRipple
                >
                  <div 
                  style={{
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  >
                  <NavigateBeforeIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                  <Typography
                    fontFamily={'EFCircularBook'}
                    style={{textTransform: 'none'}} // Makes sure "Map" is not all in capitals
                  >
                    Map
                  </Typography>
                  </div>

              </Button>
            </div>
          ):(

          //////////
          // DESKTOP
          //////////


          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            width: '100%',
            height: '100%',
            position: 'absolute',
            paddingTop: '10vh',
            zIndex: 500,
            backgroundColor: 'white',
          }}>
            <div style={{
              position: 'fixed',
              width: '100%',
              height: '25vh',
              background: 'white',
              top: 0,
              zIndex: 1000,
              }}
            >
              <div
                style={{
                  display:'flex'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline',
                    width: '81%',
                    paddingTop: '10vh',
                    marginLeft: '10vw',
                    position: 'fixed',
                    zIndex: 502,
                    background: 'white',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'horizontal',
                        alignItems: 'center',
                      }}
                    >
                    {countryISOCode === "PG" ? (
                        <img 
                          style={{
                            marginTop: '21px'
                          }}
                          src="papua-new-guinea-flag.png" 
                          alt="Papua New Guinea Flag"
                          width='20px'
                          height='20px'/>
                    ) : countryISOCode === "JP" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="japan-flag.png" 
                      alt="Japan Flag"
                      width='20px'
                      height='20px'
                    />
                  ) : countryISOCode === "VA" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="vatican-city-flag.svg" 
                    alt="Vatican City Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "MV" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="maldives-flag.svg" 
                    alt="Maldives Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "LA" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="laos-flag.svg" 
                    alt="Laos Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "SI" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="slovenia-flag.svg" 
                    alt="Slovenia Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "CN" && name === "Hong Kong" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="hongkong-flag.svg" 
                    alt="Hong Kong Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "CN" && name === "Macau" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="macau-flag.svg" 
                    alt="Macau Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "BZ" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="belize-flag.svg" 
                    alt="Belize Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "CW" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="curacao-flag.svg" 
                    alt="Curacao Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "IS" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="iceland-flag.svg" 
                    alt="Iceland Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "TO" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="tonga-flag.svg" 
                    alt="Tonga Flag"
                    width='20px'
                    height='20px'
                    />
                  ) : countryISOCode === "LI" ? (
                    <img 
                    style={{
                      marginTop: '21px'
                    }}
                    src="liechtenstein-flag.svg" 
                    alt="Liechtenstein Flag"
                    width='20px'
                    height='20px'
                    />
                    ) : countryISOCode === "CV" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="cape-verde-flag.svg" 
                      alt="Cape Verde Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "SL" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="sierra-leone-flag.svg" 
                      alt="Sierra Leone Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "BT" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="bhutan-flag.svg" 
                      alt="Bhutan Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "JM" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="jamaica-flag.svg" 
                      alt="Jamaica Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "DM" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="dominica-flag.svg" 
                      alt="Dominica Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "FJ" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="fiji-flag.svg" 
                      alt="Fiji Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "ET" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="ethiopia-flag.svg" 
                      alt="Ethiopia Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "NA" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="namibia-flag.svg" 
                      alt="Namibia Flag"
                      width='20px'
                      height='20px'
                      />
                    ) : countryISOCode === "UG" ? (
                      <img 
                      style={{
                        marginTop: '21px'
                      }}
                      src="uganda-flag.svg" 
                      alt="Uganda Flag"
                      width='20px'
                      height='20px'
                      />
                      ) : (
                        <FlagLoader 
                            style={{
                                marginRight: '10px',
                                marginTop: '18px',
                                marginLeft: '5px'
                            }}
                            width='20px'
                            height='20px'
                            countryIsoCode={countryISOCode ? countryISOCode : 'rainbow'}
                            color='#EFEFEF' 
                            ratio={'rounded'} 
                        />
                    )}
                      <Typography 
                        variant="h1"
                        style={{
                          fontSize: '64px'
                        }}
                      >
                        {name}
                      </Typography>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'horizontal',
                        alignItems: 'center',
                      }}
                    >
                        <div
                          style={{
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                          }}
                        >
                          <Button    
                            onClick={() => setViewState('quilted')}
                            sx={{
                              '&:hover': {
                                backgroundColor: 'transparent', // Removes hover effect
                              },
                              '&:focus': {
                                outline: 'none',
                              }
                            }}
                            disableRipple  
                            disableFocusRipple
                          >
                            <span 
                              style={{ 
                                borderBottom: viewState === 'quilted' ? '2px solid black' : 'none',
                                // paddingBottom: '2px'
                              }}
                            >
                              <SquareRoundedIcon
                              sx={{
                                color: '#191919'
                              }}
                              />
                            </span>
                            </Button>
                            <Button 
                              onClick={() => setViewState('squares')}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'transparent', // Removes hover effect
                                },
                                '&:focus': {
                                  outline: 'none',
                                },
                              }}
                              disableRipple
                              disableFocusRipple
                            > 
                            <span 
                              style={{ 
                                borderBottom: viewState === 'squares' ? '2px solid black' : 'none',
                              }}
                            >
                              <GridViewRoundedIcon
                                sx={{
                                  color: '#191919'
                                }}
                                style={{ textDecoration: viewState === 'squares' ? 'underline' : 'none' }} 
                              />
                              </span>
                            </Button>
                          </div>

                          <div
                            style={{
                              display: 'flex', 
                              justifyContent: 'flex-end', 
                            }}>
                              <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                                <KeyboardDoubleArrowLeftIcon
                                  style={{
                                    color: '#191919'
                                  }}
                                />
                              </Button>
                              <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                                <ArrowBackIosIcon
                                  style={{
                                    color: '#191919'
                                  }}
                                />
                              </Button>
                              <Typography
                                style={{
                                  fontFamily: 'EFCircularBook',
                                  margin: '1vw'
                                }}
                              > 
                                {currentPage}/{Math.ceil(images.length / imagesPerPage)}
                              </Typography>
                              <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>
                                <ArrowForwardIosIcon
                                  style={{
                                    color: '#191919'
                                  }}
                                />
                              </Button>
                              <Button onClick={() => setCurrentPage(Math.ceil(images.length / imagesPerPage))} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>
                                <KeyboardDoubleArrowRightIcon
                                  style={{
                                    color: '#191919'
                                  }}
                                />
                              </Button>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>

              <div
                style={{
                  marginLeft: '10vw',
                  marginTop: '15vh'
                }}
              >

              {images && viewState === 'squares' &&
                  <ImageList
                    sx={{ 
                      width: '88.5%',
                      height: '100%',
                      justifyContent: 'space-around'
                    }} 
                    cols={5} 
                    rowHeight={'300px'}
                    >
                    {currentImages.map((image, index) => (
                      <ImageListItem 
                        key={image.img}
                      >
                      {image.file_type == "video" ? (
                          <>
                          <img
                            style={{
                              minHeight: '100%' //Need to keep this to stop resizing image when changing screen size
                            }}
                            key={index} 
                            src={thumbnailDir + image.src.split("/").pop().split(".")[0] + '_thumbnail.png?width=250&height=250&func=crop'} 
                            // src={image.src.substring(0, image.src.lastIndexOf(".")) + ".jpg" + '?width=300&height=300&func=crop'} 
                            alt={image.caption_person}
                            onClick={() => setSelectedVideo(image)}
                          />
                                <img
                                src="play_button.svg"
                                alt="Play Button"
                                style={{ 
                                  position: 'absolute', 
                                  top: '50%', 
                                  left: '50%', 
                                  width: '50px',
                                  color: 'white',
                                  transform: 'translate(-50%, -50%)'
                                }} 
                                onClick={() => setSelectedVideo(image)}
                              />
                       </>
                        ) : (
                          <img 
                          key={index} 
                          src={image.src  + '?width=250&height=250&func=crop'} 
                          alt={image.caption_person}
                          onClick={() => setSelectedImage(image)}/>
                        )}
                          <ImageListItemBar
                            title={image.caption_person}
                            subtitle={image.caption_location}
                            sx={{
                              background: 'rgba(0, 0, 0, 0)',
                            }}
                          />
                      </ImageListItem>
                      
                    ))}
                  </ImageList>
                }
                {images && viewState === 'quilted' &&
                  <ImageList
                    sx={{ 
                      width: '90%',
                      height: '100%',
                      overflowX: 'hidden',
                      touchAction: 'none',
                    }} 
                    variant="quilted"
                    cols={4}
                    rowHeight={401}
                  >
                  {currentImages.map((image) => (
                    <ImageListItem 
                      key={image.img}
                      cols={image.cols || 1} rows={image.rows || 1}
                    >
                      {image.file_type == "video" ? (
                        <>
                        <img
                        {...srcset(
                          thumbnailDir + image.src.split("/").pop().split(".")[0] + '_thumbnail.png', 
                          400, 
                          image.rows, 
                          image.cols)}
                          alt={image.title}
                          loading="lazy"
                          onClick={() => {
                            setSelectedVideo(image)
                            setHeaderState('gallery_image')
                          }}
                          style={{
                            width: '100%',
                            height: '100%'
                          }}
                        />
                        <img
                        src="play_button.svg"
                        alt="Play Button"
                        style={{ 
                          position: 'absolute', 
                          top: '50%', 
                          left: '50%', 
                          width: '50px',
                          color: 'white',
                          transform: 'translate(-50%, -50%)'
                        }} 
                        onClick={() => setSelectedVideo(image)}
                      />
                      </>
                      ) : (
                        <img
                          {...srcset(image.src, 400, image.rows, image.cols)}
                          alt={image.title}
                          loading="lazy"
                          onClick={() => {
                            setSelectedImage(image)
                            setHeaderState('gallery_image')
                          }}
                        />
                      )}
                      <ImageListItemBar
                        title={image.caption_person}
                        subtitle={image.caption_location}
                        sx={{
                          background: 'rgba(0, 0, 0, 0)',
                        }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
                }

              </div>
              <div
              style={{
                display: 'flex', 
                justifyContent: 'flex-end', 
                marginRight: '8.9vw'
              }}>
                <Button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                  <KeyboardDoubleArrowLeftIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                </Button>
                <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                  <ArrowBackIosIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                </Button>
                <Typography
                  style={{
                    fontFamily: 'EFCircularBook',
                    margin: '1vw'
                  }}
                > 
                  {currentPage}/{Math.ceil(images.length / imagesPerPage)}
                </Typography>
                <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>
                  <ArrowForwardIosIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                </Button>
                <Button onClick={() => setCurrentPage(Math.ceil(images.length / imagesPerPage))} disabled={currentPage === Math.ceil(images.length / imagesPerPage)}>
                  <KeyboardDoubleArrowRightIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                </Button>
              </div>
  
              {selectedImage && (
                <Modal
                  open={selectedImage}
                  onClose={() => {
                    setSelectedImage(null)
                    setHeaderState('default')
                    setIsImageLoaded(false)
                    }
                  }
                  closeAfterTransition
                >
                  <div 
                    // onClick={() => {
                    //   setSelectedImage(null)
                    //   setHeaderState('default')
                    //   setIsImageLoaded(false)
                    // }}
                    style={{ 
                      position: 'fixed', 
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%', 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 10000000000,
                    }}
                    >
                    {!isImageLoaded && 
                      <img 
                      src="LoadingIcon.gif" 
                      alt="Loading..." 
                      style={{ 
                        height: '100px',
                        position: 'absolute',
                        zIndex: 10000000000
                      }} 
                    />
                    }
                    <Card
                      onScroll={handleCardScroll}
                      id="myImageCard"
                      sx={{ 
                        position: 'relative',
                        maxHeight: '90%', 
                        maxWidth: '80%',
                        overflow: 'scroll',
                        paddingBottom:'50px',
                      }} 
                    >
                      <CardContent
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '50px'
                          }}
                      >
                        <CardMedia
                          src={selectedImage.src} 
                          title={selectedImage.name}
                          component="img"
                          sx={{
                            height: '80vh', 
                            objectFit: 'contain'
                          }}
                        />
                              {
                              selectedImage.caption_person && 
                              <Box 
                                display="flex"
                                flexDirection="row"
                                width="90%"
                                justifyContent="flex-start"
                                alignItems="flex-end"
                                marginTop="40px"
                              >
                                  <Typography
                                    sx={{
                                      fontFamily: 'EFCircularMedium',
                                      fontSize: '20pt',
                                      marginRight: '15px'
                                    }}
                                  >
                                    {selectedImage.caption_person}
                                  </Typography>
                              </Box>
                              }
                              {
                                selectedImage.submitter_details &&
                                <Typography
                                  display="flex"
                                  flexDirection="row"
                                  width="90%"
                                  justifyContent="flex-start"
                                  alignItems="flex-end"
                                  marginTop='5px'
                                  sx={{
                                    fontFamily: 'EFCircularBook',
                                    fontSize: '16pt',
                                    paddingBottom: '1.5pt',
                                    color: '#DA2381 !important'
                                  }}
                                >
                                  {selectedImage.submitter_details}
                                </Typography>
                              }
                          {
                            selectedImage.caption_location &&
                            <Typography
                            align='left'
                            paddingLeft='5%'
                            marginTop='5px'
                            sx={{
                              fontFamily: 'EFCircularBook',
                              fontSize: '16pt',
                              width: '100%'
                            }}
                            >
                              {selectedImage.caption_location}
                            </Typography>
                          }
                          {
                            selectedImage.caption_text &&
                            <Typography
                              align='left'
                              paddingLeft='5%'
                              marginTop='40px'
                              sx={{
                                fontFamily: 'EFCircularBook',
                                fontSize: '18pt',
                                width: '100%'
                              }}
                            >
                              {selectedImage.caption_text}
                            </Typography>
                          }
                          {!isCardBottom && 
                            <Button
                              onClick={() => {
                                const card = document.getElementById('myImageCard');
                                card.scrollTop = card.scrollHeight;
                              }}
                              style={{
                                position: 'sticky',
                                height: '0px',
                                bottom: '0px',
                                left: '100%', //somehow works to align arrow to the right
                              }}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'transparent', // Removes hover effect
                                },
                                '&:focus': {
                                  outline: 'none',
                                },
                                }}
                                disableRipple
                                disableFocusRipple
                                disableTouchRipple
                            >
                              <img
                                src="ArrowDown.svg"
                                style={{
                                  position: 'sticky',
                                  bottom: '0px',
                                  left: '100%', //somehow works to align arrow to the right
                                  color: 'grey',
                                  width: '40px'
                                }}
                              />
                            </Button>
                          }
                        </CardContent>
                    </Card>
                    <button 
                      style={{
                        position: 'absolute',
                        top: '0px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '2em',
                      }}
                    onClick={() => {
                      setSelectedImage(null)
                      setHeaderState('default')
                      setIsImageLoaded(false)
                    }}
                    >
                    <IconClose
                      style={{
                        color: '#EFEFEF'
                      }}
                    />
                    </button>
                  </div>
                </Modal>
              )}
              {selectedVideo && (
                <Modal
                  open={selectedVideo}
                  onClose={() => {
                    setSelectedVideo(null)
                    setHeaderState('default')
                    setIsImageLoaded(false)
                    }
                  }
                  closeAfterTransition
                >
                  <div 
                    style={{ 
                      position: 'fixed', 
                      top: 0, 
                      left: 0, 
                      width: '100%',
                      height: '100%', 
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 10000000000,
                    }}
                    >
                    {!isVideoLoaded && 
                      <img 
                      src="LoadingIcon.gif" 
                      alt="Loading..." 
                      style={{ 
                        height: '100px',
                        position: 'absolute',
                        zIndex: 10000000000
                      }} 
                    />
                    }
                    {/* <video 
                      src={selectedVideo} 
                      alt="" 
                      style={{ 
                        maxHeight: '80%', 
                        maxWidth: '80%'
                      }} 
                      onCanPlay={handleImageLoad}
                      controls
                      /> */}
                      <Card
                        id='myVideoCard'
                        onScroll={handleCardScroll}
                        sx={{ 
                          maxHeight: '90%', 
                          maxWidth: '80%',
                          overflow: 'scroll',
                          paddingBottom:'50px',
                        }} 
                      >
                        <CardContent
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: '50px',
                            }}
                        >
                          <CardMedia
                            src={selectedVideo.src} 
                            title={selectedVideo.name}
                            component="img"
                            sx={{
                              maxHeight: '70vh',
                              objectFit: 'contain'
                            }}
                          />
                                {
                                selectedVideo.caption_person && 
                                <Box 
                                  display="flex"
                                  flexDirection="row"
                                  width="90%"
                                  justifyContent="flex-start"
                                  alignItems="flex-end"
                                  marginTop="40px"
                                >
                                    <Typography
                                      sx={{
                                        fontFamily: 'EFCircularMedium',
                                        fontSize: '20pt',
                                        marginRight: '15px'
                                      }}
                                    >
                                      {selectedVideo.caption_person}
                                    </Typography>
                                </Box>
                                }
                                {
                                  selectedVideo.submitter_details &&
                                  <Typography
                                    display="flex"
                                    flexDirection="row"
                                    width="90%"
                                    justifyContent="flex-start"
                                    alignItems="flex-end"
                                    sx={{
                                      fontFamily: 'EFCircularBook',
                                      fontSize: '16pt',
                                      paddingBottom: '1.5pt',
                                      color: '#DA2381 !important'
                                    }}
                                  >
                                    {selectedVideo.submitter_details}
                                  </Typography>
                                }
                            {
                              selectedVideo.caption_location &&
                              <Typography
                              align='left'
                              paddingLeft='5%'
                              marginTop='5px'
                              sx={{
                                fontFamily: 'EFCircularBook',
                                fontSize: '16pt',
                                width: '100%'
                              }}
                              >
                                {selectedVideo.caption_location}
                              </Typography>
                            }
                            {
                              selectedVideo.caption_text &&
                              <Typography
                                align='left'
                                paddingLeft='5%'
                                marginTop='40px'
                                sx={{
                                  fontFamily: 'EFCircularBook',
                                  fontSize: '18pt',
                                  width: '100%'
                                }}
                              >
                                {selectedVideo.caption_text}
                              </Typography>
                            }
                            {!isCardBottom && 
                              <Button
                              onClick={() => {
                                const card = document.getElementById('myVideoCard');
                                card.scrollTop = card.scrollHeight;
                              }}
                              style={{
                                position: 'sticky',
                                bottom: '0px',
                                left: '100%', //somehow works to align arrow to the right
                              }}
                              sx={{
                                '&:hover': {
                                  backgroundColor: 'transparent', // Removes hover effect
                                },
                                '&:focus': {
                                  outline: 'none',
                                },
                                }}
                              disableRipple
                              disableFocusRipple
                              disableTouchRipple
                              >
                                <img
                                  src="ArrowDown.svg"
                                  style={{
                                    position: 'sticky',
                                    bottom: '0px',
                                    left: '100%', //somehow works to align arrow to the right
                                    color: 'grey',
                                    width: '40px'
                                  }}
                                />
                              </Button>
                              }
                          </CardContent>
                      </Card>
                    <button 
                      style={{
                        position: 'absolute',
                        top: '0px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        fontSize: '2em',
                      }}
                      onClick={() => {
                        setSelectedVideo(null)
                        setHeaderState('default')
                        setIsVideoLoaded(false)
                      }}
                    >
                      
                      <IconClose/>
                    </button>
                  </div>
                </Modal>
              )}
              <Button
                onClick={onClose}
                sx={{
                    '&:hover': {
                      backgroundColor: 'transparent', // Removes hover effect
                    },
                    '&:focus': {
                      outline: 'none',
                    },
                }}
                style={{
                  position: 'fixed',
                  left: '10px',
                  bottom: '10px',
                  top: '10%',
                  flexDirection: 'column',
                  color: '#000000',
                  alignContent: 'center',
                  width: '10vw'
                }}
                disableRipple //removes the ripple effect when clicked
                disableFocusRipple
                disableTouchRipple
                >
                  <NavigateBeforeIcon
                    style={{
                      color: '#191919'
                    }}
                  />
                  <Typography
                    fontFamily={'EFCircularBook'}
                    style={{textTransform: 'none'}} // Makes sure "Map" is not all in capitals
                  >
                  Map
                  </Typography>
              </Button>
            </div>
          )
        }
        </div>
  );
}
