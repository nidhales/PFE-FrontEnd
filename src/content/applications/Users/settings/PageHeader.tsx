import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

function PageHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
    }
  }, []);

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        User Settings
      </Typography>
      <Typography variant="subtitle2">
        {user?.FirstName} {user?.LastName} this is your user settings panel.
      </Typography>
    </>
  );
}

export default PageHeader;
