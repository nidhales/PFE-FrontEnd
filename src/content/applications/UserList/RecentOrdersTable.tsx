import { FC, ChangeEvent, useState, useEffect } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
  CircularProgress,
  Alert,
  AlertTitle
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation
} from 'src/redux/api/Users/userApi';
import CustomModal from 'src/components/CustomModal/CustomModal';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

const getStatusLabel = (cryptoOrderStatus: CryptoOrderStatus): JSX.Element => {
  const map = {
    beginner: {
      text: 'Beginner',
      color: 'error'
    },
    competent: {
      text: 'Competent',
      color: 'warning'
    },
    expert: {
      text: 'Expert',
      color: 'success'
    }
  };
  const { text, color }: any = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  cryptoOrders: CryptoOrder[],
  filters: Filters
): CryptoOrder[] => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  cryptoOrders: CryptoOrder[],
  page: number,
  limit: number
): CryptoOrder[] => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'expert',
      name: 'Expert'
    },
    {
      id: 'competent',
      name: 'Competent'
    },
    {
      id: 'beginner',
      name: 'Beginner'
    }
  ];
  const handleStatusChange = (r: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (r.target.value !== 'all') {
      value = r.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };
  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked
        ? cryptoOrders.map((cryptoOrder) => cryptoOrder.id)
        : []
    );
  };
  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedCryptoOrders.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };
  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };
  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };
  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  // API Calls
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser, { isSuccess }] = useUpdateUserMutation();

  // delete handler
  const handleDeleteUser = async (userId: string) => {
    await deleteUser({ id: userId });
  };

  const [userId, setUserId] = useState<string>('');
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    setUserId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmitModal = async (formFields, userId: string) => {
    await updateUser({
      id: userId,
      FirstName: formFields.FirstName,
      LastName: formFields.LastName,
      PhoneNumber: formFields.PhoneNumber,
      email: formFields.email,
      password: formFields.password,
      image: formFields.image
    });
  };
  if (isLoading) return <CircularProgress color="primary" />;

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone number</TableCell>
              <TableCell align="right">Badge</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {error ? (
            <Alert severity="error">
              <AlertTitle>No Data Found</AlertTitle>
              <strong>NO Users found. Please try add some.</strong>
            </Alert>
          ) : (
            users?.map((user) => (
              <>
                <TableBody key={user.id}>
                  <TableRow hover key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox color="primary" />
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.FirstName} {user.LastName}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      ></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.email}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      ></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.PhoneNumber}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      ></Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {user.badges.name}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        noWrap
                      ></Typography>
                    </TableCell>{' '}
                    <TableCell align="right">
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
                          onClick={() => handleOpen(user.id)}
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
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
                <CustomModal
                  open={open}
                  isSuccess={isSuccess}
                  onSubmit={handleSubmitModal}
                  handleClose={handleClose}
                  fields={[
                    {
                      label: 'First Name',
                      name: 'FirstName',
                      type: 'text',
                      required: true
                    },
                    {
                      label: 'Last Name',
                      name: 'LastName',
                      type: 'text',
                      required: true
                    },
                    {
                      label: 'Phone Number',
                      name: 'PhoneNumber',
                      type: 'text',
                      required: true
                    },
                    {
                      label: 'Email',
                      name: 'email',
                      type: 'text',
                      required: true
                    },
                    {
                      label: 'Password',
                      name: 'password',
                      type: 'password',
                      required: true
                    },
                    ,
                    {
                      label: 'Badge',
                      name: 'password',
                      type: 'password',
                      required: true
                    }
                  ]}
                  action="Update"
                  title="Update User"
                />
              </>
            ))
          )}
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
