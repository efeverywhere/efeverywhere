'use client';
import { Box } from '@mui/material';
import { Parallax } from 'react-scroll-parallax';

export default function Test() {
  return (
    <Parallax scale={[1, 0]}>
          <Box sx={{ width: 192, height: 192, bgcolor: 'red' }}>
        </Box>
    </Parallax>
  );
}