import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Typography } from '@mui/material'

function MyDropzone({ onFileUpload }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onFileUpload(acceptedFiles[0]);
  }, [onFileUpload])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}
      style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            overflow: 'hidden'
        }}
    >
      
      <input
        type='file'
        hidden
        style={{
          width: '100%',
          height: '100%',
        }}
      {...getInputProps()} />
    {
        previewUrl ? 
        (<img 
            src={previewUrl} 
            alt="Preview" 
            style={{
              objectFit: 'cover',
              maxWidth: '100%',
              maxHeight: '100%'
          }} 
            />): 
        <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }}
        >
            <FileUploadIcon/>
            {isDragActive ?
            (<Typography>
                    Drop the files here...
            </Typography>) :
            (<Typography
              sx={{
                width: '80%',
                textAlign: 'center',
                fontSize: '14px',
                fontFamily: 'EFCircular',
                marginTop: '10px'
              }}
            >
                    Browse and upload
                    *Max file size 7MB.
                    For larger files, please send to <b>efeverywhere@ef.com</b>.
            </Typography>)}
        </div>
    }
    </div>
  )
}

export default MyDropzone;