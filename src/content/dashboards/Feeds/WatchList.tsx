import { MouseEvent, useState } from 'react';
import {
  Box,
  ToggleButtonGroup,
  Typography
} from '@mui/material';
import WatchListColumn from './WatchListColumn';


function WatchList() {
  const [tabs, setTab] = useState<string | null>('watch_list_columns');

  const handleViewOrientation = (
    _event: MouseEvent<HTMLElement>,
    newValue: string | null
  ) => {
    setTab(newValue);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pb: 3
        }}
      >
        <Typography variant="h3">Feeds</Typography>
        <ToggleButtonGroup
          value={tabs}
          exclusive
          onChange={handleViewOrientation}
        >
        </ToggleButtonGroup>
      </Box>

      {tabs === 'watch_list_columns' && <WatchListColumn />}

    </>
  );
}

export default WatchList;
