'use client'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, {useState, useEffect, useRef} from "react"
import { useSearchParams } from 'next/navigation'
import { HeaderState } from './components/headerState';
import { IntroState } from './components/introState';
import { Typography } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import RadialProgressBar from './components/RadialProgressBar';
import ClearIcon from '@mui/icons-material/Clear';
import { 
    Marker
} from "react-map-gl";
import './animation.css'; // Import the CSS file where you define your animation
import LocationGallery from './components/LocationGallery';
import {Map, Popup, NavigationControl} from 'react-map-gl';
const MAPBOX_TOKEN = "pk.eyJ1IjoiYXJpZWxjYXJsb3NjYW5ldGUiLCJhIjoiY2thZ3J5enBpMGJvcTJ4cG5xNndlM3hldSJ9.Fsyf28yyWJv8D_anecSkOQ";
import 'mapbox-gl/dist/mapbox-gl.css';
import {IconPlusCircle} from '@ef-global/backpack-icons'
import {IconMinusCircle} from '@ef-global/backpack-icons'
import { ReactComponent as Pin } from '../../public/EF_pin_final.svg';
import smiley02 from '../../public/smileys/Smiley_60fps_02.gif'
import smiley03 from '../../public/smileys/Smiley_60fps_03.gif'
import smiley04 from '../../public/smileys/Smiley_60fps_04.gif'
import smiley05 from '../../public/smileys/Smiley_60fps_05.gif'
import smiley06 from '../../public/smileys/Smiley_60fps_06.gif'


// Basic Example
export default function MapChart() {
  const {headerState, setHeaderState} = React.useContext(HeaderState);
  const {isIntroVisible, setIsIntroVisible} = React.useContext(IntroState);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1);
  const [cityImages, setCityImages] = useState({});
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [countriesData, setCountriesData] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [zoomState, setZoomState] = useState(4);
  const [countryISOCode, setCountryISOCode] = useState(null);
  const searchParams = useSearchParams();
  const lon = searchParams.get('lon')
  const lat = searchParams.get('lat')
  const zoom = searchParams.get('zoom')
  const mapRef = useRef();
  const colors = ["pink"];

  const isMobile = useMediaQuery('(max-width:600px)')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIntroVisible(false);
    }, 5000); // Change this value to control how long the text is visible
  
    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextOpacity(0);
    }, 4000); // Change this value to control how long the text is visible
  
    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  useEffect(() => {
    const onPopState = () => {
      if (isGalleryOpen) {
        window.location.reload();
      }
    };
  
    window.addEventListener('popstate', onPopState);
  
    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [isGalleryOpen]);


  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      const pinImage = new Image();
      // pinImage.src = `data:image/svg+xml,${encodeURIComponent(pin)}`;
      pinImage.src = "../../public/marker/Pin_pink.svg";
      pinImage.onload = () => {
        map.addImage('pin', pinImage);
      };
    }
  }, []);

  useEffect(() => {
    // fetch('/city_images.json')
    fetch('/gallery_images.json')
      .then(response => response.json())
      .then(data => setCityImages(data));
  }, []);

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    fetch(
      'markers.json'
      )
    .then(response => response.json())
    .then(data => {
    // Assign a random color to each marker
    const coloredMarkers = data.map(marker => ({
      ...marker,
      color: getRandomColor(),
    }));
    setMarkers(coloredMarkers);
  });
}, []);

