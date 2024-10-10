'use client'
import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MyDropzone from './Dropzone';
import Autocomplete from '@mui/material/Autocomplete'; 

import { useForm, ValidationError } from '@formspree/react';
import { useCountries } from 'use-react-countries'


function ThankYou({ isOpen, handleClose }) {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);

  const { countries } = useCountries();
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = (file) => {
    // Update the form data with the uploaded file
    setFile(file);
  }

  const form_name = 'name'
  const form_email = 'email'
  const form_country = 'country'
  const form_description = 'description'
  const form_caption = 'caption'
  const form_image = 'image'

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setOpen(false);
  // };

  const [state, reactHookFormSubmit] = useForm("mgegpqzw");
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create a new FormData instance
    const formData = new FormData();
  
    // Append the file to the form data
    formData.append('image', file);
  
    // Append other form data
    formData.append(form_email, e.target[form_email].value);
    formData.append(form_name, e.target[form_name].value);
    formData.append(form_country, e.target[form_country].value);
    formData.append(form_description, e.target[form_description].value);
    formData.append(form_caption, e.target[form_caption].value);
  
    // Call the handleSubmit function from useForm
    await reactHookFormSubmit(formData);
  
  };

  if (state.succeeded) {
    return <div>Thank you for your submission!</div>;
} 


  return (
    <div
      style={{
        height: '100vh'
      }}
    >
      {isMobile ? (
      //////////
      // MOBILE
      //////////
      <div
        style={{
          position: 'fixed', 
          width: '100vw',
          height: '100vh'
        }}
      >
        <Modal
          open={isOpen}
          onClose={handleClose}
          closeAfterTransition
        >
        <Fade in={isOpen}>
          <div style={{
            height: '100vh',
            width: '100vw',
            overflow: 'scroll',
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0075E1',
            color: 'white',
            padding: '20px',
          }}>
            <CloseIcon 
              style={{ 
                position: 'absolute', 
                right: '8vw', 
                top: '3vh'
                }} 
              onClick={handleClose}
              />
              <Typography
                sx={{
                  fontSize: 32,
                  fontFamily: 'EFCircularBold',
                  marginTop: '30%',
                  marginLeft: '5vw',
                  marginRight: '6vw',
                  lineHeight: '1.3',
                  color: '#FFFFFF !important'
                }}
              >
                Thank you for your submission!
              </Typography>
              <Typography
                sx={{
                  marginTop: '4vh',
                  fontSize: 16,
                  fontFamily: 'EFCircularBook',
                  marginBottom: '2vh',
                  marginLeft: '5vw',
                  marginRight: '6vw',
                  wordWrap: 'break-word',
                  color: '#FFFFFF !important'
                }}
              >
                Let’s get EF Everywhere to 194 countries by February 2025! As we are receiving a high volume of submissions everyday, please give us 2-3 business days to review and upload your photos/videos. If you don’t see your photo/videos here one week after uploading, please let us know at efeverywhere@ef.com or submit them again!
              </Typography>
              <Typography
                sx={{
                  marginTop: '3vh',
                  fontSize: 16,
                  fontFamily: 'EFCircularBook',
                  marginBottom: '10vh',
                  marginLeft: '5vw',
                  marginRight: '6vw',
                  marginBottom: '3vh',
                  wordWrap: 'break-word',
                  color: '#FFFFFF !important'
                }}
              >
                  Thank you and we look forward to seeing EF Everywhere!
              </Typography>
              
          </div>
        </Fade>
        </Modal>
      </div>
      ):(
      //////////
      // DESKTOP
      //////////
      <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        sx={{
          position: 'fixed',
          borderRadius: '5px'
        }}
      >
        <Fade 
          in={isOpen}
          style={{
            borderRadius: '5px'
          }}  
        >
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '50vw',
            height: '40vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0075E1',
            padding: '16px 35px 40px 70px', // top right bottom left
            color: 'white',
            overflow: 'hidden'
          }}>
          <div style={{ height: '30px' }} > 
            <CloseIcon 
              style={{ 
                position: 'absolute', 
                right: 30, 
                top: 30
                }} 
              onClick={handleClose}
              />
          </div>
          <div style={{ 
            position: 'relative',
            overflow: 'auto',
            marginTop: '30px'
            }}>
                
              <Typography
                sx={{
                  fontSize: 40,
                  fontFamily: 'EFCircularBold',
                  marginBottom: 2,
                  lineHeight: '1.3',
                  color: '#FFFFFF !important'
                }}
              >
                Thank you for your submission!
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: 'EFCircular',
                  marginBottom: 2,
                  color: '#FFFFFF !important'
                }}
              >
                Let’s get EF Everywhere to 194 countries by February 2025! As we are receiving a high volume of submissions everyday, please give us 2-3 business days to review and upload your photos/videos. If you don’t see your photo/videos here one week after uploading, please let us know at efeverywhere@ef.com or submit them again!
              </Typography>
              <Typography
                sx={{
                  fontSize: 18,
                  fontFamily: 'EFCircular',
                  marginBottom: 2,
                  color: '#FFFFFF !important'
                }}
              >
                Thank you and we look forward to seeing EF Everywhere!
              </Typography>
            </div>
        </div>
        </Fade>
      </Modal>
      </div>
      )}
    </div>
  );
}

export default ThankYou;