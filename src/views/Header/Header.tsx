import { AppBar, Box, Drawer, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import AnimatedGradientBar from 'views/AnimatedGradientBar/AnimatedGradientBar';
import MenuIcon from '@mui/icons-material/Menu';
import IMAGES from 'assets/AssetCatalogue';
import styles from './Header.module.scss';
import HeaderNavigation from './HeaderNavigation';

const GRADIENT_BAR_HEIGHT = 5;
const HEADER_HEIGHT = 56;

const Header: FC = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!isMobileScreen) {
      setMobileMenuOpen(false);
    }
  }, [isMobileScreen]);

  const handleMenuOpen = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <Grid container position="fixed" direction="column">
        <Grid item>
          <AnimatedGradientBar
            height={GRADIENT_BAR_HEIGHT}
            gradient="linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
          />
        </Grid>

        <Grid item>
          <AppBar position="relative" sx={{ height: HEADER_HEIGHT }} className={styles.header}>
            <div className={styles.logo}>
              <img src={IMAGES.APP_LOGO} alt="cinema-app-logo" style={{ width: 160 }} />
            </div>

            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <HeaderNavigation />
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton onClick={handleMenuOpen}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Drawer
              open={isMobileScreen && mobileMenuOpen}
              anchor="right"
              onClose={handleMenuOpen}
              hideBackdrop
              sx={{ top: GRADIENT_BAR_HEIGHT + HEADER_HEIGHT }}
              PaperProps={{
                sx: { top: GRADIENT_BAR_HEIGHT + HEADER_HEIGHT, boxShadow: 'none' }
              }}
            >
              <Box padding="25px 10px">
                <HeaderNavigation displayDirection="column" />
              </Box>
            </Drawer>
          </AppBar>
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    </>
  );
};

export default Header;
