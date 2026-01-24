import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { orderService } from "../../services/orderService";
import { setOrders } from "./OrderSlice";
import { Box, Chip, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { OrderStatusTR } from "../../model/OrderStatusTR";
import { OrderStatusColor } from "../../model/OrderStatusColor";
 




export default function Order() {

  const dispatch = useAppDispatch();


  const {
    orders,
    pageIndex,
    pageSize,
    totalCount
  } = useAppSelector((state) => state.orders);


  useEffect(() => {

    orderService.getAll(pageIndex, pageSize)
      .then(res => dispatch(setOrders(res)));
  }, [pageIndex, pageSize]);





  return (
    <Container sx={{ mt: 5 }}>
      <Box
        sx={{
          mb: 3,
          display: "flex",
          alignItems: "center"
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Siparişler
        </Typography>


      </Box>



      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>

              <TableCell>Sipariş Numarası</TableCell>
              <TableCell>Müşteri Adı</TableCell>
              <TableCell>Toplam Fiyat</TableCell>
              <TableCell>Sipariş Durumu</TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >

                <TableCell>{row.orderNumber}</TableCell>
                <TableCell>{row.userFullName}</TableCell>
                <TableCell>{row.totalPrice}</TableCell>
                <TableCell><Chip
                  label={OrderStatusTR[row.status]}
                  color={OrderStatusColor[row.status]}
                /></TableCell>
                <TableCell>{
                  <Box>

                    {/* <IconButton onClick={() => openEditModal(row.Id ?? "")}>
                      <Edit/>
                    </IconButton> */}
                  </Box>


                }</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalCount}
        page={pageIndex}
        onPageChange={(_, newPage) => {
          orderService.getAll(newPage, pageSize)
            .then(res => dispatch(setOrders(res)));
        }}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(e) => {
          const newSize = parseInt(e.target.value, 10);
          orderService.getAll(0, newSize)
            .then(res => dispatch(setOrders(res)));
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Container>
  )
}