import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { useEffect, useState } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import axiosClient from '~/api/axiosClient';
import moment from 'moment';

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

let ordersClone = [];

function AgencySold() {
    const [rows, setRows] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [nameAgency, setNameAgency] = useState('');
    const [nameCustomer, setNameCustomer] = useState('');
    const [sdt, setSdt] = useState('');
    const [address, setAddress] = useState('');
    const [codeProduct, setCodeProduct] = useState('');
    const [price, setPrice] = useState(0);

    const [openModalGuarantee, setOpenModalGuarantee] = useState(false);
    const [idOrder, setIdOrder] = useState('');
    const [error, setError] = useState('');

    const [dateFrom, setDateFrom] = useState('2022-10-30');
    const [dateTo, setDateTo] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/agency/order/${localStorage.getItem('idPage')}`);
                setRows(res.data.orders);
                setNameAgency(res.data.nameAgency);
                setListProducts(res.data.products);
                ordersClone = res.data.orders;
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const PriceVND = (price) => {
        const priceVND = Intl.NumberFormat('en-US').format;
        return priceVND(price);
    };

    const getDate = (data) => {
        let date = new Date(data);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + dt;
    };

    const handleFilterOrdersByDate = (dateTmp, type) => {
        let dateFromTmp;
        let dateToTmp;
        if (type === 'from') {
            setDateFrom(dateTmp);
            dateFromTmp = moment(dateTmp).format('YYYY-MM-DD');
            dateToTmp = dateTo;
        } else {
            setDateTo(dateTmp);
            dateToTmp = moment(dateTmp).format('YYYY-MM-DD');
            dateFromTmp = dateFrom;
        }

        const ordersTmp = [];
        for (let i = 0; i < ordersClone.length; i++) {
            if (
                moment(getDate(ordersClone[i].createdAt)).isAfter(dateFromTmp) &&
                moment(dateToTmp).isAfter(getDate(ordersClone[i].createdAt))
            ) {
                ordersTmp.push(ordersClone[i]);
            }
        }

        setRows(ordersTmp);
    };

    const compareDate = (data) => {
        let date = new Date(data);
        let today = new Date();
        let ms1 = date.getTime();
        let ms2 = today.getTime();
        return Math.ceil((ms2 - ms1) / (24 * 60 * 60 * 1000));
    };

    const handleCreateOrder = async () => {
        try {
            const res = await axiosClient.post('/agency/createOder', {
                idAgency: localStorage.getItem('idPage'),
                nameAgency: nameAgency,
                nameCustomer: nameCustomer,
                sdt: sdt,
                address: address,
                price: Number(price),
                idProduct: codeProduct,
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };
    const handleGuaranteeOrder = async () => {
        try {
            const res = await axiosClient.post('/agency/createGuaranteeOrder', {
                idOrder: idOrder,
                error: error,
                idAgency: localStorage.getItem('idPage'),
                status: 'agency',
            });
            if (res.data.create) {
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
                    backgroundcolor: '#fff',

                    overflowY: 'scroll',
                }}
            >
                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Button
                        sx={{ marginLeft: '10px' }}
                        onClick={() => setOpenModalCreate(true)}
                        variant="contained"
                        color="primary"
                    >
                        T???o h??a ????n
                    </Button>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                        Filter by date
                    </Typography>
                    <div style={{ display: 'flex' }}>
                        <div style={{ marginRight: '10px' }}>
                            <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                                From
                            </Typography>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => handleFilterOrdersByDate(e.target.value, 'from')}
                            />
                        </div>
                        <div>
                            <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                                To
                            </Typography>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => handleFilterOrdersByDate(e.target.value, 'to')}
                            />
                        </div>
                    </div>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">T??n s???n ph???m</TableCell>
                                <TableCell align="center">ID kh??ch h??ng</TableCell>
                                <TableCell align="center">Gi??</TableCell>
                                <TableCell align="center">Th???i gian</TableCell>
                                <TableCell align="center">B???o h??nh</TableCell>
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
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center">{row.nameProduct}</TableCell>
                                    <TableCell align="center">{row.idCustomer}</TableCell>
                                    <TableCell align="center">{PriceVND(row.price)}</TableCell>
                                    <TableCell align="center">{getDate(row.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        {compareDate(row.createdAt) > 365 ? (
                                            <Button onClick={() => {}} variant="outlined" disabled color="secondary">
                                                H???t b???o h??nh
                                            </Button>
                                        ) : (
                                            <>
                                                {row.status === 'not guarantee' ? (
                                                    <Button
                                                        onClick={() => {
                                                            setIdOrder(row._id);
                                                            setOpenModalGuarantee(true);
                                                        }}
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        B???o h??nh
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => {}} disabled variant="contained">
                                                        ??ang b???o h??nh
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal create order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalCreate}
                onClose={() => setOpenModalCreate(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalCreate}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            T???o h??a ????n
                        </Typography>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="T??n ?????i l??"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameAgency}
                            disabled={true}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="T??n kh??ch h??ng"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={nameCustomer}
                            onChange={(e) => setNameCustomer(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="S??? ??i???n tho???i"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                        />
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="?????a ch???"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormControl fullWidth sx={{ margin: '10px 0' }}>
                            <InputLabel id="demo-simple-select-label">M?? S???n ph???m</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={codeProduct}
                                label="M?? s???n ph???m"
                                onChange={(e) => {
                                    setCodeProduct(e.target.value);
                                    const pdt = listProducts.find((p) => p._id === e.target.value);
                                    setPrice(pdt.price);
                                }}
                            >
                                {listProducts.map((product) => {
                                    return (
                                        <MenuItem key={product._id} value={product._id}>
                                            {product.code}
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{ margin: '10px 0' }}
                            label="Gi?? s???n ph???m"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={price}
                            disabled={true}
                        />

                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleCreateOrder}
                        >
                            X??c nh???n
                        </Button>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal guarantee order */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalGuarantee}
                onClose={() => setOpenModalGuarantee(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModalGuarantee}>
                    <Box sx={styleModal}>
                        <Typography
                            id="transition-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ textAlign: 'center' }}
                        >
                            Chuy???n v??o danh s??ch b???o h??nh
                        </Typography>

                        <TextField
                            sx={{ marginTop: '15px' }}
                            label="L???i s???n ph???m"
                            variant="standard"
                            fullWidth
                            type="text"
                            value={error}
                            onChange={(e) => setError(e.target.value)}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="error"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalGuarantee(false)}
                            >
                                H???y b???
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                variant="contained"
                                type="submit"
                                onClick={handleGuaranteeOrder}
                            >
                                X??c nh???n
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default AgencySold;
