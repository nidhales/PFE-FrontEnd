import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Box,
  useMediaQuery,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  alpha,
  styled,
  Avatar
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  useAddErrorMutation,
  useDeleteErrorMutation,
  useGetAllErrorsQuery,
  useGetUserErrorsQuery,
  useUpdateErrorMutation
} from 'src/redux/api/Errors/errorApi';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Label from 'src/components/Label';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { theme } from 'src/shared/utils/theme';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { SolutionBox } from 'src/content/dashboards/Feeds/WatchList.style';
import { useAddUserErrorMutation } from 'src/redux/api/Users/userApi';
import { getCurrentUser } from 'src/shared/helpers/getUser';
const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    margin: ${theme.spacing(0, 0, 1, -0.5)};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: ${theme.spacing(1)};
    padding: ${theme.spacing(0.5)};
    border-radius: 60px;
    height: ${theme.spacing(5.5)};
    width: ${theme.spacing(5.5)};
    background: ${
      theme.palette.mode === 'dark'
        ? theme.colors.alpha.trueWhite[30]
        : alpha(theme.colors.alpha.black[100], 0.07)
    };
  
    img {
      background: ${theme.colors.alpha.trueWhite[100]};
      padding: ${theme.spacing(0.5)};
      display: block;
      border-radius: inherit;
      height: ${theme.spacing(4.5)};
      width: ${theme.spacing(4.5)};
    }
`
);
const CardActionsWrapper = styled(CardActions)(
  ({ theme }) => `
     background: ${theme.colors.alpha.black[5]};
     padding: ${theme.spacing(2)};
