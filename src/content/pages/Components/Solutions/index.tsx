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
  Tooltip,
  CircularProgress
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  useAddSolutionMutation,
  useDeleteSolutionMutation,
  useGetAllSolutionsQuery,
  useUpdateSolutionMutation
} from 'src/redux/api/solutions/solutionApi';
import { theme } from 'src/shared/utils/theme';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

function Solution() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [solutionId, setsolutionId] = useState<string>('');
  const open: boolean = openAdd || openUpdate;

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setsolutionId(id);
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  // API Calls
  const { data: solutions, isLoading, error } = useGetAllSolutionsQuery();
  const [deleteSolution] = useDeleteSolutionMutation();
  const [updateSolution, { isSuccess: updateSolutionSuccess }] =
    useUpdateSolutionMutation();
  const [addSolution, { isSuccess: addSolutionSuccess }] =
    useAddSolutionMutation();

  // delete handler
  const handleDeleteSolution = async (solutionId: string) => {
    await deleteSolution({ id: solutionId });
  };

  const handleSubmitModal = async (formFields, solutionId: string) => {
    if (openAdd) {
      await addSolution({
        score: formFields.score,
        code: formFields.code,
        guide: formFields.guide
      });
    } else {
      await updateSolution({
        id: solutionId,
        score: formFields.score,
        code: formFields.code,
        guide: formFields.guide
      });
    }
  };
  if (isLoading) return <CircularProgress color="success" />;

  return (
    <>
      <Helmet>
        <title>ShareNet - Solution</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpenAdd} color="success">
          Add Solution
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
          {solutions?.map((solution) => (
            <>
              <Grid item xs={12} key={solution.id}>
                <Card>
                  <Divider />
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography sx={{ fontSize: 20 }}>
                          {solution.guide}
                        </Typography>
                        <Divider />
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          <SyntaxHighlighter language="stylus" style={dracula}>
                            {solution.code}
                          </SyntaxHighlighter>
                        </Typography>
                        <Typography variant="h5" component="div">
                          {solution.score}
                        </Typography>
                      </CardContent>
                    </Card>
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
                          onClick={() => handleOpenUpdate(solution.id)}
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
                          onClick={() => handleDeleteSolution(solution.id)}
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
                isSuccess={addSolutionSuccess || updateSolutionSuccess}
                onSubmit={handleSubmitModal}
                handleClose={openAdd ? handleCloseAdd : handleCloseUpdate}
                fields={[
                  // {
                  //   label: 'Score',
                  //   name: 'score',
                  //   type: 'number',
                  //   required: false
                  // },
                  {
                    label: 'Solution Code',
                    name: 'code',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Solution Guide',
                    name: 'guide',
                    type: 'text',
                    required: true
                  }
                ]}
                action={openAdd ? 'Add' : 'Update'}
                title={openAdd ? 'Add Solution' : 'Update Solution'}
                id={solutionId}
              />
            </>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Solution;
