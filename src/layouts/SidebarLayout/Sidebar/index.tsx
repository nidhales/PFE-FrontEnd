import { useContext } from 'react';
import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import FacebookIcon from '@mui/icons-material/Facebook';
import {
  Box,
  Drawer,
  styled,
  Divider,
  useTheme,
  darken,
  Tooltip,
  IconButton
} from '@mui/material';
import SidebarMenu from './SidebarMenu';
import Logo from 'src/components/LogoSign';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LanguageIcon from '@mui/icons-material/Language';
const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        height: 100%;
        padding-bottom: 68px;
`
);
function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <SidebarWrapper
        sx={{
          display: {
            xs: 'none',
            lg: 'inline-block'
          },
          position: 'fixed',
          left: 0,
          top: 0,
          backgroundColor: 'white',
          boxShadow:
            theme.palette.mode === 'light' ? theme.sidebar.boxShadow : 'none'
        }}
      >
        <Scrollbar>
          <Box mt={3}>
            <Box
              mx={2}
              sx={{
                width: 52
              }}
            >
              <Logo />
            </Box>
          </Box>
          <Divider
            sx={{
              mt: theme.spacing(3),
              background: theme.colors.alpha.black[90]
            }}
          />
          <SidebarMenu />
        </Scrollbar>
        <Divider
          sx={{
            background: theme.colors.alpha.black[90]
          }}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            mt: theme.spacing(1)
          }}
        >
          <a href="https://www.facebook.com/continuousnettn">
            <Tooltip arrow title="Facebook">
              <IconButton color="default">
                <FacebookIcon />
              </IconButton>
            </Tooltip>
          </a>

          <a href="https://continuousnet.com/">
            <Tooltip arrow title="Twitter">
              <IconButton color="default">
                <LanguageIcon />
              </IconButton>
            </Tooltip>
          </a>

          <a href="https://www.linkedin.com/company/continuous-net/">
            <Tooltip arrow placement="right" title="Instagram">
              <IconButton color="default">
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
          </a>
        </Box>
      </SidebarWrapper>
      <Drawer
        sx={{
          boxShadow: `${theme.sidebar.boxShadow}`
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            background: theme.palette.success
              ? theme.colors.success
              : darken(theme.colors.alpha.green[100], 0.5)
          }}
        >
          <Scrollbar>
            <Box mt={3}>
              <Box
                mx={2}
                sx={{
                  width: 52
                }}
              >
                <Logo />
              </Box>
            </Box>
            <Divider
              sx={{
                mt: theme.spacing(3),
                mx: theme.spacing(2),
                background: theme.colors.alpha.black[100]
              }}
            />
            <SidebarMenu />
          </Scrollbar>
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
