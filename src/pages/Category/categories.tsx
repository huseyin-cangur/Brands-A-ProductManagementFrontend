
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { categoryService } from "../../services/categorService";
import { setCategory, deleteCategory } from "./CategorySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CategoryModal } from "./categoryModal";
import { Delete, Edit } from "@mui/icons-material";
import { toast } from "react-toastify";



export default function Categories() {

    type ModalMode = "create" | "edit";


    const [modalState, setModalState] = useState<{
        open: boolean;
        mode: ModalMode;
        categoryId: string | null

    }>({
        open: false,
        mode: "create",
        categoryId: null
    });






    const dispatch = useAppDispatch();


    const {
        categories,
        pageIndex,
        pageSize,
        totalCount
    } = useAppSelector((state) => state.categories);

    useEffect(() => {



        categoryService.getAll(pageIndex, pageSize)
            .then(res => dispatch(setCategory(res)));
    }, [pageIndex, pageSize]);




    function removeCategory(id: string) {
        categoryService.deleteCategory(id).then(res => {
            if (res.success) {
                toast.success(res.message)

                dispatch(deleteCategory(res.data.id))
            }
        }

        )
    }


    const openCreateModal = () => {
        setModalState({
            open: true,
            mode: "create",
            categoryId: null
        });
    };

    const openEditModal = (id: string) => {


        setModalState({
            open: true,
            mode: "edit",
            categoryId: id

        });
    };
    return <>
        <Container sx={{ mt: 5 }}>
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Kategoriler
                </Typography>

                <Button sx={{ ml: "auto" }}
                    variant="contained" size="small" color="primary" onClick={() => openCreateModal()}>

                    Kategori Ekle</Button>
            </Box>



            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>

                            <TableCell>Kategori Adı</TableCell>
                            <TableCell>Kategori Açıklaması</TableCell>
                            <TableCell>İşlemler</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >

                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{
                                    <Box>
                                        <IconButton onClick={() => removeCategory(row.id ?? "")} color="error">
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
                    <TablePagination
                        component="div"
                        count={totalCount}
                        page={pageIndex}
                        onPageChange={(_, newPage) => {
                            categoryService.getAll(newPage, pageSize)
                                .then(res => dispatch(setCategory(res)));
                        }}
                        rowsPerPage={pageSize}
                        onRowsPerPageChange={(e) => {
                            const newSize = parseInt(e.target.value, 10);
                            categoryService.getAll(0, newSize)
                                .then(res => dispatch(setCategory(res)));
                        }}
                        rowsPerPageOptions={[5, 10, 25]}
                    />
                </Table>
            </TableContainer>
        </Container>

        <CategoryModal
            open={modalState.open}
            mode={modalState.mode}
            categoryId={modalState.categoryId}
            onClose={() =>
                setModalState(prev => ({ ...prev, open: false }))
            }
        />



    </>
}