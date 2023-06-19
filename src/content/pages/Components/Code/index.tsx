import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Tooltip,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Box
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  useAddCodeMutation,
  useDeleteCodeMutation,
  useGetAllCodesQuery,
  useUpdateCodeMutation
} from 'src/redux/api/Code/codeApi';
import { theme } from 'src/shared/utils/theme';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Label from 'src/components/Label';

function Code() {
  const [selectedValue, setSelectedValue] = useState([1]);
  const [showCommentSection, setShowCommentSection] = useState(false);
  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection);
  };

  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [codeId, setCodeId] = useState<string>('');
  const open: boolean = openAdd || openUpdate;

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setCodeId(id);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // API Calls
  const { data: codes, isLoading, error } = useGetAllCodesQuery();
  const [deleteCode] = useDeleteCodeMutation();
  const [updateCode, { isSuccess: updateCodeSuccess }] =
    useUpdateCodeMutation();
  const [addCode, { isSuccess: addCodeSuccess }] = useAddCodeMutation();
  // delete handler
  const handleDeleteCode = async (codeId: string) => {
    await deleteCode({ id: codeId });
  };

  const handleSubmitModal = async (formFields, codeId: string) => {
    if (openAdd) {
      await addCode({
        title: formFields.title,
        content: formFields.content,
        classeDeLogs: formFields.classeDeLogs,
        config: formFields.config,
        recommendation: formFields.recommendation
      });
    } else {
      await updateCode({
        id: codeId,
        title: formFields.title,
        content: formFields.content,
        classeDeLogs: formFields.classeDeLogs,
        config: formFields.config,
        recommendation: formFields.recommendation
      });
    }
  };
  if (isLoading) return <CircularProgress color="primary" />;
  return (
    <>
      <Helmet>
        <title>ShareNet - Code</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpenAdd} color="success">
          Add Code
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
          {codes?.map((code) => (
            <>
              <Grid item xs={12} key={code.id}>
                <Card>
                  <Divider />
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          variant="h3"
                          color="text.secondary"
                          gutterBottom
                        >
                          {code.title}{' '}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 2 }}>
                          Front-End | <Label color="success">NestJS</Label>
                        </Typography>{' '}
                        <SyntaxHighlighter
                          language="javascript"
                          style={dracula}
                        >
                          {code.content}
                        </SyntaxHighlighter>
                      </CardContent>
                      <CardActions>
                        <Button size="small" onClick={toggleCommentSection}>
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start'
                      }}
                    >
                      {showCommentSection && (
                        <Box
                          sx={{
                            width: '100%',
                            mt: 2
                          }}
                        >
                          <Typography sx={{ m: 1.5 }} variant="h4">
                            Classe de logs
                          </Typography>
                          <Divider />
                          <Box sx={{ m: 3 }}>
                            <Typography>{code.classeDeLogs}</Typography>
                          </Box>
                          <Divider />
                          <Typography sx={{ m: 1.5 }} variant="h4">
                            Configuration
                          </Typography>{' '}
                          <Divider />
                          <Box sx={{ m: 3 }}>
                            <SyntaxHighlighter
                              language="javascript"
                              style={dracula}
                            >
                              {code.config}
                            </SyntaxHighlighter>
                          </Box>
                          <Divider />
                          <Typography sx={{ m: 1.5 }} variant="h4">
                            Recommendation
                          </Typography>
                          <Divider />
                          <Box sx={{ m: 3 }}>
                            <Typography noWrap>
                              {code.recommendation}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Box>
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
                          onClick={() => handleOpenUpdate(code.id)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteCode(code.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </CardContent>
                </Card>
              </Grid>
              <CustomModal
                open={open}
                isSuccess={addCodeSuccess || updateCodeSuccess}
                onSubmit={handleSubmitModal}
                handleClose={openAdd ? handleCloseAdd : handleCloseUpdate}
                fields={[
                  {
                    label: 'Code Title',
                    name: 'title',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Content',
                    name: 'content',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Classe De Logs',
                    name: 'classeDeLogs',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Configs',
                    name: 'config',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Recommendedation',
                    name: 'recommendation',
                    type: 'text',
                    required: true
                  }
                ]}
                action={openAdd ? 'Add' : 'Update'}
                title={openAdd ? 'Add Code' : 'Update Code'}
                id={codeId}
              />
            </>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Code;
