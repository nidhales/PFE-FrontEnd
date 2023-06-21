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
  useGetErrorByIdQuery,
  useUpdateErrorMutation
} from 'src/redux/api/Errors/errorApi';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { theme } from 'src/shared/utils/theme';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import Chat from '../chat';
import { useParams } from 'react-router';

function Result() {
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
  const { id } = useParams();
  console.log(id);
  // API Calls
  const { data: errors, isLoading, error } = useGetErrorByIdQuery({ id: id });
  const [deleteError] = useDeleteErrorMutation();
  const [updateError, { isSuccess: updateErrorSuccess }] =
    useUpdateErrorMutation();
  const [addError, { isSuccess: addErrorSuccess }] = useAddErrorMutation();
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
        {' '}
        <Typography variant="h3">Results</Typography>
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
            <Grid item xs={12} key={errors?.id}>
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
                        {errors?.ErrorName}{' '}
                      </Typography>
                      <Typography variant="body2">
                        {errors?.ErrorDescription}
                      </Typography>
                    </CardContent>
                  </Card>
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Result;
