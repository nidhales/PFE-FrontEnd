import { forwardRef, Ref, useState, ReactElement, ChangeEvent } from 'react';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import axios, { AxiosResponse } from 'axios';
import { SearchResult } from './searchinterface';
import { Link } from 'react-router-dom';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    const query = event.target.value;
    setSearchValue(query);

    if (query) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }

      try {
        const response: AxiosResponse<SearchResult[]> = await axios.post(
          'http://localhost:3000/error/search',
          { name: query }
        );
        const searchResults: SearchResult[] = response.data;

        setSearchResults(searchResults);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setOpenSearchResults(false);
    }
  };
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton
          sx={{
            color: 'black'
          }}
          onClick={handleClickOpen}
        >
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <DialogContent>
              <Box
                sx={{ pt: 0, pb: 1 }}
                display="flex"
                justifyContent="space-between"
              >
                <Typography variant="body2" component="span">
                  Search results for{' '}
                  <Typography
                    sx={{ fontWeight: 'bold' }}
                    variant="body1"
                    component="span"
                  >
                    {searchValue}
                  </Typography>
                </Typography>
              </Box>
              <Divider sx={{ my: 1 }} />
              {searchResults.map((result: SearchResult) => (
                <List disablePadding key={result.id}>
                  <ListItem button component={Link} to={`/result/${result.id}`}>
                    <Hidden smDown>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            background: (theme: Theme) =>
                              theme.palette.secondary.main
                          }}
                        >
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                      {result.ErrorName}
                    </Hidden>
                  </ListItem>
                </List>
              ))}
            </DialogContent>
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