`
);
function Error() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [errorId, setErrorId] = useState<string>('');
  const open: boolean = openAdd || openUpdate;

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setErrorId(id);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  const user = getCurrentUser();

  // Get Errors
  const { data: errors, isLoading } = useGetUserErrorsQuery({ id: user._id });
  // Delete Error
  const [deleteError] = useDeleteErrorMutation();
  // Update Error
  const [updateError, { isSuccess: updateErrorSuccess }] =
    useUpdateErrorMutation();
  // Add Error
  const [addError, { isSuccess: addErrorSuccess }] = useAddUserErrorMutation();
  // delete handler
  const handleDeleteError = async (errorId: string) => {
    await deleteError({ id: errorId });
  };
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const handleSubmitModal = async (formFields, errorId: string) => {
    if (openAdd) {
      await addError({
        id: user?._id,
        ErrorName: formFields.ErrorName,
        ErrorDescription: formFields.ErrorDescription
      });
    } else {
      await updateError({
        id: errorId,
        ErrorName: formFields.ErrorName,
        ErrorDescription: formFields.ErrorDescription
      });
    }
  };

  const [likes, setLikes] = useState(0);
  const [active, setActive] = useState(false);

  const handleLike = () => {
    setLikes(likes + 1);
    setActive(!active);
  };
  if (isLoading) return <CircularProgress color="success" />;

  return (
    <>
      <Helmet>
        <title>ShareNet - Error</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpenAdd} color="success">
          Add Error
        </Button>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="stretch"
              spacing={3}
            >
              {errors?.errors?.map((error) => (
                <Grid item md={12} xs={12} key={error.id}>
                  <Card
                    sx={{
                      overflow: 'visible'
                    }}
                  >
                    <Box
                      sx={{
                        p: 5
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <AvatarWrapper>
                          <img alt="BTC" src={user?.image} />{' '}
                        </AvatarWrapper>
                        <Box>
                          <Typography variant="h4" noWrap>
                            {user?.FirstName} {user?.LastName}
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          flexDirection: isMobile ? 'column' : 'row',
                          pt: 3
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            pr: 1,
                            mb: 3
                          }}
                        >
                          {error?.ErrorName}
                        </Typography>

                        <Typography variant="h6" sx={{ mb: 2 }}>
                          {!isMobile && '| '}{' '}
                          {error?.errors?.categories[0]?.name}{' '}
                          <Label color="success">
                            {' '}
                            {error?.errors?.tags[0]?.TagName}
                          </Label>
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'flex-start',
                          p: 1,
                          boxShadow: 10,
                          backgroundColor: '#f2f2f2'
                        }}
                        style={{
                          whiteSpace: 'pre-wrap',
                          fontFamily: 'monospace'
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ mb: 2 }}
                          style={{
                            whiteSpace: 'pre-wrap',
                            fontFamily: 'monospace'
                          }}
                        >
                          {error.ErrorDescription}
                        </Typography>
                      </Box>

                      <CardActionsWrapper
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: isMobile ? 'column' : 'row'
                        }}
                      >
                        <Box display="flex">
                          <Button
                            color="success"
                            startIcon={<ThumbUpAltTwoToneIcon />}
                            variant="contained"
                            sx={{
                              mx: 2
                            }}
                            onClick={handleLike}
                            style={{
                              backgroundColor: active ? '#BD2222' : '#57CA22'
                            }}
                          >
                            Like
                          </Button>
                        </Box>
                        <Box display="flex" sx={{ mt: { xs: 2, md: 0 } }}>
                          <Typography variant="subtitle2" component="span">
                            <text color="black">
                              <span>
                                {likes}{' '}
                                {likes === 1 ? 'reaction •' : 'reactions •'}
                              </span>
                            </text>{' '}
                            <text color="black">
                              <b>{error.solutions.length}</b>
                            </text>{' '}
                            comments
                          </Typography>
                        </Box>
                      </CardActionsWrapper>
                      <Box>
                        <CardActions disableSpacing>
                          <Tooltip title="Edit Order" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.primary.lighter
                                },
                                color: theme.palette.primary.main
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => handleOpenUpdate(error.id)}
                            >
                              <EditTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete Solution" arrow>
                            <IconButton
                              sx={{
                                '&:hover': {
                                  background: theme.colors.error.lighter
                                },
                                color: theme.palette.error.main
                              }}
                              color="inherit"
                              size="small"
                              onClick={() => handleDeleteError(error._id)}
                            >
                              <DeleteTwoToneIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </CardActions>
                      </Box>
                      {error &&
                        error?.solutions.map((solution) => (
                          <SolutionBox key={solution.id}>
                            <Box display="flex">
                              <AvatarWrapper>
                                <img alt="BTC" src={solution?.user?.image} />{' '}
                              </AvatarWrapper>
                              <Typography variant="h4" alignSelf="center">
                                {solution?.user?.FirstName}{' '}
                                {solution?.user?.LastName}
                              </Typography>
                            </Box>
                            <Accordion>
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h4">
                                  {solution?.guide}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <SyntaxHighlighter
                                  showLineNumbers={true}
                                  language="stylus"
                                  style={dracula}
                                >
                                  {solution?.code}
                                </SyntaxHighlighter>
                              </AccordionDetails>
                            </Accordion>
                          </SolutionBox>
                        ))}
                    </Box>
                  </Card>
                  <Divider />
                </Grid>
              ))}
            </Grid>
            <CustomModal
              open={open}
              isSuccess={addErrorSuccess || updateErrorSuccess}
              onSubmit={handleSubmitModal}
              handleClose={openAdd ? handleCloseAdd : handleCloseUpdate}
              fields={[
                {
                  label: 'Error Name',
                  name: 'ErrorName',
                  type: 'text',
                  required: true
                },
                {
                  label: 'Error Description',
                  name: 'ErrorDescription',
                  type: 'text',
                  required: true
                },
                {
                  label: 'Tag',
                  name: 'Tag  ',
                  type: 'text',
                  required: true
                }
              ]}
              action={openAdd ? 'Add' : 'Update'}
              title={openAdd ? 'Add Error' : 'Update Error'}
              id={errorId}
            />
          </>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Error;
