
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { categoryService } from "../../services/categorService";
import { setCategory, deleteCategory } from "./CategorySlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { CategoryModal } from "./categoryModal";
import { Delete, Edit } from "@mui/icons-material";



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
    const { categories } = useAppSelector((state) => state.categories)
   



    useEffect(() => {

        categoryService.getAll().then(
            res => dispatch(setCategory(res.items))
        )

    }, [])


    function removeCategory(id: string) {
        categoryService.deleteCategory(id).then(res => {
            if (res.success) {

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

        setCategory(id)
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
                            <TableCell>Id</TableCell>
                            <TableCell align="right">Kategori Adı</TableCell>
                            <TableCell align="right">Kategori Açıklaması</TableCell>
                            <TableCell align="right">İşlemler</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="right">{row.name}</TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{
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