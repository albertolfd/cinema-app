import { AppBar, Box, Drawer, Grid, IconButton, useMediaQuery, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import AnimatedGradientBar from 'views/AnimatedGradientBar/AnimatedGradientBar';
import MenuIcon from '@mui/icons-material/Menu';
import { SVG_ASSETS } from 'assets/AssetCatalogue';
import HeaderNavigation from './HeaderNavigation';

const GRADIENT_BAR_HEIGHT = 5;
const HEADER_HEIGHT = 56;

const Header: FC = ({ children }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const theme = useTheme();
  const isMediumSizeScreen = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (!isMediumSizeScreen) {
      setMobileMenuOpen(false);
    }
  }, [isMediumSizeScreen]);

  const handleMenuOpen = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <>
      <AppBar>
        <Box width="100%">
          <Grid container direction="column">
            <Grid item>
              <AnimatedGradientBar
                height={GRADIENT_BAR_HEIGHT}
                gradient="linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
              />
            </Grid>

            <Grid item container alignItems="center" padding="0px 2%" height={HEADER_HEIGHT}>
              <Grid item flexGrow={1}>
                <img src={SVG_ASSETS.APP_LOGO} alt="cinema-app-logo" style={{ width: 160 }} />
              </Grid>

              <Grid item>
                <Box sx={{ display: `${isMediumSizeScreen ? 'none' : 'flex'}` }}>
                  <HeaderNavigation />
                </Box>

                <Box sx={{ display: `${isMediumSizeScreen ? 'flex' : 'none'}` }}>
                  <IconButton onClick={handleMenuOpen}>
                    <MenuIcon />
                  </IconButton>
                </Box>
              </Grid>

              <Drawer
                open={isMediumSizeScreen && mobileMenuOpen}
                anchor="right"
                onClose={handleMenuOpen}
                sx={{ top: GRADIENT_BAR_HEIGHT + HEADER_HEIGHT }}
                PaperProps={{
                  sx: { top: GRADIENT_BAR_HEIGHT + HEADER_HEIGHT, boxShadow: 'none' }
                }}
                BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
              >
                <Box padding="25px 10px">
                  <HeaderNavigation displayDirection="column" onNavigateHandler={handleMenuOpen} />
                </Box>
              </Drawer>
            </Grid>
          </Grid>
        </Box>
      </AppBar>

      <Box marginTop={`${GRADIENT_BAR_HEIGHT + HEADER_HEIGHT}px`}>{children}</Box>
    </>
  );
};

export default Header;
