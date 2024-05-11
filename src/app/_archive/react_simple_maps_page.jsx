'use client'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, {useState, useEffect} from "react"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import styled from 'styled-components';
import { Roboto } from 'next/font/google';
import { Typography } from "@mui/material";
import { 
    ComposableMap, 
    Geographies,
    ZoomableGroup,
    Geography, 
    Marker
} from "react-simple-maps"
import { geoCentroid, geoMercator, geoBounds } from 'd3-geo';
import Gallery from './components/Gallery';
import CustomMarker from './components/CustomMarker';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
  });

const geoUrl =
    // "/world_map.geojson"
    "/world_map_plus.geojson"
    // "/US_and_china.geojson"
    // "/china_regions.geojson"
    // "/us_states.geojson"

const StyledGeography = styled(Geography)`
    fill: #E5FFE5; /* Set the fill color to the default color */
    outline: none; /* Remove the outline */
    transition: none !important; /* Remove any transitions */

    &:hover,
    &:focus,
    &:active {
        fill: #E5FFE5 !important; /* Set the fill color to the default color on hover, focus, and active */
        outline: none !important; /* Remove the outline on hover, focus, and active */
    }
`;

const projection = geoMercator()
  // .center([0, 0]) // set the center of the projection
  // .scale(100) // set the scale of the projection

