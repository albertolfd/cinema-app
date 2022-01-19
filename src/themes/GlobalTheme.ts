import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      highlight: string;
    };
  }
  interface ThemeOptions {
    status?: {
      highlight?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    header: true;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    highlight: true;
  }
}

declare module '@mui/material/Link' {
  interface TypographyPropsVariantOverrides {
    highlight: true;
  }
}

const theme = createTheme({
  status: {
    highlight: '#3498db'
  },
  palette: {
    primary: {
      main: '#dd003f'
    },
    secondary: {
      main: '#fff'
    },
    text: {
      primary: '#fff',
      secondary: '#abb7c4'
    },
    action: {
      disabledBackground: '#898484',
      disabled: '#fff'
    }
  },
  typography: {
    fontFamily: 'Roboto',
    fontSize: 14,
    h1: {
      fontSize: 36,
      fontWeight: 'bold'
    },
    button: {
      fontSize: 20,
      textTransform: 'none'
    }
  },
  shape: {
    borderRadius: 30
  },
  breakpoints: {
    values: {
      xs: 580,
      sm: 700,
      md: 860,
      lg: 1200,
      xl: 1536
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          fontWeight: 'bold',
          fontSize: 16
        }
      }
    }
  }
});

const GlobalTheme = createTheme(theme, {
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'header' },
          style: {
            color: '#9aa9bb',
            padding: '6px 8px',
            textTransform: 'none',
            fontWeight: 'normal'
          }
        }
      ]
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'highlight' },
          style: {
            color: theme.status.highlight
          }
        },
        {
          props: { variant: 'highlight', fontSize: 'large' },
          style: {
            fontSize: 26
          }
        }
      ]
    },
    MuiLink: {
      variants: [
        {
          props: { variant: 'highlight' },
          style: {
            color: theme.status.highlight,
            textDecorationColor: '#3498db8f'
          }
        },
        {
          props: { variant: 'highlight', fontSize: 'large' },
          style: {
            fontSize: 26
          }
        }
      ]
    }
  }
});

export default GlobalTheme;
