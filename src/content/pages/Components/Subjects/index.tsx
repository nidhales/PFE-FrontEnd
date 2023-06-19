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

// function SimpleDialog(props) {
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };
//   const navigate = useNavigate();
//   const [addSubject] = useAddSubjectMutation();

//   const [SubjectName, setSubjectName] = useState('');
//   const handleAddSubject = async (e) => {
//     e.preventDefault();
//     await addSubject({
//       subjectName: SubjectName
//     })
//       .unwrap()
//       .then(() => handleClose());
//   };

//   return (
//     <Dialog onClose={handleClose} open={open} fullScreen>
//       <List sx={{ pt: 1 }}>
//         <SidebarLayout />
//         <Container maxWidth="lg">
//           <Grid
//             marginTop="-300px"
//             container
//             direction="row"
//             justifyContent="center"
//             alignItems="stretch"
//             spacing={3}
//           >
//             <Grid item xs={12}>
//               <DialogActions>
//                 <Button onClick={handleClose} color="success">
//                   <CloseIcon />
//                 </Button>
//               </DialogActions>
//               <Card>
//                 <CardHeader title="Add Subject" />
//                 <Divider />
//                 <form onSubmit={handleAddSubject}>
//                   <CardContent>
//                     <Card sx={{ minWidth: 275 }}>
//                       <CardContent>
//                         <InputLabel
//                           sx={{
//                             fontWeight: 'bold',
//                             fontStyle: 'italic',
//                             marginTop: 1,
//                             color: '#000000'
//                           }}
//                           htmlFor="name"
//                         >
//                           Subject Title
//                         </InputLabel>

//                         <TextField
//                           color="success"
//                           fullWidth
//                           type="text"
//                           name="name"
//                           id="name"
//                           variant="outlined"
//                           size="small"
//                           value={SubjectName}
//                           onChange={(e) => {
//                             setSubjectName(e.target.value);
//                           }}
//                         />
//                       </CardContent>
//                     </Card>
//                   </CardContent>
//                   <Button
//                     variant="contained"
//                     color="success"
//                     sx={{
//                       margin: 2
//                     }}
//                     type="submit"
//                   >
//                     Add Subject
//                   </Button>
//                 </form>
//               </Card>
//             </Grid>
//           </Grid>
//         </Container>
//         <Footer />
//       </List>
//     </Dialog>
//   );
// }

// SimpleDialog.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   open: PropTypes.bool.isRequired,
//   selectedValue: PropTypes.string.isRequired
// };
function Subject() {
  const [selectedValue, setSelectedValue] = useState();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // API Calls
  const { data: subjects, isLoading, error } = useGetAllSubjectsQuery();
  const [deleteSubject] = useDeleteSubjectMutation();
  const [updateSubject, { isSuccess }] = useUpdateSubjectMutation();

  // delete handler
  const handleDeleteSubject = async (subjectId: string) => {
    await deleteSubject({ id: subjectId });
  };

  const handleSubmitModal = async (formFields, id: string) => {
    await updateSubject({
      id: id,
      name: formFields.name
    });
  };
  if (isLoading) return <CircularProgress color="success" />;
  console.log(error);
  return (
    <>
      <Helmet>
        <title>ShareNet - Subjects</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpen} color="success">
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
                          onClick={handleOpen}
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
                isSuccess={isSuccess}
                onSubmit={handleSubmitModal}
                handleClose={handleClose}
                fields={[
                  {
                    label: 'Subject Name',
                    name: 'name',
                    type: 'text',
                    required: true
                  }
                ]}
                action="Update"
                title="Update Subject"
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
