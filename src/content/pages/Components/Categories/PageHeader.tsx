import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Dialog,
  DialogActions,
  Divider,
  InputLabel,
  List,
  TextField
} from '@mui/material';
import Footer from 'src/components/Footer';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useAddCategoryMutation } from 'src/redux/api/Categories/categoryApi';

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };
  const [catName, setCatName] = useState('');

  const [addCategory] = useAddCategoryMutation();

  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addCategory({ name: catName })
      .unwrap()
      .then(() => handleClose());

    setCatName('');
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <List sx={{ pt: 1 }}>
        <Container maxWidth="lg">
          <Grid
            marginTop="-300px"
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
            sx={{
              mt: 1
            }}
          >
            <Grid item xs={12}>
              <DialogActions>
                <Button onClick={handleClose} color="success">
                  <CloseIcon />
                </Button>
              </DialogActions>
              <Card>
                <CardHeader title="Add Category" />
                <Divider />
                <form onSubmit={handleAddCategory}>
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        <InputLabel
                          sx={{
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            margin: 1,
                            color: '#000000'
                          }}
                          htmlFor="name"
                        >
                          Category Title
                        </InputLabel>
                        <TextField
                          color="success"
                          fullWidth
                          multiline
                          type="email"
                          name="email"
                          id="email"
                          variant="outlined"
                          size="small"
                          value={catName}
                          onChange={(e) => {
                            setCatName(e.target.value);
                          }}
                        />
                      </CardContent>
                    </Card>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{
                      margin: 2
                    }}
                    type="submit"
                  >
                    Add Category
                  </Button>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </List>
    </Dialog>
  );
}
SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};
function PageHeader() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState([1]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Categories List
        </Typography>
      </Grid>
      <Button variant="contained" onClick={handleClickOpen} color="success">
        Add Category
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />{' '}
    </Grid>
  );
}

export default PageHeader;
