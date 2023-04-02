"use client"

import { Container, Typography, Link, makeStyles, styled } from "@mui/material";

function Footer() {
  const CustomTypography = styled(Typography)({
    color:'white'
  });

  return (
    <Container maxWidth="xl" disableGutters style={{ marginTop: '2rem', paddingBottom: '2rem', paddingTop:'2rem', background: '#1976d2' }}>
      <CustomTypography variant="body2" color="textSecondary" align="center">
        Made with ❤️ by Felece UI Team
      </CustomTypography>
      <CustomTypography variant="body2" color="textSecondary" align="center">
        Copyright &copy; 2023
      </CustomTypography>
      <CustomTypography variant="body2" color="textSecondary" align="center">
        <Link color="inherit" href="#">Terms of Use</Link> | <Link color="inherit" href="#">Privacy Policy</Link>
      </CustomTypography>
    </Container>
  );
}

export default Footer;
