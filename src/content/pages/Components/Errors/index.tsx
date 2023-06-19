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
  Tooltip
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import {
  useAddErrorMutation,
  useDeleteErrorMutation,
  useGetAllErrorsQuery,
  useUpdateErrorMutation
} from 'src/redux/api/Errors/errorApi';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { theme } from 'src/shared/utils/theme';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

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
  // API Calls
  const { data: errors, isLoading, error } = useGetAllErrorsQuery();
  const [deleteError] = useDeleteErrorMutation();
  const [updateError, { isSuccess: updateErrorSuccess }] =
    useUpdateErrorMutation();
  const [addError, { isSuccess: addErrorSuccess }] = useAddErrorMutation();

  // delete handler
  const handleDeleteError = async (errorId: string) => {
    await deleteError({ id: errorId });
  };

  const handleSubmitModal = async (formFields, errorId: string) => {
    if (openAdd) {
      await addError({
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
          {errors?.map((error) => (
            <>
              <Grid item xs={12} key={error.id}>
                <Card>
                  <Divider />
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 25 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {error.ErrorName}{' '}
                        </Typography>
                        <Typography variant="body2">
                          {error.ErrorDescription}
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
                          onClick={() => handleOpenUpdate(error.id)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Error" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteError(error.id)}
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
                  }
                ]}
                action={openAdd ? 'Add' : 'Update'}
                title={openAdd ? 'Add Error' : 'Update Error'}
                id={errorId}
              />
            </>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Error;
