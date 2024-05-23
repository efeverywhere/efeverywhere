'use client'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, {useState, useEffect, useRef, useMemo} from "react"
import { HeaderState } from './components/headerState';
import { IntroState } from './components/introState';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
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

  const handleMarkerClick = (folder_name, name) => {
    // const handleMarkerClick = () => {
    setSelectedMarker(folder_name);
    setCityName(name);
    setIsGalleryOpen(true);
    setHeaderState('gallery');
    setIsIntroVisible(false);
  };

  const handleMarkerClose = () => {
    setSelectedMarker(null);
    setCityName(null);
    setIsGalleryOpen(false);
    setHeaderState('default');
  }

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
                  top: isMobile ? '45%' : '50%',
                  left: '50%', 
                  transform: 'translate(-50%, -50%)',
                  width: '400',
                  height: '400',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  background: 'transparent',
                  zIndex: 500,
                  }}
                  onTouchMove={(e) => e.preventDefault()}
                  overflow='hidden'
                >
                    <Card sx={{ 
                        // background: 'transparent',
                        position: 'relative',
                        width: '400',
                        height: '400',
                        paddingTop: '30px',
                        paddingBottom: '30px',
                      }}>
                        <CardContent
                        >
                            <RadialProgressBar 
                              percentage={countriesData['world']['occupied']/countriesData['world']['total']*100} 
                              textTop={countriesData['world']['text']}
                              textRadial={countriesData['world']['occupied']}
                              textBottom={`out of ${countriesData['world']['total']} countries`}
                              height= {isMobile ? '170': '350'}
                              width= {isMobile ? '200' : '350'}
                              fontSize='30px'
                              dataLabelSize={isMobile ? 50 : 130}
                              borderRadius='40px'
                              dataLabelOffset={isMobile? 20 : 45}
                              isMobile={isMobile}
                              lineHeight='1.0'
                            />

                        </CardContent>

                        <button 
                          style={{
                            position: 'absolute',
                            top: isMobile ? '0px' : '0px',
                            right: isMobile ? '40px' : '40px',
                            background: 'transparent',
                            border: 'none',
                            color: 'black',
                            fontSize: '2em',
                            width: 0
                          }}
                          onClick={() => {
                            setShowPopup(false)
                          }}
                        >
                          <ClearIcon/>
                        </button>
                    </Card>
              </div>
            )}

              
      <Map
      initialViewState={{
        latitude: 55.70584,
        longitude: 13.19321, 
        dragRotate: false,
        zoom: 4
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
      {isMobile == false && (
        <NavigationControl 
          position='bottom-left'
          showCompass={false}
        />
      )}


      {
        markers.map(({folder_name, name, coords}) => {
          return (<>
          <Marker 
            key={`marker-${folder_name}`}
            longitude={coords[1]} 
            latitude={coords[0]} 
            color="#FF329B"
            anchor="bottom"
            onClick={() => handleMarkerClick(folder_name, name)}
          >
            <img
             style={{ // width:height proportions should be 5:6
                width: '25px',
                height: '30px',
                cursor: 'pointer',
             }}
             src='./EF_pin_final.png'
             alt='map_pin'
            />
            
          </Marker>
          {zoomState > 4 && (
            <Popup
              size="small"
              longitude={coords[1]}
              latitude={coords[0]}
              closeButton={false}
              closeOnClick={false}
              anchor="bottom"
              offset={[0,-40]}
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
              images={cityImages[selectedMarker]} />
        </div>
         )}
    </div>
  )
}