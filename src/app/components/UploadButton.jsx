import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { blue } from '@mui/material/colors';

const StyledButton = styled(Button)({
  '&:hover': {
    transform: 'scale(1.025)',
    // padding: '30px 50px',
    backgroundColor: blue[700], // Reset background color
    boxShadow: 'none', // Remove box shadow
  },
  transition: 'transform 0.3s ease-in-out',
});

const UploadButton = ({ toggleUpload, topSpacing, textColor, backgroundColor, width='215px', height='48px', fontsize='16px'}) => (
  <StyledButton
    sx={{
      borderRadius: '50px',
      minWidth: width,
      width: width,
      height: height,
      textTransform: 'none',
      marginTop: topSpacing,
      backgroundColor: backgroundColor,
      boxShadow: 'none',
    }}
    variant="contained"
    onClick={toggleUpload}
  >
    <Typography
    sx={{
      fontSize: fontsize,
      color: textColor,
      whiteSpace: 'nowrap', // Add this
      // overflow: 'hidden', // Add this
      textOverflow: 'ellipsis',
      fontFamily: 'EFCircularBook'
    }}
    >
      Submit Your Shot
    </Typography>
  </StyledButton>
);

export default UploadButton;