export default function MapChart() {
  const [isTextVisible, setTextVisible] = useState(true);
  const [textOpacity, setTextOpacity] = useState(1);
  const [geographies, setGeographies] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [cityImages, setCityImages] = useState({});

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const [zoom, setZoom] = useState(2);
  const [zoomableGroupCenter, setZoomableGroupCenter] = useState([13.19321, 55.70584]);

  const countriesToExclude = ['Macao']

  const isMobile = useMediaQuery('(max-width:600px)')
  // const colors = ["blue1", "blue2", "pink", "purple1", "purple2"];
  const colors = ["pink"];
  const mapWidth = 800;
  const mapHeight = 600;
  const maxZoom = isMobile ? 15: 15;
  const minZoom = isMobile ? 2: 2;
  
  const shiftX = 0;
  const shiftY = -100000;

  const strokeDashStyle = '0.25,0.5'
  // Different ways to do this:
  // Solid line (default): strokeDasharray: 'none'
  // Own style: '0.5,0.5'
  // Dotted line: strokeDasharray: '1,2'
  // Dashed line: strokeDasharray: '5,5'
  // Long dashed line: strokeDasharray: '10,10'
  // Dash-dotted line: strokeDasharray: '10,2,2,2'

  function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextVisible(false);
    }, 3000); // Change this value to control how long the text is visible
  
    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTextOpacity(0);
    }, 1000); // Change this value to control how long the text is visible
  
    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  useEffect(() => {
    // fetch('/city_images.json')
    fetch('/gallery_images.json')
      .then(response => response.json())
      .then(data => setCityImages(data));
  }, []);

  useEffect(() => {
      fetch(
        // '/marker_countries.json'
        // '/test_markers.json'
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

  const handleMarkerClick = (folder_name, name) => {
    setSelectedMarker(folder_name);
    setCityName(name);
    setIsGalleryOpen(true);
    // router.push(`/gallery/${name}`);
  };

  const handleWheel = (event) => {
    event.preventDefault();

    if (event.deltaY < 0) {
      // Scrolling up, zoom out
      setZoom(prevZoom => Math.min(prevZoom + 0.1, maxZoom)); // Adjust max zoom level as needed
    } else {
      // Scrolling down, zoom in
      setZoom(prevZoom => Math.max(prevZoom - 0.1, minZoom)); // Adjust min zoom level as needed
    }
  };

  const zoomInClick = () => {
    var new_zoom = zoom + 1
    if (new_zoom > maxZoom){
      new_zoom = maxZoom
    }
    setZoom(new_zoom)
  }

  const zoomOutClick = () => {
    var new_zoom = zoom - 1
    if (new_zoom < minZoom){
      new_zoom = minZoom
    }
    setZoom(new_zoom)
  }

  // useEffect(() => {
  //   window.addEventListener('wheel', handleWheel, { passive: false });
  //   return () => {
  //     window.removeEventListener('wheel', handleWheel);
  //   };
  // }, [handleWheel]);

    return (
        <div 
            id='map-container'
            style={{ 
                backgroundColor: '#2FC8F2',
                height: '100vh',
                width: '100vw',
                position: 'absolute',
                top: 0,
                left: 0,
                overflow: 'hidden' // solves issue of white space under the map
        }}>

            {isTextVisible && (
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
                    // fontWeight: 500,
                    zIndex: 1000,
                    whiteSpace: "nowrap",
                    userSelect: 'none'
                  }}
              >
                  EF Everywhere
                </Typography>
              </div>
              )}
            {isGalleryOpen && (
                    <Gallery
                        onClose={() => setIsGalleryOpen(false)} 
                        marker={selectedMarker}
                        name={cityName}
                        images={cityImages[selectedMarker]} />
         )}
         <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <ComposableMap 
                projection="geoMercator"
                projectionConfig = {{
                  center: [13.19321, 55.70584],
                  scale: 135
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: isMobile ? '100vw' : 'none', // Modify this line
                  maxHeight: isMobile ? '100vh' : 'none', // Modify this line
                }}
            >
                <ZoomableGroup 
                  zoom={zoom} 
                  onMoveEnd={({ coordinates, zoom }) => {
                    setZoomableGroupCenter(coordinates)
                    setZoom(zoom)
                  }}
                  center={zoomableGroupCenter}
                  translateExtent={isMobile ?  [[0, 0], [window.innerWidth * 2, window.innerHeight * 1]]:[[50, 0], [735, 845]]} // Handles Min[X, Y] and Max[X, Y]
                                                                                               // Min X = from left
                                                                                               // Min Y = from top
                                                                                               // Max X = to right
                                                                                               // Max Y = to bottom
                  maxZoom={maxZoom} // Maximum zoom level
                  minZoom={minZoom} // Minimum zoom level
                  >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) => {
                            setGeographies(geographies)
                            
                            return geographies.map((geo) => (
                            <g key={geo.rsmKey}>
                                <StyledGeography 
                                    key={geo.rsmKey} 
                                    geography={geo}
                                    stroke="#2FC8F2"
                                    strokeWidth={geo.properties.SOVEREIGNT ? 0.3: 0.1}
                                    style={{
                                        default: { 
                                          strokeDasharray: geo.properties.SOVEREIGNT ? 'none' : strokeDashStyle
                                        },
                                        hover:{
                                          strokeDasharray: geo.properties.SOVEREIGNT ? 'none' : strokeDashStyle
                                        },
                                        pressed: {
                                          strokeDasharray: geo.properties.SOVEREIGNT ? 'none' : strokeDashStyle
                                        }
                                        
                                    }}
                                  />

                            </g>
                          ))}
                        }
                    </Geographies>

                        {geographies.map((geo) => (
                          <Marker 
                          key={"name-" + geo.rsmKey} 
                          coordinates={
                            geo.properties.NAME == 'France'? geo.properties.forced_coords: geoCentroid(geo)
                            }>
                            <text
                              y=''
                              textAnchor="middle"
                              style={{
                                fill: '#0080B0',
                                userSelect: 'none',
                                fontSize: geo.properties.SOVEREIGNT ? '2px': '1px',
                              }}
                            >
                              {countriesToExclude.includes(geo.properties.NAME) ? null : geo.properties.NAME}
                            </text>
                          </Marker>
                        )
                        )
                      }
                  

                    
                    {markers.map(({ folder_name, name, color, coords }) => (
                    <Marker 
                        onClick={() => handleMarkerClick(folder_name, name)}
                        key={name} 
                        coordinates={coords}
                        style={{ cursor: 'pointer'}}
                        onMouseEnter={() => setHoveredMarker(folder_name)} // Set the hovered marker when the mouse enters
                        onMouseLeave={() => setHoveredMarker(null)} // Clear the hovered marker when the mouse leaves
                    >
                        <CustomMarker 
                          color={color} 
                          folder_name={folder_name} 
                          markerScale={0.05}
                          style={{
                            // transformOrigin: 'center center', // Add this line
                          }}
                          />
                        { ((hoveredMarker === folder_name) || (zoom > 10)) && (
                          <foreignObject
                          y="-8"
                          x="-4"
                          width='8px'
                          height='10px'
                          style={{
                            pointerEvents: 'none', // Disables pointer events, cursor keeps pointer
                          }}
                          >
                            <div
                              style={{
                                  backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
                                  borderRadius: '0.05px', // Rounded corners
                                  padding: '1px', // Some padding
                                  display: 'flex', // Center the text horizontally and vertically
                                  justifyContent: 'center',
                                  textAlign: 'center',
                                  alignItems: 'center',
                              }}
                            >
                              <text
                                style={{ 
                                  fontSize: "1px",
                                  fontFamily: 'EFCircularBold',
                                  cursor: 'pointer',
                                  userSelect: 'none'
                                }}
                              >
                            {name}
                              </text>
                            </div>
                          </foreignObject>
                          )}
                    </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
            <div 
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                position: 'absolute',
                bottom: isMobile ? 70 : '10vh',
                left: isMobile ? '10vw' : '5vw' 
              }}
            >
              <button 
                onClick={() => {
                  zoomInClick()
                }}
                style={{
                  background: 'transparent',
                  border: 'none'
                }}
                disabled={zoom >= maxZoom}
              >
                <AddCircleIcon
                sx={{
                  width: '24px',
                  height: '24px'
                }}
                />
              </button>
              <button 

                onClick={() => {
                  zoomOutClick()
                }}
                style={{
                  background: 'transparent',
                  border: 'none'
                }}
                disabled={zoom <= minZoom}
              >
                <RemoveCircleIcon
                  sx={{
                    width: '24px',
                    height: '24px'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
    )
}
