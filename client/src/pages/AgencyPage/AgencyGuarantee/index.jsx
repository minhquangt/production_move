import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
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

let guaranteeOrdersClone = [];

function AgencyGuarantee() {
    const [rows, setRows] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [listGuarantees, setListGuarantees] = useState([]);

    const [openModalCustomer, setOpenModalCustomer] = useState(false);
    const [idGuaranteeOrder, setIdGuaranteeOrder] = useState('');

    const [openModalGuarantee, setOpenModalGuarantee] = useState(false);
    const [idGuaranteeExport, setIdGuaranteeExport] = useState('');

    const [dateFrom, setDateFrom] = useState('2022-10-30');
    const [dateTo, setDateTo] = useState(moment(Date.now()).format('YYYY-MM-DD'));

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/agency/guaranteeOrder/${localStorage.getItem('idPage')}`);
                const resGuarantees = await axiosClient.get('/guarantee');
                if (resGuarantees) {
                    setListGuarantees(resGuarantees.data);
                    console.log(resGuarantees.data);
                }
                if (res) {
                    setRows(res.data.guaranteeOrders);
                    guaranteeOrdersClone = res.data.guaranteeOrders;
                    setListProducts(res.data.productGuarantees);
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

    const handleDeliveryGuarantee = async () => {
        let guarantee = listGuarantees.find((guarantee) => {
            return guarantee._id === idGuaranteeExport;
        });

        try {
            const res = await axiosClient.post('/delivery/createDeliveryByAgency', {
                from: localStorage.getItem('idPage'),
                nameFrom: localStorage.getItem('name'),
                to: idGuaranteeExport,
                nameTo: guarantee.name,
                idGuaranteeOrder: idGuaranteeOrder,
                status: '??ang giao h??ng',
            });
            if (res.data.create) {
                alert(res.data.msg);
                window.location.reload();
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleDeliveryCustomer = async () => {
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

    const handleFilterDeliveriesByDate = (dateTmp, type) => {
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

        const guaranteeOrdersCloneTmp = [];
        for (let i = 0; i < guaranteeOrdersClone.length; i++) {
            if (
                moment(getDate(guaranteeOrdersClone[i].createdAt)).isAfter(dateFromTmp) &&
                moment(dateToTmp).isAfter(getDate(guaranteeOrdersClone[i].createdAt))
            ) {
                guaranteeOrdersCloneTmp.push(guaranteeOrdersClone[i]);
            }
        }

        setRows(guaranteeOrdersCloneTmp);
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
                            onChange={(e) => handleFilterDeliveriesByDate(e.target.value, 'from')}
                        />
                    </div>
                    <div>
                        <Typography id="transition-modal-title" variant="h6" component="h2" align="center">
                            To
                        </Typography>
                        <input
                            type="date"
                            value={dateTo}
                            onChange={(e) => handleFilterDeliveriesByDate(e.target.value, 'to')}
                        />
                    </div>
                </div>
                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">M?? ????n h??ng</TableCell>
                                <TableCell align="center">T??n s???n ph???m</TableCell>
                                <TableCell align="center">L???i</TableCell>
                                <TableCell align="center">Th???i gian</TableCell>
                                <TableCell align="center">H??nh ?????ng</TableCell>
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
                                    <TableCell component="th" scope="row" sx={{ maxWidth: '200px' }}>
                                        {row.idOrder}
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: '200px' }}>{getNameProduct(row.idOrder)}</TableCell>
                                    <TableCell align="center">{row.error}</TableCell>
                                    <TableCell align="center">{getDate(row.createdAt)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            onClick={() => {
                                                setIdGuaranteeOrder(row._id);
                                                setOpenModalCustomer(true);
                                            }}
                                            variant="contained"
                                            color="success"
                                            sx={{ mr: 2 }}
                                        >
                                            Giao h??ng
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIdGuaranteeOrder(row._id);
                                                setOpenModalGuarantee(true);
                                            }}
                                            variant="contained"
                                            color="primary"
                                        >
                                            Trung t??m b???o h??nh
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal delivery customer */}
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
                            Chuy???n h??ng cho kh??ch h??ng
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
                            <Button
                                sx={{ marginTop: '10px' }}
                                color="error"
                                variant="contained"
                                type="submit"
                                onClick={() => setOpenModalCustomer(false)}
                            >
                                H???y b???
                            </Button>
                            <Button
                                sx={{ marginTop: '10px', marginLeft: '10px' }}
                                color="success"
                                variant="contained"
                                type="submit"
                                onClick={handleDeliveryCustomer}
                            >
                                X??c nh???n
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
            {/* Modal delivery guarantee */}
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
                            Chuy???n h??ng t???i trung t??m b???o h??nh
                        </Typography>
                        <FormControl fullWidth sx={{ margin: '15px 0' }}>
                            <InputLabel id="demo-simple-select-label">Trung t??m b???o h??nh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idGuaranteeExport}
                                label="Trung t??m b???o h??nh"
                                onChange={(e) => {
                                    console.log(e.target.value);
                                    setIdGuaranteeExport(e.target.value);
                                }}
                            >
                                {listGuarantees.map((guarantee) => {
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
                                color="success"
                                type="submit"
                                onClick={handleDeliveryGuarantee}
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

export default AgencyGuarantee;
