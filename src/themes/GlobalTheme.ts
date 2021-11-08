import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    danger: true;
    header: true;
  }
}

const theme = createTheme({
  status: {
    danger: '#FFA51F'
  },
  palette: {
    primary: {
      main: '#dd003f'
    },
    secondary: {
      main: '#dcf836'
    },
    text: {
      primary: '#fff',
      secondary: '#dd003f'
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
      xs: 0,
      sm: 600,
      md: 830,
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
          textTransform: 'uppercase'
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
            fontSize: 16,
            padding: '6px 8px',
            textTransform: 'none'
          }
        },
        {
          props: { variant: 'danger' },
          style: {
            color: theme.status.danger
          }
        },
        {
          props: { variant: 'danger', size: 'large' },
          style: {
            fontSize: 26
          }
        }
      ]
    }
  }
});

export default GlobalTheme;
