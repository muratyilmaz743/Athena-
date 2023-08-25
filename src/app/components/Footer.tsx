"use client"

import { Container, Typography, Link, styled } from "@mui/material";

function Footer() {
  const CustomTypography = styled(Typography)({
    color: 'white'
  });

  return (
    <Container maxWidth="xl" disableGutters style={{ marginTop: '2rem', paddingBottom: '2rem', paddingTop: '2rem', background: '#1976d2' }}>
      <CustomTypography variant="body2" color="textSecondary" align="center">
        Made with ❤️ by Murat YILMAZ
      </CustomTypography>
      <CustomTypography variant="body2" color="textSecondary" align="center">
        <Link variant="body2" color="textPrimary" align="center" href="https://github.com/muratyilmaz743">
          My GITHUB
        </Link>
      </CustomTypography>

    </Container>
  );
}

export default Footer;
