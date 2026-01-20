

import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { userService } from "../../services/userService";
import { deleteUser, setUser } from "./UserSlice";
import { UserModal } from "./UserModal";


export default function Users() {

    type ModalMode = "create" | "edit";


    const [modalState, setModalState] = useState<{
        open: boolean;
        mode: ModalMode;
        userId: string | null

    }>({
        open: false,
        mode: "create",
        userId: null
    });




    const dispatch = useAppDispatch();



    const {
        users,
        pageIndex,
        pageSize,
        totalCount
    } = useAppSelector((state) => state.users);

    useEffect(() => {



        userService.getAll(pageIndex, pageSize)
            .then(res => dispatch(setUser(res)));
    }, [pageIndex, pageSize]);


    function removeUser(id: string) {
        userService.deleteUser(id).then(res => {
            if (res.success) {
                toast.success(res.message)
                dispatch(deleteUser(res.data.id))
            }
        }

        )
    }


    const openCreateModal = () => {
        setModalState({
            open: true,
            mode: "create",
            userId: null
        });
    };

    const openEditModal = (id: string) => {


        setModalState({
            open: true,
            mode: "edit",
            userId: id

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
                        Kullanıcılar
                    </Typography>

                    <Button sx={{ ml: "auto" }}
                        variant="contained" size="small" color="primary" onClick={() => openCreateModal()}>

                        Kullanıcı Ekle</Button>
                </Box>



                <TableContainer component={Paper} >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>

                                <TableCell align="right">Adı</TableCell>
                                <TableCell align="right">Soyadı</TableCell>
                                <TableCell align="right">Mail</TableCell>
                                <TableCell align="right">İşlemler</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >

                                    <TableCell align="right">{row.firstName}</TableCell>
                                    <TableCell align="right">{row.lastName}</TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{
                                        <Box>
                                            <IconButton onClick={() => removeUser(row.id ?? "")} color="error">
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
                        userService.getAll(newPage, pageSize)
                            .then(res => dispatch(setUser(res)));
                    }}
                    rowsPerPage={pageSize}
                    onRowsPerPageChange={(e) => {
                        const newSize = parseInt(e.target.value, 10);
                        userService.getAll(0, newSize)
                            .then(res => dispatch(setUser(res)));
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </Container>

            <UserModal
                open={modalState.open}
                mode={modalState.mode}
                userId={modalState.userId}
                onClose={() =>
                    setModalState(prev => ({ ...prev, open: false }))
                }
            />

        </>
    )

}