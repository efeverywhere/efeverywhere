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
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { FormControl, useFormControlContext } from '@mui/base/FormControl';
import { TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MyDropzone from './Dropzone';
import Autocomplete from '@mui/material/Autocomplete'; 

import { useForm, ValidationError } from '@formspree/react';
import { useCountries } from 'use-react-countries'



function PhotoSubmitForm({ isOpen, handleClose, setIsThankYouOpen }) {
  const [file, setFile] = useState(null);
  const [isEFStaff, setIsEFStaff] = useState('No');
  const [isEFStudent, setIsEFStudent] = useState('No');

  var { countries } = useCountries();
  // countries = countries.replace("China", "China (Mainland)");
  countries = countries.map(country => country.name === "China" ? {...country, name: "China (Mainland)"} : country);  const isMobile = useMediaQuery('(max-width:600px)')

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
  const form_instagram_handle = 'instagram_handle'
  const form_is_ef_staff = 'is_ef_staff'
  const form_ef_location = 'ef_location'
  const form_ef_years = 'ef_years'
  const form_is_ef_student = 'is_ef_student'
  const form_experience = 'experience'
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
  // const [state, reactHookFormSubmit] = useForm("xrbzknog"); //test form
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
    formData.append(form_instagram_handle, e.target[form_instagram_handle].value);
    formData.append(form_is_ef_staff, e.target[form_is_ef_staff].value);
    formData.append(form_ef_location, e.target[form_ef_location].value);
    formData.append(form_ef_years, e.target[form_ef_years].value);
    formData.append(form_is_ef_student, e.target[form_is_ef_student].value);
    formData.append(form_experience, e.target[form_experience].value);
    formData.append(form_caption, e.target[form_caption].value);
  
    // Call the handleSubmit function from useForm
    await reactHookFormSubmit(formData);
    setIsThankYouOpen(true);
  
  };


  return (
    <div
      style={{
        height: '100vh',
        overflow: 'scroll',
        maxHeight: '200vh'
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
            height: '160vh',
            width: '100vw',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'left',
            backgroundColor: '#0075E1',
            color: 'white',
            paddingTop: '5vh',
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
              style={{
                top: '5vh'
              }}
              onSubmit={handleSubmit}
            >
            <FormControl 
              style={{
                width: '100%',
              }}
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
                        label="Where is this photo taken (Country/Region/Territory)*" 
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
                    id={form_instagram_handle}
                    name={form_instagram_handle}
                    label="Instagram handle" 
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

              <FormControl
                    style={{
                      display: 'flex',
                      width: '81%',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}
                  >
                    <FormLabel
                      sx={{
                        alignSelf: 'flex-start',
                        color: '#FFFFFF !important',
                        marginRight: '10px',
                      }}
                    > 
                      Are you a current or former EF staff?
                    </FormLabel>
                    <RadioGroup
                      id={form_is_ef_staff}
                      name={form_is_ef_staff}
                      onChange={(e) => setIsEFStaff(e.target.value)}
                      sx={{
                        color: '#FFFFFF !important',
                        '&.Mui-checked': {
                          color: '#FFFFFF !important',
                        },
                      }}
                      row
                    >
                      <FormControlLabel
                        style={{
                          color: '#FFFFFF !important'
                        }}
                        value="Yes" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          Yes
                          </Typography>
                          }
                      />
                      <FormControlLabel 
                        value="No" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          No
                          </Typography>
                          }
                      />
                    </RadioGroup>
                  </FormControl>
                  
              {isEFStaff === 'Yes' && (
                  <TextField 
                    id={form_ef_location}
                    name={form_ef_location}
                    label="EF Office Location*" 
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
                )}

                {isEFStaff === 'Yes' && (
                  <TextField 
                    id={form_ef_years}
                    name={form_ef_years}
                    label="Number of years with EF*" 
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
                )}

                  <FormControl
                    style={{
                      display: 'flex',
                      width: '81%',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      marginBottom: '15px'
                    }}
                  >
                    <FormLabel
                      sx={{
                        alignSelf: 'flex-start',
                        color: '#FFFFFF !important',
                        marginRight: '10px',
                      }}
                    > 
                      Are you current or former EF customer or student?
                    </FormLabel>
                    <RadioGroup
                      id={form_is_ef_student}
                      name={form_is_ef_student}
                      onChange={(event) => setIsEFStudent(event.target.value)}
                      sx={{
                        color: '#FFFFFF !important',
                        '&.Mui-checked': {
                          color: '#FFFFFF !important',
                        },
                      }}
                      row
                    >
                      <FormControlLabel
                        style={{
                          color: '#FFFFFF !important'
                        }}
                        value="Yes" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          Yes
                          </Typography>
                          }
                      />
                      <FormControlLabel 
                        value="No" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          No
                          </Typography>
                          }
                      />
                    </RadioGroup>
                  </FormControl>

                  {isEFStudent === 'Yes' && (
                  <FormControl
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '81%',
                  }}
                >
                  <FormLabel
                  style={{
                    color: '#FFFFFF',
                    marginBottom: '3px',
                  }}
                  >
                  Describe your EF experience(s), such as the EF program, location & dates*                  </FormLabel>
                  <TextField 
                    id={form_experience}
                    name={form_experience}
                    // label="Describe your EF experience(s), such as the EF program, location & dates*" 
                    variant="filled"
                    multiline
                    rowsMax={2}
                    sx={{
                      borderRadius: '7px',
                      backgroundColor: '#FFFFFF',
                    }}
                    InputProps={{
                      disableUnderline: true,
                      style: { 
                        backgroundColor: 'transparent',
                        overflow: 'auto'
                      },

                    }}
                    style={{
                      width: '100%',
                      height: '50px',
                      marginBottom: '1vh',
                  }}
                  />
                  </FormControl>
                )}

                <FormControl
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '81%',
                  }}
                >
                  <FormLabel
                  style={{
                    color: '#FFFFFF',
                    marginBottom: '3px',
                  }}
                  >
                  Please share more about what impact if any your EF experience has had on your life? (200 words max)
                  </FormLabel>
                  <TextField 
                    id={form_caption}
                    name={form_caption}
                    rowsMax={4}
                    // label="Please share more about what impact if any your EF experience has had on your life? (200 words max)" 
                    variant="filled"
                    multiline
                    sx={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '7px',
                    }}
                    style={{
                      width: '100%',
                      height: '100px',
                      maxHeight: '100px'
                    }}

                    InputProps={{
                      disableUnderline: true,
                      style: { 
                        backgroundColor: 'transparent',
                        overflowY: 'auto'
                      },
                      // inputProps: { maxLength: 200 }
                    }}
                  />
                </FormControl>
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
          borderRadius: '5px',
        }}
      >
        <Fade 
          in={isOpen}
          style={{
            borderRadius: '5px',
            overflow: 'scroll',
          }}  
        >
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: '80vw',
            height: '115vh',
            display: 'flex',
            justifyContent: 'left',
            alignItems: 'center',
            transform: 'translate(-50%, -50%) scale(0.8)', //this scaling is important because there are too many elements in this form
            backgroundColor: '#0075E1',
            padding: '16px 35px 24px 70px', // top right bottom left
            color: 'white',
            
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
                      marginBottom: 24,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
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
                      marginBottom: 24,
                  }}
                  InputProps={{
                    style: {
                      borderRadius: '5px',
                    }
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
                        label="Where is the photo taken (Country/Region/Territory)*" 
                        variant="filled" 
                        sx={{ 
                          borderRadius: '5px',
                          backgroundColor: '#FFFFFF' 
                        }} 
                        style={{ width: '100%', marginBottom: 24 }}
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
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                        width: '48%', // adjust as needed
                        marginBottom: 24,
                      }}
                      InputProps={{
                        style: {
                          borderRadius: '5px',
                        }
                      }}
                    />
                    <TextField 
                      label="Instagram handle" 
                      variant="filled" 
                      id={form_instagram_handle}
                      name={form_instagram_handle}
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#FFFFFF',
                      }}
                      style={{
                        width: '48%', // adjust as needed
                        marginBottom: 24,
                      }}
                      InputProps={{
                        style: {
                          borderRadius: '5px',
                        }
                      }}
                    />
                  </div>


                  <FormControl
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      marginBottom: '15px'
                    }}
                  >
                    <FormLabel
                      sx={{
                        alignSelf: 'center',
                        color: '#FFFFFF !important',
                        marginRight: '10px',
                      }}
                    > 
                      Are you a current or former EF staff?
                    </FormLabel>
                    <RadioGroup
                      id={form_is_ef_staff}
                      name={form_is_ef_staff}
                      sx={{
                        color: '#FFFFFF !important',
                        '&.Mui-checked': {
                          color: '#FFFFFF !important',
                        },
                      }}
                      row
                    >
                      <FormControlLabel
                        style={{
                          color: '#FFFFFF !important'
                        }}
                        value="Yes" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          Yes
                          </Typography>
                          }
                      />
                      <FormControlLabel 
                        value="No" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          No
                          </Typography>
                          }
                      />
                    </RadioGroup>
                  </FormControl>

                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField 
                      label="(If yes) EF Office Location*" 
                      variant="filled" 
                      id={form_ef_location}
                      name={form_ef_location}
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#FFFFFF',
                      }}
                      style={{
                        width: '48%', // adjust as needed
                        marginBottom: 24,
                      }}
                      InputProps={{
                        style: {
                          borderRadius: '5px',
                        }
                      }}
                    />
                    <TextField 
                      label="(If yes) Number of years with EF*" 
                      variant="filled" 
                      id={form_ef_years}
                      name={form_ef_years}
                      sx={{
                        borderRadius: '5px',
                        backgroundColor: '#FFFFFF',
                      }}
                      style={{
                        width: '48%', // adjust as needed
                        marginBottom: 24,
                      }}
                      InputProps={{
                        style: {
                          borderRadius: '5px',
                        }
                      }}
                    />
                  </div>


                  <FormControl
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignContent: 'center',
                      marginBottom: '15px'
                    }}
                  >
                    <FormLabel
                      sx={{
                        alignSelf: 'center',
                        color: '#FFFFFF !important',
                        marginRight: '10px'
                      }}
                    > 
                      Are you a current or former EF customer or student?
                    </FormLabel>
                    <RadioGroup
                      id={form_is_ef_student}
                      name={form_is_ef_student}
                      sx={{
                        color: '#FFFFFF !important',
                        '&.Mui-checked': {
                          color: '#FFFFFF !important',
                        },
                      }}
                      row
                    >
                      <FormControlLabel
                        style={{
                          color: '#FFFFFF !important'
                        }}
                        value="Yes" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          Yes
                          </Typography>
                          }
                      />
                      <FormControlLabel 
                        value="No" 
                        control={<Radio 
                          sx={{
                            variant: 'solid',
                            color: 'white',
                            '&.Mui-checked': {
                              color: 'white',
                            },
                          }}
                            />} 
                        label={
                          <Typography 
                                id="radio-typography" //NEED TO DO THIS TURN TEXT WHITE
                                >
                          No
                          </Typography>
                          }
                      />
                    </RadioGroup>
                  </FormControl>

                  <TextField 
                    label="(If yes) Describe your EF experience(s), such as the EF program, location & dates* " 
                    variant="filled"
                    id={form_experience}
                    name={form_experience}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                    }}
                    style={{
                      width: '100%',
                      marginBottom: 24,
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
                    }}
                  />

                </Grid>
                <Grid xs={5} item
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    alignContent: 'center'
                  }}
                >
                    <Box
                        sx={{
                          border: '2px dotted #000', // Add a border with a dotted line
                          width: '80%', // Set the width
                          height: '96%', // Set the height
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
                  <TextField 
                    label="Please share more about what impact if any your EF experience has had on your life? (200 words max)" 
                    variant="filled"
                    id={form_caption}
                    name={form_caption}
                    sx={{
                      borderRadius: '5px',
                      backgroundColor: '#FFFFFF',
                      marginTop: '10px'
                    }}
                    style={{
                      width: '96%',
                    }}
                    InputProps={{
                      style: {
                        borderRadius: '5px',
                      }
                    }}
                  />
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