'use client'
import React, { useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
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



function PhotoSubmitForm({ isOpen, handleClose, setIsThankYouOpen }) {
  const [file, setFile] = useState(null);

  const { countries } = useCountries();
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleFileUpload = (file) => {
    // Update the form data with the uploaded file
    setFile(file);
  }

  const mobileDropzoneWidth = '80vw'
  const mobileDropzoneHeight = '20vh'
  const desktopDropzoneWidth = '80vw'
  const desktopDropzoneHeight = '15vh'

  const form_name = 'name'
  const form_email = 'email'
  const form_country = 'country'
  const form_description = 'description'
  const form_caption = 'caption'
  const form_image = 'image'

  const StyledButton = styled(Button)({
    '&:hover': {
      transform: 'scale(1.025)',
      // padding: '30px 50px',
      // backgroundColor: blue[700], // Reset background color
      boxShadow: 'none', // Remove box shadow
    },
    transition: 'transform 0.3s ease-in-out',
  });

  const StyledFormControlLabel = styled(FormControlLabel)({
    '& .MuiFormControlLabel-label': {
      color: '#FFFFFF !important', // Replace #FFFFFF with the color you want
    },
  });

  // const [state, reactHookFormSubmit] = useForm("mgegpqzw");
  const [state, reactHookFormSubmit] = useForm("xeqydbyv");
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
    setIsThankYouOpen(true);
  
  };


  return (
    <div
      style={{
        height: '100vh',
        overflow: 'scroll'
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
          height: '100vh',
        }}
      >
        <Modal
          open={isOpen}
          onClose={handleClose}
          closeAfterTransition
          style={{
            overflow: 'scroll'
          }}
        >
        <Fade in={isOpen}>
          <div style={{
            // position: 'absolute',
            height: '110vh',
            width: '100vw',
            overflow: 'auto',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            backgroundColor: '#0075E1',
            color: 'white',
            // paddingTop: '5vh',
            // paddingBottom: '10vh',
            overflow: 'hidden'
          }}>
            <CloseIcon 
              style={{ 
                position: 'absolute', 
                right: '8vw', 
                top: '3vh'
                }} 
              onClick={handleClose}
              />
            <form 
              onSubmit={handleSubmit}
            >
            <FormControl 
              style={{width: '100%'}}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'scroll',
                }}
              >
              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  alignItems: 'left',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '7vw',
                    marginBottom: 2,
                    fontFamily: 'EFCircularBold',
                    alignContent: 'left',
                    marginLeft: '10vw',
                    color: '#FFFFFF !important'
                  }}
                >
                  Upload Your Shot!
                </Typography>
              </div>
                <Box
                        sx={{
                          border: '2px dotted #000', // Add a border with a dotted line
                          width: mobileDropzoneWidth, // Set the width
                          height: mobileDropzoneHeight, // Set the height
                          display: 'flex',
                          borderColor: '#FFFFFF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginBottom: '2vh',
                          borderRadius: '4px'
                        }}
                      >
                        <MyDropzone onFileUpload={handleFileUpload} />
                    </Box>
                  <TextField 
                    id={form_name}
                    name={form_name}
                    label="Name*" 
                    variant="filled"
                    sx={{
                      borderRadius: '7px',
                      backgroundColor: '#FFFFFF',
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: { backgroundColor: 'transparent' },
                    }}
                    style={{
                      width: '81%',
                      marginBottom: '1vh',
                  }}
                  />
                  <TextField 
                    id={form_email}
                    name={form_email}
                    label="Email*" 
                    variant="filled" 
                    sx={{
                      borderRadius: '7px',
                      backgroundColor: '#FFFFFF',
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: { backgroundColor: 'transparent' },
                    }}
                    style={{
                      width: '81%',
                      marginBottom: '1vh',
                  }}
                  />
                  <Autocomplete // Replace TextField with Autocomplete
                    id='form-country-autofill'
                    options={countries.map(country => country.name)}
                    freeSolo
                    // getOptionLabel={(option) => option.name}
                    renderInput={(params) => 
                      <TextField 
                        {...params} 
                        id={form_country}
                        name={form_country}
                        label="Country/Territory*" 
                        variant="filled" 
                        sx={{ 
                          borderRadius: '7px',
                          backgroundColor: '#FFFFFF' 
                        }} 
                        InputProps={{
                          disableUnderline: true,
                          style: { backgroundColor: 'transparent' },
                        }}
                      />
                    }
                    sx={{
                      '& .MuiAutocomplete-endAdornment': {
                        display: 'none',
                      },
                    }}
                    style={{
                      width: '81%',
                      marginBottom: '1vh'
                    }}
                    
                  />
                  <TextField 
                    id={form_description}
                    name={form_description}
                    label="Location description*" 
                    variant="filled" 
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '7px',
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: { backgroundColor: 'transparent' },
                    }}
                    style={{
                      width: '81%',
                      marginBottom: '1vh',
                  }}
                  />
                  <TextField 
                    id={form_caption}
                    name={form_caption}
                    label="Caption" 
                    variant="filled"
                      sx={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '7px',
                      }}
                      style={{
                        width: '81%',
                      }}
                      InputProps={{
                        disableUnderline: true,
                        style: { backgroundColor: 'transparent' },
                      }}
                  />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '81%'
              }}
            >
              <StyledFormControlLabel
                style={{
                  marginTop: '1vh',
                  borderRadius: '10px',
                }}
                size= 'large'
                required control={
                  <Checkbox 
                    sx={{
                      color: '#FFFFFF',
                      '&.Mui-checked': {
                        color: '#FFFFFF', // Add this line
                      },
                    }}
                  />
                } label="By clicking this box, you agree to share your submission publicly and are over the age of 18 years old." 
              />
              <Button
                type="submit" 
                disabled={state.submitting}
                sx={{
                  marginTop: 4,
                  borderRadius: '50px',
                  fontSize: '10px',
                  width: '150px',
                  height: '50px',
                  textTransform: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#FFFFFF'
                  },
                }}
                variant="contained"
              >
                <Typography
                  sx={{
                    fontFamily: 'EFCircularBook',
                    fontSize: 20
                  }}
                >
                  Submit
                </Typography>
                
              </Button>
              </div>
            </div>
            </FormControl>
            </form>
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
            borderRadius: '5px',
            overflow: 'scroll'
          }}  
        >
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '50vw',
            height: '90vh',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#0075E1',
            padding: '16px 35px 24px 70px', // top right bottom left
            color: 'white'
          }}>
            <CloseIcon 
              style={{ 
                position: 'absolute', 
                right: 30, 
                top: 30
                }} 
              onClick={handleClose}
              />

            <form 
            style={{
              width: '100%'
            }}
            onSubmit={handleSubmit}>
            <FormControl >
              <div>
              <Typography
                sx={{
                  fontSize: 40,
                  fontFamily: 'EFCircularBold',
                  marginBottom: 2,
                  color: '#FFFFFF !important'
                }}
              >
                Upload Your Shot!
              </Typography>
              <Grid container
              >
                <Grid xs={7} item
                style={{
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between', 
                  height: '100%'}}
                >
                  <TextField 
                    label="Name*" 
                    variant="filled" 
                    id={form_name}
                    name={form_name}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                    }}
                    style={{
                      width: '100%',
                      marginBottom: 30,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#8C8C8C'},
                    }}

                  />
                  <TextField 
                    label="Email*" 
                    variant="filled" 
                    id="email"
                    type={form_email}
                    name={form_email}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                    }}
                    style={{
                      width: '100%',
                      marginBottom: 30,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '5px',
                    }
                  }}
                  InputLabelProps={{
                    style: { color: '#8C8C8C'},
                  }}
                  />
                  <Autocomplete // Replace TextField with Autocomplete
                    id="country-autocomplete"
                    options={countries.map(country => country.name)}
                    freeSolo
                    // getOptionLabel={(option) => option.name}
                    renderInput={(params) => 
                      <TextField 
                        {...params} 
                        id={form_country}
                        name={form_country}
                        label="Country/Territory*" 
                        variant="filled" 
                        sx={{ 
                          borderRadius: '5px',
                          backgroundColor: '#FFFFFF' 
                        }} 
                        style={{ width: '100%', marginBottom: 30 }}
                        InputLabelProps={{
                          style: { color: '#8C8C8C'},
                        }}
                      />
                    }
                    sx={{
                      '& .MuiAutocomplete-endAdornment': {
                        display: 'none',
                      },
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#8C8C8C'},
                    }}
                  />
                  <TextField 
                    label="Location description*" 
                    variant="filled" 
                    id={form_description}
                    name={form_description}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                    }}
                    style={{
                      width: '100%',
                      marginBottom: 30,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '5px',
                    }
                  }}
                  InputLabelProps={{
                    style: { color: '#8C8C8C'},
                  }}
                  />
                  <TextField 
                    label="Caption" 
                    variant="filled"
                    id={form_caption}
                    name={form_caption}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                    }}
                    style={{
                      width: '100%',
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
                    }}
                    InputLabelProps={{
                      style: { color: '#8C8C8C'},
                    }}
                  />
                </Grid>
                <Grid xs={5} item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center'
                  }}
                >
                    <Box
                        sx={{
                          border: '2px dotted #000', // Add a border with a dotted line
                          width: '80%', // Set the width
                          height: '100%', // Set the height
                          maxWidth: '80%',
                          maxHeight: '100%',
                          display: 'flex',
                          borderColor: '#FFFFFF',
                          justifyContent: 'center',
                          alignItems: 'center',
                          overflow: 'hidden'
                        }}
                      >
                        <MyDropzone onFileUpload={handleFileUpload}/>
                    </Box>
                </Grid>
              </Grid>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <StyledFormControlLabel
                style={{
                  marginTop: '1vh',
                  color: '#FFFFFF !important'
                }}
                size= 'large'
                required control={
                  <Checkbox 
                    sx={{
                      color: '#FFFFFF !important',
                      '&.Mui-checked': {
                        color: '#FFFFFF !important',
                      },
                    }}
                  />
                } 
                label="By clicking this box, you agree to share your submission publicly and are over the age of 18 years old." 
              />
              <StyledButton
                type="submit" 
                disabled={state.submitting}
                sx={{
                  marginTop: 4,
                  borderRadius: '50px',
                  fontSize: '10px',
                  width: '150px',
                  height: '50px',
                  textTransform: 'none',
                  border: 'none',
                  boxShadow: 'none',
                  backgroundColor: '#FFFFFF',
                  '&:hover': {
                    backgroundColor: '#FFFFFF'
                  },
                }}
                variant="contained"
              >
                <Typography
                  sx={{
                    fontFamily: 'EFCircularBook',
                    fontSize: 20,
                  }}
                >
                Submit
                </Typography>
                
              </StyledButton>
              </div>
            </div>
            </FormControl>
            </form>
          </div>
        </Fade>
      </Modal>
      </div>
      )}
    </div>
  );
}

export default PhotoSubmitForm;