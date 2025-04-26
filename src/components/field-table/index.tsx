import { Avatar, Box, Button, FormControl, MenuItem, Pagination, PaginationItem, Select, SelectChangeEvent, Stack, Table, TableBody, TableContainer, Tooltip, Typography, useTheme } from "@mui/material";
import { EnhancedTableHead } from "./TableHead";
import { HeadCell, Order, Field } from "./table";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useConfig } from "../../hooks/useConfig";
import { ROWSPERPAGE } from "../../contants";
import { ContainerTable, StyledTableCell, StyledTableRow } from "./style";
import { ChevronLeft, ChevronRight, Delete, Edit } from "@mui/icons-material";
import CustomizedDialogs from "../Dialog";
import { countPage, getComparator, stableSort } from "../../utils/table";
import { CustomInput } from "../Input";
import useField from "../../hooks/useField";
import FormField from "../../pages/field-manament/FormField";

function createData(
  id: string,
  name: string,
): Field {
  return {
    id,
    name
  };
}

const headCells: readonly HeadCell[] = [

  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Tên lĩnh vực",
  },
];

interface TableProps {
  filters?: any,
  fields: Field[],
  isLoadingField: boolean
}
function CustomFieldTable({ fields, filters, isLoadingField }: TableProps) {
  const filteredData = fields?.filter((item: any) => {
    if (filters) {
      const matchKeyword = item.name.toLowerCase().includes(filters.keyword.toLowerCase());
      const matchCategory = filters.category ? item.type === filters.category : true;
      return matchKeyword && matchCategory;
    }
    return fields
  });
  const { deleteField } = useField()


  const theme = useTheme();
  const { t } = useTranslation();
  const { borderRadius } = useConfig()

  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Field>("id");
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(ROWSPERPAGE);
  const [isOpenUpdateDialog, setOpenUpdateDialog] = useState<boolean>(false);
  const [isOpenDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState("")
  const [deleteId, setDeleteId] = useState("")

  const getFieldNameById = (id: any) => {
    return filteredData?.find(item => item?.id === id)?.name
  };

  const rows = useMemo(() => {
    return filteredData?.map((doct, index) => {
      return createData(
        doct.id,
        doct.name
      );
    });
  }, [filteredData]);


  const isSelected = (id: string) => selected.includes(id);

  const visibleRows = useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy))?.slice(
        (page - 1) * rowsPerPage,
        (page - 1) * rowsPerPage + rowsPerPage
      ),
    [rows, order, orderBy, page, rowsPerPage]
  );

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Field
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent) => {
    setRowsPerPage(Number(event.target.value));
  };

  const handleOpenUpdateDialog = (updateId: any) => {
    setUpdateId(updateId);
    setOpenUpdateDialog(true)
  }

  const handleOpenDeleteDialog = (deleteId: any) => {
    setDeleteId(deleteId);
    setOpenDeleteDialog(true)
  }

  const handleDelete = async (deleteId: string) => {
    setOpenDeleteDialog(false)
    await deleteField(deleteId)
  }

  return (
    <Stack spacing={2}>
      <ContainerTable>

        {/* Search and Filter */}
        {isLoadingField ?
          <Box sx={{ display: "grid", placeItems: "center", height: "100px" }}>
            <Typography variant="body2">Loading ...</Typography>
          </Box>
          :
          <>
            {/* <SearchAndFilter /> */}
            {/* Table */}
            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed", }}>
              <TableContainer sx={{
                border: "1px",
                borderStyle: "solid",
                borderColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[300],
              }}>
                <Table
                  sx={{
                    minWidth: 750,

                  }}
                  aria-labelledby="tableTitle"
                  size={"medium"}
                >
                  <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={handleSelectAllClick}
                    onRequestSort={handleRequestSort}
                    rowCount={rows.length}
                    headCells={headCells}
                  />
                  <TableBody>
                    {visibleRows?.length === 0 ?
                      // Nếu không có dữ liệu hoặc gặp lỗi
                      <StyledTableRow>
                        <StyledTableCell align="center" colSpan={headCells?.length + 2}>
                          <Box sx={{ display: "grid", placeItems: "center", height: "100px" }}>
                            <Typography variant="body2">Không có dữ liệu</Typography>
                          </Box>
                        </StyledTableCell>
                      </StyledTableRow>
                      :
                      // Nếu có dữ liệu
                      visibleRows?.map((row, index) => {
                        const isItemSelected = isSelected(row.id);

                        return (
                          <StyledTableRow
                            hover
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            sx={{ cursor: "pointer" }}
                          >

                            <StyledTableCell padding="normal">
                              {index + 1 + ((page - 1) * rowsPerPage)}
                            </StyledTableCell>

                            <StyledTableCell align="left">
                              <Typography fontWeight={"inherit"} variant="body2">{row?.name || "-"}</Typography>
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              <Box sx={{ display: "flex", justifyContent: "center", gap: 1, width: "100%" }}>

                                <Tooltip title="Chỉnh sửa">
                                  <Avatar
                                    onClick={() => handleOpenUpdateDialog(row?.id)}
                                    variant="rounded"
                                    sx={{
                                      width: '32px !important', height: '32px !important',
                                      border: '1px solid',
                                      cursor: "pointer",
                                      borderRadius: `${borderRadius}px`,
                                      borderColor: "green",
                                      background: "green",
                                      color: theme.palette.primary.light,
                                      '&[aria-controls="menu-list-grow"],&:hover': {
                                        borderColor: "#14A44D",
                                        background: "#14A44D",
                                        color: theme.palette.primary.light
                                      }
                                    }}
                                  >
                                    <Edit />
                                  </Avatar>
                                </Tooltip>

                                <Tooltip title="Xóa">
                                  <Avatar

                                    onClick={() => handleOpenDeleteDialog(row?.id)}
                                    variant="rounded"
                                    sx={{
                                      width: '32px !important', height: '32px !important',
                                      border: '1px solid',
                                      cursor: "pointer",
                                      borderRadius: `${borderRadius}px`,
                                      borderColor: "red",
                                      background: "red",
                                      color: theme.palette.primary.light,
                                      '&[aria-controls="menu-list-grow"],&:hover': {
                                        borderColor: "#dc3545",
                                        background: "#dc3545",
                                        color: theme.palette.primary.light
                                      }
                                    }}
                                  >
                                    <Delete />
                                  </Avatar>
                                </Tooltip>


                              </Box>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* Panigation */}
              {rows?.length > ROWSPERPAGE &&
                <Box
                  sx={{

                    display: "flex",
                    justifyContent: { xs: "center", sm: "space-between" },
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      pt: 2,
                      display: { xs: "none", sm: "flex" },
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 1,

                    }}
                  >
                    <FormControl sx={{ minWidth: 64 }}>
                      <Select
                        value={rowsPerPage.toString()}
                        size="small"
                        onChange={handleChangeRowsPerPage}
                        input={<CustomInput size="small" />}
                      >
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={20}>20</MenuItem>
                      </Select>
                    </FormControl>
                    <Typography variant="body2">{t("Số dòng")}</Typography>
                  </Box>
                  <Pagination
                    count={countPage(rows?.length, rowsPerPage)}
                    page={page}
                    onChange={handleChange}
                    variant="outlined"
                    renderItem={(item) => (
                      <PaginationItem
                        components={{
                          last: (props) => (
                            <ChevronRight {...props} stroke={1.5} />
                          ),
                          next: (props) => (
                            <ChevronRight {...props} stroke={1.5} />
                          ),
                          first: (props) => (
                            <ChevronLeft {...props} stroke={1.5} />
                          ),
                          previous: (props) => (
                            <ChevronLeft {...props} stroke={1.5} />
                          ),
                        }}
                        {...item}
                      />
                    )}
                    showFirstButton
                    showLastButton
                  />
                </Box>
              }
            </Box>
          </>
        }
      </ContainerTable>
      {/* Dialog */}
      <CustomizedDialogs
        title={getFieldNameById(updateId)!}
        open={isOpenUpdateDialog}
        handleOpen={setOpenUpdateDialog}
        body={<FormField handleOpen={setOpenUpdateDialog} id={updateId} />}
      />
      <CustomizedDialogs
        title={getFieldNameById(deleteId)!}
        open={isOpenDeleteDialog}
        handleOpen={setOpenDeleteDialog}
        body={<Typography variant="body2">Bạn có chắc chắn muốn xóa không ? </Typography>}
        actions={
          <>
            <Button variant="contained" onClick={() => handleDelete(deleteId)} sx={{ background: "red" }}>
              Xóa
            </Button>
            <Button variant="contained" onClick={() => setOpenDeleteDialog(false)} sx={{ background: "green" }}>
              Hủy
            </Button>
          </>
        }
      />
    </Stack>
  );
}
export default CustomFieldTable;
