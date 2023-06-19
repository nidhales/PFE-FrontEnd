import { Grid } from '@mui/material';
import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const styles = {
    heroContainer: {
      backgroundImage: `url(${'../background.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: `100%`,
      height: `100%`
    }
  };
  return (
    <Grid
      sx={{ mt: 5 }}
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      // style={styles.heroContainer}
    >
      <img
        src="continousnet.png"
        alt="continuousnet-logo"
        style={{
          height: `100px`
        }}
      />
      <main> {children} </main>
    </Grid>
  );
};

export default AuthLayout;