useEffect(() => {
  fetch(`/score_countries.json`)
    .then(response => response.json())
    .then(data => setCountriesData(data));
}, []);

  const handleMarkerClick = (folder_name, name, country_ISO) => {
    // const handleMarkerClick = () => {
    setSelectedMarker(folder_name);
    setCityName(name);
    setIsGalleryOpen(true);
    setHeaderState('gallery');
    setIsIntroVisible(false);
    setCountryISOCode(country_ISO)

    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set('gallery', folder_name);
    window.history.pushState({}, '', currentUrl.toString());
  };

  const handleMarkerClose = () => {
    setSelectedMarker(null);
    setCityName(null);
    setIsGalleryOpen(false);
    setHeaderState('default');
    setCountryISOCode(null)

    const currentUrl = new URL(window.location.href);
    currentUrl.search = '';
    window.history.pushState({}, '', currentUrl.toString());
  }

  const zoomIn = () => {
    const map = mapRef.current;
    map.zoomIn();
  };
  
  const zoomOut = () => {
    const map = mapRef.current;
    map.zoomOut();
  };

  return(
    <div>

            {isIntroVisible && mapLoaded && (
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  pointerEvents: 'none',
                }}
              >
               <div >
                    <img 
                      key={'smiley02'} 
                      src={'/smileys/Smiley_60fps_02.gif'} 
                      alt="Smiley" 
                      className= {isMobile ? "moving-gif-1-mobile" : "moving-gif-1-desktop"}
                      style={{
                        width: isMobile ? "40%" : "20%",
                        zIndex: 10000,
                        position: 'absolute',
                        top: '40vh'
                      }}
                    />
                   <img 
                    key={'smiley03'} 
                    src={'/smileys/Smiley_60fps_03.gif'} 
                    alt="Smiley" 
                    className= {isMobile ? "moving-gif-2-mobile" : "moving-gif-2-desktop"}
                    style={{
                      width: isMobile ? "40%" : "20%",
                      zIndex: 10000,
                      position: 'absolute',
                      top: '10vh',
                    }}
                  />
                  <img 
                    key={'smiley04'} 
                    src={'/smileys/Smiley_60fps_04.gif'} 
                    alt="Smiley" 
                    className= {isMobile ? "moving-gif-3-mobile" : "moving-gif-3-desktop"}
                    style={{
                      width: isMobile ? "40%" : "20%",
                      zIndex: 10000,
                      position: 'absolute',
                      top: '30vh',
                    }}
                  />
                    <img 
                    key={'smiley06'} 
                    src={'/smileys/Smiley_60fps_06.gif'} 
                    alt="Smiley" 
                    className= {isMobile ? "moving-gif-4-mobile" : "moving-gif-4-desktop"}
                    style={{
                      width: isMobile ? "40%" : "20%",
                      zIndex: 10000,
                      position: 'absolute',
                      top: '5vh',
                    }}
                  />
                </div>
              <div className="fade-text"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 1000,
                textAlign: "center",
                opacity: textOpacity,
                transition: 'opacity 2s ease-out'
              }}
              >
                <Typography variant='h1'
                  style={{
                    fontSize: isMobile ? "10vw" : "100px", 
                    color: "black",
                    zIndex: 1000,
                    whiteSpace: "nowrap",
                    userSelect: 'none'
                  }}
              >
                  EF Everywhere
                </Typography>
              </div>
              </div>
              )}

            {isIntroVisible == false && mapLoaded && showPopup && (
              <div style={{ 
                  position: 'absolute', 
                  top: isMobile ? '15%' : '15%',
                  // left: isMobile ? '80%' : '79.25%', 
                  right: isMobile ? '5%' : '10.20%',
                  // transform: 'translate(-50%, -50%)',
                  height: isMobile ? '10' : '150',
                  width: isMobile ? '10' : '50',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  background: 'transparent',
                  zIndex: 500,
                  }}
                  onTouchMove={(e) => e.preventDefault()}
                  overflow='hidden'
                >
                    <Card 
                    sx={{ 
                        position: 'relative',
                        height: isMobile ? '100' : '125',
                        paddingTop: isMobile ? '10px' : '10px',
                        paddingBottom: isMobile ? '10px' : '0px !important',
                      }}>
                        <CardContent
                          sx={{
                            paddingBottom: isMobile ? '5px !important' : '0px',
                            paddingLeft: isMobile ? '10px !important' : '10px',
                            paddingRight: isMobile ? '10px !important' : '10px',
                            paddingTop: isMobile ? '10px' : '0px',
                            width: isMobile ? '150px !important' : '130',
                            minWidth: isMobile ? '40px !important' : '150',
                            "&:last-child": {
                              paddingBottom: isMobile ? '10px' : '5px'
                            },
                          }}

                        >
                            <RadialProgressBar 
                              percentage={countriesData['world']['occupied']/countriesData['world']['total']*100} 
                              textTop={countriesData['world']['text']}
                              textRadial={countriesData['world']['occupied']}
                              textBottom={`out of`}
                              textBottomSecond={`${countriesData['world']['total']} countries`}
                              height= {isMobile ? '140': '140'}
                              width= {isMobile ? '145' : '145'}
                              fontSize= {isMobile ? '18px': '20px'}
                              dataLabelSize={isMobile ? 30 : 30}
                              borderRadius='40px'
                              dataLabelOffset={isMobile? 11 : 11.5}
                              isMobile={isMobile}
                              lineHeight='1.0'
                              hollowSize= {isMobile ? '50%': '55%'}
                              marginTop= {isMobile ? '0vh': '35vh'}
                              translateX= {isMobile ? '-8px' : '0px' }
                              translateY= {isMobile ? '0px' : '0px' }
                            />

                        </CardContent>
                    </Card>
              </div>
            )}

              
      <Map
      initialViewState={{
        latitude:  lat ? lat : 55.70584,
        longitude: lon ? lon : 13.19321, 
        dragRotate: false,
        zoom: zoom ? zoom : 4
      }}
      dragRotate = {false}
      touchZoomRotate = {'disableRotation'}
      style={{
        width: '100vw', 
        height: '100vh'
      }}
      ref={mapRef}
      mapStyle="mapbox://styles/arielcarloscanete/clvg7hufp015801phbgcbboxc"
      onZoom={(e) => { setZoomState(e.viewState.zoom); }}
      onLoad={(event) => {
        const map = event.target;
        map.touchZoomRotate.disableRotation();
        setMapLoaded(true)
      }}
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* {isMobile == false && (
        <NavigationControl 
          position='bottom-left'
          showCompass={false}
        />
      )} */}
      {isMobile == false && (
        <div style={{ 
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute', 
          bottom: '10vh', 
          left: '5vw' 
          }}>
          <button 
            onClick={zoomIn}
            style={{marginBottom: '10px'}}
            >
            <IconPlusCircle 
            style={{
              fontSize: '25px'
            }}
            />
          </button>
          <button onClick={zoomOut}>
            <IconMinusCircle 
            style={{
              fontSize: '25px'
            }}
            />
          </button>
        </div>
      )}


      {
        markers.map(({folder_name, name, coords, country, country_ISO}) => {
          return (<>
          <Marker 
            key={`marker-${folder_name}`}
            longitude={coords[1]} 
            latitude={coords[0]} 
            color="#FF329B"
            anchor="bottom"
            onClick={() => handleMarkerClick(folder_name, name, country_ISO)}
          >
            {/* <img
             style={{ // width:height proportions should be 5:6
                width: '25px',
                height: '30px',
                cursor: 'pointer',
             }}
             src='./Pin_pink.png'
             alt='map_pin'
            /> */}
            
          </Marker>
          {zoomState > 4 && (
            <Popup
              size="small"
              longitude={coords[1]}
              latitude={coords[0]}
              closeButton={false}
              closeOnClick={false}
              anchor="bottom"
              offset={[0,-60]}
              tipSize={0}
            >
              <Typography
              style={{
                fontFamily: 'EFCircularBold'
              }}
              >
                {name}
              </Typography>
            </Popup>
          )}
          </>
          );
        })}
      </Map>
      {isGalleryOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <LocationGallery
              onClose={() => handleMarkerClose()} 
              marker={selectedMarker}
              name={cityName}
              images={cityImages[selectedMarker]}
              countryISOCode={countryISOCode} />
        </div>
         )}
    </div>
  )
}