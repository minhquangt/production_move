import { Box, Button, TextField, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
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

function FactoryImport() {
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const [idProduct, setIdProduct] = useState('');
    const [amountImport, setAmountImport] = useState(0);

    const getAmount = (id) => {
        var result = storage.find((item) => {
            return item.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/factory/${localStorage.getItem('idPage')}`);
                setRows(res.data.products);
                setStorage(res.data.factory.storage);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    const handleClickImport = async () => {
        const rest = storage.filter((item) => {
            return item.id !== idProduct;
        });
        var amount = Number(amountImport) + getAmount(idProduct);

        try {
            const res = await axiosClient.post('/factory/updateAmount', {
                id: localStorage.getItem('idPage'),
                storage: [{ id: idProduct, amount: amount }, ...rest],
            });
            if (res.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log('Register failed: ' + err.message);
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
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">M?? S???n Ph???m</TableCell>
                                <TableCell align="center">T??n s???n ph???m</TableCell>
                                <TableCell align="center">S??? l?????ng</TableCell>
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows?.map((row, index) => (
                                <TableRow
                                    id={row._id}
                                    className="row"
                                    key={row._id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{index + 1}</TableCell>
                                    <TableCell align="center" align="center">
                                        {row.code}
                                    </TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{getAmount(row._id)}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                setOpenModal(true);
                                                setIdProduct(row._id);
                                            }}
                                        >
                                            Nh???p h??ng
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* Modal import amount product */}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal}
                onClose={() => setOpenModal(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <Box sx={styleModal}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Nh???p s??? l?????ng s???n ph???m
                        </Typography>
                        <TextField
                            sx={{ margin: '15px 0' }}
                            label="S??? l?????ng"
                            variant="standard"
                            fullWidth
                            type="number"
                            value={amountImport}
                            onChange={(e) => setAmountImport(e.target.value)}
                        />
                        <Button
                            sx={{ marginTop: '10px' }}
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={handleClickImport}
                        >
                            Nh???p h??ng
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}

export default FactoryImport;
