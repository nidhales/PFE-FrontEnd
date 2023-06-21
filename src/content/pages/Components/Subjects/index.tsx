import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
  Typography,
  IconButton,
  Dialog,
  List,
  DialogActions,
  InputLabel,
  TextField,
  CircularProgress,
  Tooltip
} from '@mui/material';
import Footer from 'src/components/Footer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import SidebarLayout from 'src/layouts/SidebarLayout';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ISubject } from 'src/models/SubjectModel';
import {
  useAddSubjectMutation,
  useDeleteSubjectMutation,
  useGetAllSubjectsQuery,
  useUpdateSubjectMutation
} from 'src/redux/api/Subjects/subjectApi';
import { theme } from 'src/shared/utils/theme';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';

function Subject() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [subjectId, setSubjectId] = useState<string>('');
  const open: boolean = openAdd || openUpdate;

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setSubjectId(id);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
  // Get Subject
  const { data: subjects, isLoading, error } = useGetAllSubjectsQuery();
  // Delete Subject
  const [deleteSubject] = useDeleteSubjectMutation();
  // Update Subject
  const [updateSubject, { isSuccess: updateArticleSuccess }] =
    useUpdateSubjectMutation();
  // Add Subject
  const [addSubject, { isSuccess: addArticleSuccess }] =
    useAddSubjectMutation();
  // delete handler
  const handleDeleteSubject = async (subjectId: string) => {
    await deleteSubject({ id: subjectId });
  };
  // Submit handler
  const handleSubmitModal = async (formFields, subjectId: string) => {
    if (openAdd) {
      await addSubject({
        subjectName: formFields.subjectName
      });
    } else {
      await updateSubject({
        id: subjectId,
        subjectName: formFields.subjectName
      });
    }
  };
  if (isLoading) return <CircularProgress color="success" />;
  return (
    <>
      <Helmet>
        <title>ShareNet - Subjects</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpenAdd} color="success">
          Add Subject
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
          {subjects?.map((subject) => (
            <>
              <Grid item xs={12} key={subject.id}>
                <Card>
                  <Divider />
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        >
                          {subject.subjectName}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">Learn More</Button>
                      </CardActions>
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
                          onClick={() => handleOpenUpdate(subject.id)}
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Subject Error" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                          onClick={() => handleDeleteSubject(subject.id)}
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
                isSuccess={addArticleSuccess || updateArticleSuccess}
                onSubmit={handleSubmitModal}
                handleClose={openAdd ? handleCloseAdd : handleCloseUpdate}
                fields={[
                  {
                    label: 'Subject Name',
                    name: 'subjectName',
                    type: 'text',
                    required: true
                  }
                ]}
                action={openAdd ? 'add' : 'update'}
                title={openAdd ? 'Add Subject' : 'Update Subject'}
                id={subjectId}
              />
            </>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Subject;
