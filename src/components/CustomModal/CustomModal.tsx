import {
  Dialog,
  List,
  Container,
  Grid,
  DialogActions,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  InputLabel,
  TextField,
  Box,
  Input
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import CloseIcon from '@mui/icons-material/Close';
import { ModalProps } from './CustomModal.type';

const CustomModal = ({
  open,
  onSubmit,
  handleClose,
  fields,
  title,
  isSuccess,
  action,
  id
}: ModalProps) => {
  const [formFields, setFormFields] = useState({});

  const handleModalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formFields, id);
    onSubmit(formFields, id);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Dialog open={open} onClose={handleClose}>
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
                <Button color="success" onClick={handleClose}>
                  <CloseIcon />
                </Button>
              </DialogActions>
              <Card>
                <CardHeader title={title} />
                <Divider />
                <form onSubmit={handleModalSubmit}>
                  <CardContent>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent>
                        {fields.map((field, index) =>
                          field.type === 'file' ? (
                            <Input type="file" />
                          ) : (
                            <Box key={index}>
                              <InputLabel
                                sx={{
                                  fontWeight: 'bold',
                                  fontStyle: 'italic',
                                  margin: 1,
                                  color: '#000000'
                                }}
                                htmlFor="name"
                              >
                                {field.label}
                              </InputLabel>
                              <TextField
                                color="success"
                                fullWidth
                                multiline
                                type={field.type}
                                name={field.name}
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  setFormFields({
                                    ...formFields,
                                    [field.name]: e.target.value
                                  })
                                }
                              >
                              </TextField>
                            </Box>
                          )
                        )}
                      </CardContent>
                    </Card>
                  </CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Button
                      variant="contained"
                      color="success"
                      sx={{
                        margin: 2
                      }}
                      type="submit"
                    >
                      {action}
                    </Button>
                  </Box>
                </form>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </List>
    </Dialog>
  );
};

export default CustomModal;
