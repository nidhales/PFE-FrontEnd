import { FC, ChangeEvent, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
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

import { CryptoOrder, CryptoOrderStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation
} from 'src/redux/api/Categories/categoryApi';
import CustomModal from 'src/components/CustomModal/CustomModal';

interface RecentOrdersTableProps {
  className?: string;
  cryptoOrders: CryptoOrder[];
}

interface Filters {
  status?: CryptoOrderStatus;
}

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

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ cryptoOrders }) => {
  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState<string[]>(
    []
  );
  const [catId, setCatId] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const theme = useTheme();

  // API Calls
  const { data: categories, isLoading, error } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isSuccess }] = useUpdateCategoryMutation();

  // delete handler
  const handleDeleteCategory = async (categoryId: string) => {
    await deleteCategory({ id: categoryId });
  };

  const [open, setOpen] = useState(false);
  const handleOpen = (id: string) => {
    setOpen(true);
    setCatId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitModal = async (formFields, catId: string) => {
    await updateCategory({
      id: catId,
      name: formFields.name
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
              <TableCell padding="checkbox"></TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          {error ? (
            <Alert severity="error">
              <AlertTitle>No Data Found</AlertTitle>
              <strong>NO categories found. Please try add some.</strong>
            </Alert>
          ) : (
            categories.map((category) => (
              <>
                <TableBody key={category.id}>
                  <TableRow hover key={category.id}>
                    <TableCell padding="checkbox"></TableCell>

                    <TableCell key={category.id}>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {category.name}
                      </Typography>
                    </TableCell>

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
                          onClick={() =>
                            handleOpen(category.id)
                          }
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
                          onClick={() => handleDeleteCategory(category.id)}
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
                      label: 'Category title',
                      name: 'name',
                      type: 'text',
                      required: true
                    }
                  ]}
                  action="Update"
                  title="Update Category"
                  id={catId}
                />
              </>
            ))
          )}
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
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
