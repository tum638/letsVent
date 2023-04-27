
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';


export default function MyAppBar() {
  const navigateTo = useNavigate();
  function handleHomeClick() {
    navigateTo("/")
  }

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="static" sx={{
        backgroundColor: "#B4B8AB",
      }}>
        <Toolbar>
          <HomeIcon sx={{ color: "#153243" }} onClick={handleHomeClick} />
          <Typography variant="h5" component="h5" sx={{ flexGrow: 1, textAlign: "center", color: "#153243", fontWeight: 900 }}>
            Williams Headlines Forum
          </Typography>
        
        </Toolbar>
      </AppBar>
    </Box>
  );
}