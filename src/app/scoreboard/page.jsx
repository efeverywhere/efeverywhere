'use client'
import React, {Suspense, useEffect, useState, useRef} from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Carousel as EFCarousel} from '@ef-global/backpack/Carousel'
import {
  SurfaceCard,
  SurfaceCardContent,
} from '@ef-global/backpack/SurfaceCard';
import { Grid } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import RadialProgressBar from '../components/RadialProgressBar';
import Footer from '../components/Footer';
import "@fontsource/noto-sans";

const countries = './score_countries.json';

function PageContent(){
  const [countriesData, setCountriesData] = useState(null);
  const searchParams = useSearchParams()
  const scope = searchParams.get('scope')
  const isMobile = useMediaQuery('(max-width:600px)')

    // Inside your component
  const carouselRef = useRef(null);
  const expandMoreIconRef = useRef(null);
  const asiaPacificRef = useRef(null);
  const americasRef = useRef(null);
  const africaRef = useRef(null);

  // const scrollToBottom = () => {
  //   if (expandMoreIconRef.current.parentDiv) {
  //     const parentDiv = expandMoreIconRef.current.parentDiv;
  //     if (parentDiv) {
  //       parentDiv.scrollTop = parentDiv.scrollHeight;
  //     }
  //   }
  //   console.log(parentDiv)
  // };

  const scrollToBottom = (ref) => {
    if (ref.current) {
      const parentDiv = ref.current.closest('div[class*="ef-surface"]');
      if (parentDiv) {
        parentDiv.scrollTop = parentDiv.scrollHeight;
      }
      console.log(parentDiv)
    }

  };

  useEffect(() => {
    fetch(`/score_countries.json`)
      .then(response => response.json())
      .then(data => {
              data.asia_pacific.missing.sort();
              data.the_americas.missing.sort();
              data.africa.missing.sort();
              data.europe.missing.sort();
              setCountriesData(data);
      });
  }, []);

    return (
      <div>
        <div 
          style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          width: '100vw',
          overflowX: 'hidden',
          }}
        >
          <div
          style={{
            marginTop: '20vh',
          }}
          >
            {countriesData && //Wait for the countriesData to load
            <div
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                console.log('LJDSLFJKDSL')
                window.location.href = `/?lon=0&lat=40&zoom=1&scope=world`
              }}
            >
              <RadialProgressBar 
                percentage={countriesData['world']['occupied']/countriesData['world']['total']*100} 
                textTop={countriesData['world']['text']}
                textRadial={countriesData['world']['occupied']}
                textBottom={`out of ${countriesData['world']['total']} countries`}
                height='400'
                width='400'
                fontSize='30px'
                dataLabelSize='130px'
                dataLabelOffset={45}
                isMobile={isMobile}
                scoreLabelColorOnHover='#2FC8F2'
              />
            </div>
            }
          </div>
          {isMobile ?(
            <div
              style={{
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '10vh',
                }}
              >
                  {countriesData && 
                    <div
                      onClick={() => {
                        window.location.href = `/?lon=24.5085&lat=2.7832&zoom=2.7&scope=africa`
                      }}
                    >
                      <RadialProgressBar 
                        percentage={countriesData['africa']['occupied']/countriesData['africa']['total']*100} 
                        textTop={`Africa &`}
                        textTopSecond={`The Middle East`}
                        textRadial={countriesData['africa']['occupied']}
                        textBottom={`out of ${countriesData['africa']['total']}`} 
                        textBottomSecond={`countries`}
                        width={'180px'}
                        height={'180px'}
                        fontSize='18px'
                        dataLabelSize='45px'
                        hollowSize='55%'
                        dataLabelOffset={15}
                        scoreLabelColorOnHover='#2FC8F2'
                      />
                     </div>
                  }
                {countriesData && 
                  <div
                    onClick={() => {
                      window.location.href = `/?lon=-80.1667&lat=15.1667&zoom=3&scope=americas`
                    }}
                  >
                    <RadialProgressBar 
                      percentage={countriesData['the_americas']['occupied']/countriesData['the_americas']['total']*100} 
                      textTopSecond={countriesData['the_americas']['text']}
                      textRadial={countriesData['the_americas']['occupied']}
                      textBottom={`out of ${countriesData['the_americas']['total']}`}
                      textBottomSecond={`countries`}
                      width={'180px'}
                      height={'180px'}
                      fontSize='18px'
                      dataLabelSize='45px'
                      hollowSize='55%'
                      dataLabelOffset={15}
                      scoreLabelColorOnHover='#2FC8F2'
                      strokeColor='#FF329B'
                    />
                  </div>
                }
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: '5vh',
                }}
              >
                {countriesData && (
                  <div		
                    onClick={() => {
                      window.location.href = `/?lon=140&lat=20&zoom=2.5&scope=asia_pacific`
                    }}
                  >
                    <RadialProgressBar 
                      percentage={countriesData['asia_pacific']['occupied']/countriesData['asia_pacific']['total']*100} 
                      textTopSecond={countriesData['asia_pacific']['text']}
                      textRadial={countriesData['asia_pacific']['occupied']}
                      textBottom={`out of ${countriesData['asia_pacific']['total']}`} 
                      textBottomSecond={`countries`}
                      width={'180px'}
                      height={'180px'}
                      fontSize='18px'
                      dataLabelSize='45px'
                      hollowSize='55%'
                      dataLabelOffset={15}
                      scoreLabelColorOnHover='#2FC8F2'
                    />
                  </div>
                  )}
                  {countriesData && (
                  <div
                      onClick={() => {
                        window.location.href = `/?lon=20&lat=53&zoom=3.5&scope=europe`
                      }}
                  >
                    <RadialProgressBar 
                      percentage={countriesData['europe']['occupied']/countriesData['europe']['total']*100} 
                      textTopSecond={countriesData['europe']['text']}
                      textRadial={countriesData['europe']['occupied']}
                      textBottom={`out of ${countriesData['europe']['total']}`} 
                      textBottomSecond={`countries`}
                      width={'180px'}
                      height={'180px'}
                      fontSize='18px'
                      dataLabelSize='45px'
                      hollowSize='55%'
                      dataLabelOffset={15}
                      scoreLabelColorOnHover='#2FC8F2'
                      strokeColor='#FF329B'
                    />
                  </div>
                  )}
              </div>
            </div>
          ):(
            <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: '10vh',
              width: '85%'
            }}
          >
            {countriesData && (
            <div
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = `/?lon=24.5085&lat=2.7832&zoom=2.7&scope=africa`
              }}
            >
              <RadialProgressBar 
                percentage={countriesData['africa']['occupied']/countriesData['africa']['total']*100} 
                textTop={`Africa &`}
                textTopSecond={`The Middle East`}
                textRadial={countriesData['africa']['occupied']}
                textBottom={`out of ${countriesData['africa']['total']}`} 
                textBottomSecond={`countries`}
                scoreLabelColorOnHover='#2FC8F2'
              />
            </div>
            )}
            {countriesData && (
            <div
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = `/?lon=-80.1667&lat=15.1667&zoom=3&scope=americas`
              }}
            >
              <RadialProgressBar 
                percentage={countriesData['the_americas']['occupied']/countriesData['the_americas']['total']*100} 
                textTopSecond={countriesData['the_americas']['text']}
                textRadial={countriesData['the_americas']['occupied']}
                textBottom={`out of ${countriesData['the_americas']['total']}`}
                textBottomSecond={`countries`}
                scoreLabelColorOnHover='#2FC8F2'
                strokeColor='#FF329B'
              />
            </div>
            )}
            {countriesData && (
            <div
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = `/?lon=140&lat=20&zoom=2.5&scope=asia_pacific`
              }}
            >
              <RadialProgressBar 
                percentage={countriesData['asia_pacific']['occupied']/countriesData['asia_pacific']['total']*100} 
                textTopSecond={countriesData['asia_pacific']['text']}
                textRadial={countriesData['asia_pacific']['occupied']}
                textBottom={`out of ${countriesData['asia_pacific']['total']}`} 
                textBottomSecond={`countries`}
                scoreLabelColorOnHover='#2FC8F2'
              />
            </div>
            )}
            {countriesData && (
            <div
              style={{
                cursor: 'pointer'
              }}
              onClick={() => {
                window.location.href = `/?lon=20&lat=53&zoom=3.5&scope=europe`
                  }}
              >
              <RadialProgressBar 
                percentage={countriesData['europe']['occupied']/countriesData['europe']['total']*100} 
                textTopSecond={countriesData['europe']['text']}
                textRadial={countriesData['europe']['occupied']}
                textBottom={`out of ${countriesData['europe']['total']}`} 
                textBottomSecond={`countries`}
                scoreLabelColorOnHover='#2FC8F2'
                strokeColor='#FF329B'
              />
              </div>
            )}
          </div>
          )}

        </div>
        <div
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '85%',
          }}
        >
          <Typography
            fontSize='24px'
            align='left'
            style={{
              fontFamily: 'EFCircularBold',
              alignItems: 'flex-center',
              justifyContent: 'flex-center',
              marginTop: '10vh',
              marginLeft: '10vw',
            }}
          >
            EF is still missing in:
          </Typography>
          {isMobile ? (
          <div
            style={{
              marginBottom: '10vh',
              alignContent: 'center',
              justifyContent: 'center',
              width: '90%',       // width being only 90% all the way to the right, means
              marginLeft: '5vw',  // a 5% margin on the left makes left and right even spacing
            }}
          >
            <EFCarousel
            ref={carouselRef}
            slidesInView = {2}
            themeConfig={{
              slots: {
                sliderInnerContainer: 'overflow-hidden',
              }
            }}
            controls= "minimal"
            >
            <SurfaceCard
              style={{
                boxShadow: 'none',
                height: '40vh',
                width: '200px',
                overflowY: 'scroll'
              }}
              >
                  <SurfaceCardContent
                  >
                  <div 

                      style={{ 
                        borderLeft: '4px solid #2FC8F2',
                        borderTopLeftRadius: '5000 !important', // Add this line to curve the top end of the border
                        borderBottomLeftRadius: '500000 !important', // Add t
                        paddingLeft: '3vw'
                        }}>
                        <Typography
                          className='bold'
                        >
                          Africa & Middle East
                        </Typography>
                      </div>
                      {countriesData && (
                      <div
                      >
                      {countriesData['africa']['missing'].map(country => (
                        <div key={country} style={{ 
                          borderLeft: '4px solid #2FC8F2',
                          paddingLeft: '3vw'}}>
                        <Typography 
                          fontFamily='EFCircularBook'
                          key={country}
                        >
                          {country}
                        </Typography>
                        </div>
                      ))}
                      <ExpandMoreIcon 
                        ref={africaRef}
                        style={{ 
                          position: 'sticky', 
                          bottom: '-25px', 
                          left: '175px', 
                          cursor: 'pointer'
                        }} 
                        onClick={() => scrollToBottom(africaRef)}
                      />
                      </div>
                    )}
                  </SurfaceCardContent>
            </SurfaceCard>
            <SurfaceCard
              style={{
                boxShadow: 'none',
                height: '40vh',
                width: '200px',
                overflowY: 'scroll'
              }}
            >
              <SurfaceCardContent>
                <div style={{ 
                  borderLeft: '4px solid #2FC8F2',
                  paddingLeft: '7vw'}}>
                  <Typography
                    className='bold'
                  >
                    The Americas
                  </Typography>
                </div>
                {countriesData && (
                  <div>
                    {/* {countriesData['the_americas']['missing'].map(country => (
                      <div key={country} style={{ 
                        borderLeft: '4px solid #2FC8F2',
                        paddingLeft: '7vw'}}>
                        <Typography 
                          fontFamily='EFCircularBook'
                          key={country}
                        >
                          {country}
                        </Typography>
                      </div>
                    ))} */}
                      <div key='america-complete' style={{ 
                        borderLeft: '4px solid #2FC8F2',
                        paddingLeft: '7vw'}}>
                        <Typography 
                          fontFamily='EFCircularBook'
                          key='america-complete'
                        >
                          Complete!
                        </Typography>
                      </div>

                    
                      {/* <ExpandMoreIcon 
                        ref={americasRef}
                        style={{ 
                          position: 'sticky', 
                          bottom: '-25px',
                          left: '175px', 
                          cursor: 'pointer' 
                        }} 
                        onClick={() => scrollToBottom(americasRef)}
                      /> */}
                  </div>
                )}
              </SurfaceCardContent>
            </SurfaceCard>
            <SurfaceCard
              style={{
                boxShadow: 'none',
                height: '40vh',
                width: '200px',
                overflowY: 'scroll'
              }}
            >
              <SurfaceCardContent>
              <div style={{ 
                      borderLeft: '4px solid #2FC8F2',
                      paddingLeft: '7vw'}}>
                      <Typography
                        className='bold'
                      >
                        Asia Pacific
                      </Typography>
                    </div>
                    {countriesData && (
                    <div>
                        {countriesData['asia_pacific']['missing'].map(country => (
                        <div key={country} style={{ 
                        borderLeft: '4px solid #2FC8F2',
                        paddingLeft: '7vw'}}>
                         <Typography 
                          key={country}
                          fontFamily='EFCircularBook'
                          >
                            {country}
                          </Typography>
                        </div>
                        ))}
                      <ExpandMoreIcon 
                        ref={asiaPacificRef}
                        style={{ 
                          position: 'sticky', 
                          bottom: '-25px', 
                          left: '175px', 
                          cursor: 'pointer' 
                        }} 
                        onClick={() => scrollToBottom(asiaPacificRef)}
                      />
                    </div>
                  )}
              </SurfaceCardContent>
            </SurfaceCard>
            <SurfaceCard
              style={{
                boxShadow: 'none',
                height: '40vh',
                width: '200px',
                overflowY: 'scroll'
              }}
            >
              <SurfaceCardContent>
               <div style={{ 
                      borderLeft: '4px solid #2FC8F2',
                      paddingLeft: '7vw'}}>
                      <Typography
                        className='bold'
                      >
                        Europe
                      </Typography>
                    </div>
                    {countriesData && (
                      <div>
                          {/* {countriesData['europe']['missing'].map(country => (
                          <div key={country} style={{ 
                            borderLeft: '4px solid #2FC8F2',
                            paddingLeft: '7vw'}}>
                            <Typography 
                              key={country}
                              fontFamily='EFCircularBook'
                            >
                              {country}
                            </Typography>
                          </div>
                          ))} */}
                      {/* <ExpandMoreIcon 
                        style={{ 
                          position: 'sticky', 
                          bottom: '-25px',
                          left: '175px', 
                          cursor: 'pointer' 
                        }} 
                      /> */}
                      <div key='america-complete' style={{ 
                        borderLeft: '4px solid #2FC8F2',
                        paddingLeft: '7vw'}}>
                        <Typography 
                          fontFamily='EFCircularBook'
                          key='america-complete'
                        >
                          Complete!
                        </Typography>
                      </div>
                      </div>
                )}
              </SurfaceCardContent>
            </SurfaceCard>
            </EFCarousel>
            {/* <div
              style={{

                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <img
                src="left_pink_arrow.svg"
                alt="Previous"
                style={{ 
                  cursor: 'pointer',
                  transform: 'translateY(-20px)',
                  marginRight: '10px'
                }}
                onClick={handlePrevClick}
              />
              <img
                src="right_pink_arrow.svg"
                alt="Next"
                style={{ 
                  cursor: 'pointer',
                  transform: 'translateY(-20px)'
                }}
                onClick={handleNextClick}
              />
            </div> */}
          </div>
          ):(
            <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            style={{
              width: '90%',
              marginTop: '5vh',
              marginLeft: '10vw',
              marginBottom: '10vh',
            }}
          >
            <Grid item xs={3} style={{ 
              borderLeft: '4px solid #2FC8F2', 
              paddingLeft: '1vw',
              }}>
              <Typography
                className='bold'
              >
                Africa & Middle East
              </Typography>
              {countriesData && (
                <div>
                    {countriesData['africa']['missing'].length === 0 ? (
                      <Typography>Completed!</Typography>
                    ) : (
                      countriesData['africa']['missing'].map(country => (
                        <Typography key={country}>
                          {country}
                        </Typography>
                      ))
                    )}
                </div>
                )}
            </Grid>
            <Grid item xs={3} style={{ borderLeft: '4px solid #2FC8F2', paddingLeft: '1vw'}}>
              <Typography
                className='bold'
              >
                The Americas
              </Typography>
              {countriesData && (
                <div>
                    {countriesData['the_americas']['missing'].length === 0 ? (
                      <Typography>Completed!</Typography>
                    ) : (
                      countriesData['the_americas']['missing'].map(country => (
                        <Typography key={country}>
                          {country}
                        </Typography>
                      ))
                    )}
                  </div>
                )}
            </Grid>
            <Grid item xs={3} style={{ borderLeft: '4px solid #2FC8F2', paddingLeft: '1vw'}}>
              <Typography
                className='bold'
              >
                Asia Pacific
              </Typography>
              {countriesData && (
                <div>
                    {countriesData['asia_pacific']['missing'].length === 0 ? (
                      <Typography>Completed!</Typography>
                    ) : (
                      countriesData['asia_pacific']['missing'].map(country => (
                        <Typography key={country}>
                          {country}
                        </Typography>
                      ))
                    )}
                  </div>
                )}
            </Grid>
            <Grid item xs={3} style={{ borderLeft: '4px solid #2FC8F2', paddingLeft: '1vw'}}>
              <Typography
                className='bold'
              >
                Europe
              </Typography>
              {countriesData && (
                <div>
                    {countriesData['europe']['missing'].length === 0 ? (
                      <Typography>Completed!</Typography>
                    ) : (
                      countriesData['europe']['missing'].map(country => (
                        <Typography key={country}>
                          {country}
                        </Typography>
                      ))
                    )}
                  </div>
                )}
            </Grid>
          </Grid> 
          )}
          <Footer />
          
        </div>
      </div>
    );
  };

  export default function Page() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <PageContent />
      </Suspense>
    );
  }