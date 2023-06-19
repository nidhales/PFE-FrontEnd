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
  CircularProgress,
  Tooltip
} from '@mui/material';
import Footer from 'src/components/Footer';
import Button from '@mui/material/Button';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {
  useAddArticleMutation,
  useDeleteArticleMutation,
  useGetAllArticlesQuery,
  useUpdateArticleMutation
} from 'src/redux/api/Article/articleApi';
import { theme } from 'src/shared/utils/theme';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import CustomModal from 'src/components/CustomModal/CustomModal';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// function SimpleDialog(props) {
//   const { onClose, selectedValue, open } = props;

//   const handleClose = () => {
//     onClose(selectedValue);
//   };

//   const [addArticle] = useAddArticleMutation();
//   const [articleName, setArticletName] = useState('');
//   const [articleContent, setArticletContent] = useState('');
//   const handleaddArticle = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     await addArticle({
//       ArticleName: articleName,
//       ArticleContent: articleContent
//     })
//       .unwrap()
//       .then(() => handleClose());
//   };

//   return (
//     <Dialog onClose={handleClose} open={open}>
//       <List sx={{ pt: 1 }}>
//         <Container maxWidth="lg">
//           <Grid
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
//                 <CardHeader title="Add Solution" />
//                 <Divider />
//                 <form onSubmit={handleaddArticle}>
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
//                           htmlFor="score"
//                         >
//                           Article Name
//                         </InputLabel>

//                         <TextField
//                           color="success"
//                           fullWidth
//                           type="text"
//                           name="score"
//                           id="name"
//                           variant="outlined"
//                           size="small"
//                           value={articleName}
//                           onChange={(e) => {
//                             setArticletName(e.target.value);
//                           }}
//                         />
//                         <InputLabel
//                           sx={{
//                             fontWeight: 'bold',
//                             fontStyle: 'italic',
//                             marginTop: 1,
//                             color: '#000000'
//                           }}
//                           htmlFor="email"
//                         >
//                           Article Content
//                         </InputLabel>
//                         <TextField
//                           color="success"
//                           fullWidth
//                           multiline
//                           type="text"
//                           name="code"
//                           id="email"
//                           variant="outlined"
//                           size="small"
//                           value={articleContent}
//                           onChange={(e) => {
//                             setArticletContent(e.target.value);
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
//                     Add Article
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
function Article() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [articleId, setArticleId] = useState<string>('');
  const open: boolean = openAdd || openUpdate;

  const handleOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleOpenUpdate = (id: string) => {
    setOpenUpdate(true);
    setArticleId(id);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  // API Calls
  const { data: articles, isLoading, error } = useGetAllArticlesQuery();
  const [deleteArticle] = useDeleteArticleMutation();
  const [updateArticle, { isSuccess: updateArticleSuccess }] =
    useUpdateArticleMutation();
  const [addArticle, { isSuccess: addArticleSuccess }] =
    useAddArticleMutation();

  // delete handler
  const handleDeleteArticle = async (articleId: string) => {
    await deleteArticle({ id: articleId });
  };

  const handleSubmitModal = async (formFields, articleId: string) => {
    if (openAdd) {
      await addArticle({
        ArticleName: formFields.ArticleName,
        ArticleContent: formFields.ArticleContent
      });
    } else {
      await updateArticle({
        id: articleId,
        ArticleName: formFields.ArticleName,
        ArticleContent: formFields.ArticleContent
      });
    }
  };
  if (isLoading) return <CircularProgress color="primary" />;
  return (
    <>
      <Helmet>
        <title>ShareNet - Article</title>
      </Helmet>
      <PageTitleWrapper>
        <Button variant="contained" onClick={handleOpenAdd} color="success">
          Add Article
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
          {articles?.map((article) => (
            <>
              <Grid item xs={12} key={article.id}>
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
                          {article.ArticleName}
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                          {article.ArticleContent}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small">
                          https://redux-toolkit.js.org/rtk-query/overview
                        </Button>
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
                          onClick={() => handleOpenUpdate(article.id)}
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
                          onClick={() => handleDeleteArticle(article.id)}
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
                    label: 'Article Name',
                    name: 'ArticleName',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'Article Description',
                    name: 'ArticleContent',
                    type: 'text',
                    required: true
                  },
                  {
                    label: 'URL',
                    name: 'ArticleContent',
                    type: 'text',
                    required: true
                  }
                ]}
                action={openAdd ? 'add' : 'update'}
                title={openAdd ? 'Add Article' : 'Update Article'}
                id={articleId}
              />
            </>
          ))}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}
export default Article;
