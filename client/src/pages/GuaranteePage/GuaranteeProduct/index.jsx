import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import axiosClient from '~/api/axiosClient';

const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: '10px',
    p: 3,
};

function GuaranteeProduct() {
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const [listProducts, setListProducts] = useState([]);
    const [listFactories, setListFactories] = useState([]);

    const [openModalCustomer, setOpenModalCustomer] = useState(false);
    const [idGuaranteeOrder, setIdGuaranteeOrder] = useState('');

    const [openModalFactory, setOpenModalFactory] = useState(false);
    const [idFactoryExport, setIdFactoryExport] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/guarantee/guaranteeOrder/${localStorage.getItem('idPage')}`);
                const resFactories = await axiosClient.get('/factory');
                if (resFactories) {
                    setListFactories(resFactories.data);
                    console.log(resFactories.data);
                }
                if (res) {
                    // console.log(res.data);
                    setRows(res.data.guaranteeOrders);
                    setListProducts(res.data.productGuarantees);
                    // console.log(res.data.productGuarantees);
                }
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const getNameProduct = (id) => {
        let product = listProducts.find((product) => {
            return product._id === id;
        });
        return product.nameProduct;
    };

    // const getDate = (data) => {
    //     let date = new Date(data);
    //     let year = date.getFullYear();
    //     let month = date.getMonth() + 1;
    //     let dt = date.getDate();

    //     if (dt < 10) {
    //         dt = '0' + dt;
    //     }
    //     if (month < 10) {
    //         month = '0' + month;
    //     }

    //     return dt + '/' + month + '/' + year;
    // };

    const handleDeliveryFactory = async () => {
        console.log(idFactoryExport);
        console.log(idGuaranteeOrder);

        try {
            const resUpdateStatusGuarantee = await axiosClient.put(
                `/guarantee/updateStatusGuarantee/${idGuaranteeOrder}`,
                {
                    idFactory: idFactoryExport,
                    status: 'factory',
                },
            );
            if (resUpdateStatusGuarantee.data.update) {
                window.location.reload();
                alert('Update');
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeliveryAgency = async () => {
        // console.log(idOrder);
        try {
            const res = await axiosClient.put(`/agency/updateNotGuaranteeOrder/${idGuaranteeOrder}`);
            if (res.data.update) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    width: 'calc(100% - var(--default-layout-width-sidebar))',
                    height: 'calc(100vh - var(--default-layout-height-header))',
                    float: 'right',
                    overflowY: 'scroll',
                }}
            >
                <Button onClick={() => navigate('/guarantee')} variant="outlined" sx={{ margin: '10px' }}>
                    <KeyboardArrowLeftOutlinedIcon />
                    Quay lại
                </Button>

                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell>STT</TableCell>
                                <TableCell>Mã đơn hàng</TableCell>
                                <TableCell>Tên sản phẩm</TableCell>
                                <TableCell>Lỗi</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                        {row.idOrder}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '200px' }}>{getNameProduct(row.idOrder)}</TableCell>
                                    <TableCell>{row.error}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                setIdGuaranteeOrder(row._id);
                                                setOpenModalCustomer(true);
                                            }}
                                            variant="outlined"
                                            color="secondary"
                                        >
                                            Chuyển đại lý
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => {
                                                setIdGuaranteeOrder(row._id);
                                                setOpenModalFactory(true);
                                            }}
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Chuyển kho sản xuất
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal delivery agency */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCustomer}
                onClose={() => setOpenModalCustomer(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCustomer}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển hàng về đại lý
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalCustomer(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryAgency}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal delivery factory */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalFactory}
                onClose={() => setOpenModalFactory(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalFactory}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuyển hàng tới kho sản xuất
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Kho sản xuất</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idFactoryExport}
                                label="Kho sản xuất"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdFactoryExport(e.target.value);
                                }}
                            >
                                {listFactories.map((guarantee) => {
                                    return (
                                        <MenuItem key={guarantee._id} value={guarantee._id}>
                                            {guarantee.name}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="secondary"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalFactory(false)}
                            >
                                Hủy bỏ
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryFactory}
                            >
                                Xác nhận
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default GuaranteeProduct;
