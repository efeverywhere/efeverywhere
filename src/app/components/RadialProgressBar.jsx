'use client'
import React from 'react';
import dynamic from "next/dynamic";
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialProgressBar = ({ percentage, textTop, textTopSecond, textRadial, textBottom, textBottomSecond, fontSize='30px', height=300, width=300, dataLabelSize="90px", dataLabelOffset=30, hollowSize='65%', lineHeight='1.5', marginTop='35vh',isMobile=false }) => {
  
  const options = {
    plotOptions: {
      radialBar: {
        hollow: {
          size: hollowSize,
        },
        track: {
          background: '#C4C4C4',
        },
        dataLabels: {
          showOn: 'always',
          name: {
            offsetY: dataLabelOffset,
            fontSize: dataLabelSize,
            color: "#000000",
            fontFamily: 'EFCircularMedium',
            fontWeight: 0,
            show: true,
          },
          value: {
            show: false,
          }
        },
      },
    },
    stroke: {
        lineCap: "round",
      },
    colors: ['#2FC8F2'],
    labels: [textRadial],
  };


  return (
    <div
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            marginTop: marginTop
        }}
    >
        <Typography
          fontFamily={isMobile ? 'EFCircularMedium': 'EFCircularMedium'}
          align='center'
          fontSize={fontSize}
        >
          { textTop ? textTop : <br /> }
        </Typography>
        <Typography
          fontFamily={'EFCircularMedium'}
          align='center'
          fontSize={fontSize}
        >
            { textTopSecond }
        </Typography>
        <ApexChart
            options={options}
            series={[percentage]}
            type="radialBar"
            height={height}
            width={width}
        />
        <Typography
          fontFamily={'EFCircularMedium'}
          align='center'
          fontSize={fontSize}
          style={{
            lineHeight: lineHeight
          }}
        >
            { textBottom }
        </Typography>
        <Typography
          fontFamily={'EFCircularMedium'}
          align='center'
          fontSize={fontSize}
        >
            { textBottomSecond }
        </Typography>
    </div>
  );
};

export default RadialProgressBar;