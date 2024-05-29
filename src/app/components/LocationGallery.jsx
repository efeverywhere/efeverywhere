
import React from 'react';
import { ReactElement, useState, useEffect } from 'react';
import { HeaderState } from './headerState';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Modal from '@mui/material/Modal';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SquareRoundedIcon from '@mui/icons-material/SquareRounded';
import {IconClose} from '@ef-global/backpack-icons'
import CircularProgress from '@mui/material/CircularProgress';



export default function LocationGallery({ onClose, name, images }) {

  const isMobile = useMediaQuery('(max-width:600px)')

  // Replace this with your actual data
  const {headerState, setHeaderState} = React.useContext(HeaderState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
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

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };


  useEffect(() => {console.log(images)}, [images])

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
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: '100%',
                  position: 'fixed',
                  zIndex: 502,
                  background: 'white',
                  paddingBottom: '3vh',
                  }}
                >
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
                            setSelectedImage(image.src)
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
                            setSelectedImage(image.src)
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
                          setSelectedImage(image.src)
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
                      <CircularProgress 
                      style = {{
                        position: 'absolute',
                      }}
                      />
                    }
                  <img 
                    src={selectedImage} 
                    alt="" 
                    style={{ maxHeight: '80%', maxWidth: '80%'}} 
                    onLoad={handleImageLoad}
                    onClick={() => {
                      setSelectedImage(null)
                      setIsImageLoaded(false)
                    }}
                    />
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
            // maxHeight: '100%',
            // overflowY: 'auto',
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
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  width: '81%',
                  paddingTop: '15vh',
                  marginLeft: '10vw',
                  position: 'fixed',
                  zIndex: 502,
                  background: 'white'
                  }}
                >
                  <Typography 
                    variant="h1"
                    style={{
                      fontSize: '64px'
                    }}
                  >
                    {name}
                  </Typography>
                  <div>
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
                        // paddingBottom: '2px'
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
                            onClick={() => setSelectedVideo(image.src)}
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
                                onClick={() => setSelectedVideo(image.src)}
                              />
                       </>
                        ) : (
                          <img 
                          key={index} 
                          src={image.src  + '?width=250&height=250&func=crop'} 
                          alt={image.caption_person}
                          onClick={() => setSelectedImage(image.src)}/>
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
                            setSelectedVideo(image.src)
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
                        onClick={() => setSelectedVideo(image.src)}
                      />
                      </>
                      ) : (
                        <img
                          {...srcset(image.src, 400, image.rows, image.cols)}
                          alt={image.title}
                          loading="lazy"
                          onClick={() => {
                            setSelectedImage(image.src)
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
                marginRight: '10vw'
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
                    onClick={() => {
                      setSelectedImage(null)
                      setHeaderState('default')
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
                      src={selectedImage} 
                      alt="" 
                      style={{ 
                        maxHeight: '80%', 
                        maxWidth: '80%'
                      }} 
                      onLoad={handleImageLoad}
                      onClick={() => {
                        setSelectedImage(null)
                        setHeaderState('default')
                        setIsImageLoaded(false)
                      }}/>
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
                        setIsImageLoaded(false)
                      }}
                    >
                    <IconClose
                      style={{
                        color: '#191919'
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
                    <video 
                      src={selectedVideo} 
                      alt="" 
                      style={{ 
                        maxHeight: '80%', 
                        maxWidth: '80%'
                      }} 
                      onLoad={handleImageLoad}
                      controls
                      />
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
                        setIsImageLoaded(false)
                      }}
                    >
                      {/* <Typography>
                      Close
                      </Typography> */}
                      
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
