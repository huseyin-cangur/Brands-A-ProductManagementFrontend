
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useForm, Controller } from "react-hook-form";
import { Autocomplete, TextField } from '@mui/material';
import { categoryService } from '../../services/categorService';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { productService } from '../../services/productService';
import { addProduct, updateProduct } from './ProductSlice';
import { setCategory } from '../Category/CategorySlice';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type MyModalProps = {
    open: boolean;
    mode: "create" | "edit";
    onClose: () => void;
    productId: string | null;
};

type FormValues = {
    id?: string
    name: string;
    description: string;
    categoryId: string,
    categoryName?: string
};


export const ProductModal: React.FC<MyModalProps> = ({ open, mode, productId, onClose }) => {



    const dispatch = useAppDispatch();
    const isEdit = mode === "edit";

    useEffect(() => {

        categoryService.getAll().then(
            res => dispatch(setCategory(res))
        )

    }, [])


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const { products } = useAppSelector((state) => state.products)

    const { categories } = useAppSelector((state) => state.categories)


    React.useEffect(() => {

        if (!open) return;
        if (mode === "create") {
            reset({
                id: "",
                name: "",
                description: "",
                categoryId: ""
            });
        }

        if (mode === "edit" && productId) {



            const product = products.find(c => c.id == productId)

            console.log(product)
            reset({
                id: product?.id,
                name: product?.name,
                description: product?.description,
                categoryId: product?.categoryId
            });


        }

    }, [open, mode, productId, reset])


    const onSubmit = (data: FormValues) => {



        const request = isEdit
            ? productService.updateProduct(data)
            : productService.addProduct(data);

        request.then((res) => {
            if (res.success) {
           
                toast.success(res.message);
                dispatch(isEdit ? updateProduct(res.data) : addProduct(res.data));
                closeModal();
            }
        });
    };




    const closeModal = () => {
        onClose();
    };


    const handleClose = () => {
        reset();
        closeModal()
    }

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Ürün Ekle
                    </Typography>

                    <Box
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                        }}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: "Ürün adı zorunludur",
                                    minLength: {
                                        value: 3,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField

                                        {...field}
                                        fullWidth
                                        label="Ürün Adı"
                                        error={!!errors.name}
                                        helperText={errors.name?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="description"
                                control={control}
                                rules={{

                                    minLength: {
                                        value: 3,
                                        message: "En az 2 karakter olmalıdır",
                                    },
                                }}
                                render={({ field }) => (
                                    <TextField
                                        multiline
                                        minRows={3}
                                        {...field}
                                        fullWidth
                                        label="Ürün Açıklaması"
                                        error={!!errors.description}
                                        helperText={errors.description?.message}
                                    />
                                )}
                            />
                            <Controller
                                name="categoryId"
                                control={control}
                                rules={{
                                    required: "Kategori seçimi zorunludur",
                                }}
                                render={({ field }) => {
                                    const selectedCategory =
                                        categories.find((c) => c.id === field.value) || null;

                                    return (
                                        <Autocomplete
                                            options={categories}
                                            value={selectedCategory}
                                            getOptionLabel={(option) => option.name}
                                            isOptionEqualToValue={(option, value) =>
                                                option.id === value.id
                                            }
                                            onChange={(_, value) =>
                                                field.onChange(value?.id || "")
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Kategori"
                                                    error={!!errors.categoryId}
                                                    helperText={errors.categoryId?.message}
                                                />
                                            )}
                                        />
                                    );
                                }}
                            />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 2,
                            mt: 4,
                        }}>
                            <Button variant="outlined" onClick={handleClose}>
                                Kapat
                            </Button>

                            <Button onClick={handleSubmit(onSubmit)} variant="contained">
                                Kaydet
                            </Button>
                        </Box>


                    </Box>
                </Box>

            </Modal>
        </div>
    )

}