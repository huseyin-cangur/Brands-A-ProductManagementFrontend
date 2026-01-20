import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { productService } from "../../services/productService";
import { deleteProduct, setProduct } from "./ProductSlice";
import { useEffect, useState } from "react";
import { ProductModal } from "./productModal";

import { toast } from "react-toastify";


export default function Products() {

    type ModalMode = "create" | "edit";


    const [modalState, setModalState] = useState<{
        open: boolean;
        mode: ModalMode;
        productId: string | null

    }>({
        open: false,
        mode: "create",
        productId: null
    });




    const dispatch = useAppDispatch();



    const {
        products,
        pageIndex,
        pageSize,
        totalCount
    } = useAppSelector((state) => state.products);

    useEffect(() => {



        productService.getAll(pageIndex, pageSize)
            .then(res => dispatch(setProduct(res)));
    }, [pageIndex, pageSize]);


    function removeProduct(id: string) {
        productService.deleteProduct(id).then(res => {
            if (res.success) {
                toast.success(res.message)
                dispatch(deleteProduct(res.data.id))
            }
        }

        )
    }


    const openCreateModal = () => {
        setModalState({
            open: true,
            mode: "create",
            productId: null
        });
    };

    const openEditModal = (id: string) => {


        setModalState({
            open: true,
            mode: "edit",
            productId: id

        });
    };



    return (
        <>
            <Container sx={{ mt: 5 }}>
                <Box
                    sx={{
                        mb: 3,
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Typography variant="h5" fontWeight="bold">
                        Ürünler
                    </Typography>

                    <Button sx={{ ml: "auto" }}
                        variant="contained" size="small" color="primary" onClick={() => openCreateModal()}>

                        Ürün Ekle</Button>
                </Box>



                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="right">Ürün Adı</TableCell>
                                <TableCell align="right">Ürün Açıklaması</TableCell>
                                <TableCell align="right">İşlemler</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="right">{row.name}</TableCell>
                                    <TableCell align="right">{row.description}</TableCell>
                                    <TableCell align="right">{
                                        <Box>
                                            <IconButton onClick={() => removeProduct(row.id ?? "")} color="error">
                                                <Delete />
                                            </IconButton>
                                            <IconButton onClick={() => openEditModal(row.id ?? "")}>
                                                <Edit />
                                            </IconButton>
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
                        productService.getAll(newPage, pageSize)
                            .then(res => dispatch(setProduct(res)));
                    }}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => {
                        const newSize = parseInt(e.target.value, 10);
                        productService.getAll(0, newSize)
                            .then(res => dispatch(setProduct(res)));
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Container>

            <ProductModal
                open={modalState.open}
                mode={modalState.mode}
                productId={modalState.productId}
                onClose={() =>
                    setModalState(prev => ({ ...prev, open: false }))
                }
            />

        </>
    )

}