import { Helmet } from 'react-helmet-async';
import { Container, Grid } from '@mui/material';
import Footer from 'src/components/Footer';
import WatchList from './WatchList';

function DashboardCrypto() {
  return (
    <>
      <Helmet>
        <title>ShareNet - Feeds</title>
      </Helmet>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12}></Grid>
          <Grid item lg={8} xs={12}></Grid>
          <Grid item lg={4} xs={12}></Grid>
          <Grid item xs={12}>
            <WatchList />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardCrypto;
