import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import List from '@mui/material/List';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

let deliveriesClone = [];
function GuaranteeDelivery() {
    const [deliveries, setDeliveries] = useState([]);
    const [dateFrom, setDateFrom] = useState('2022-10-30');
    const [dateTo, setDateTo] = useState(moment(Date.now()).format('YYYY-MM-DD'));
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/delivery/to/${localStorage.getItem('idPage')}`);
                const newDeliveries = res.data.filter((delivery) => {
                    return delivery.status !== 'Giao hàng thành công';
                });
                setDeliveries(newDeliveries);
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, []);
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

        const deliveriesTmp = [];
        for (let i = 0; i < deliveriesClone.length; i++) {
            if (
                moment(getDate(deliveriesClone[i].createdAt)).isAfter(dateFromTmp) &&
                moment(dateToTmp).isAfter(getDate(deliveriesClone[i].createdAt))
            ) {
                console.log(deliveriesClone[i]);
                deliveriesTmp.push(deliveriesClone[i]);
            }
        }

        setDeliveries(deliveriesTmp);
    };
    const handleClickAccept = async (idGuaranteeOrder, idDelivery) => {
        try {
            const res = await axiosClient.put(`/delivery/updateStatus/${idDelivery}`, {
                status: 'Giao hàng thành công',
            });
            const resUpdateStatusGuarantee = await axiosClient.put(
                `/guarantee/updateStatusGuarantee/${idGuaranteeOrder}`,
                {
                    status: 'guarantee',
                },
            );
            if (res.data.update && resUpdateStatusGuarantee.data.update) {
                window.location.reload();
                alert(res.data.msg);
            }
        } catch (err) {
            console.log(err.message);
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
                <Box
                    sx={{
                        margin: '10px 10px',
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
                    <List
                        sx={{
                            Width: '100%',
                        }}
                    >
                        <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Mã bảo hành</TableCell>
                                        <TableCell align="center">Vận chuyển từ</TableCell>
                                        <TableCell align="center">Ngày giao hàng</TableCell>
                                        <TableCell align="center">Hành động</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {deliveries.map((delivery, index) => (
                                        <TableRow
                                            id={index}
                                            className="row"
                                            key={index}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{index + 1}</TableCell>
                                            <TableCell align="center">{delivery.idGuaranteeOrder}</TableCell>
                                            <TableCell align="center">{delivery.nameFrom}</TableCell>
                                            <TableCell align="center">{getDate(delivery.createdAt)}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    onClick={() =>
                                                        handleClickAccept(delivery.idGuaranteeOrder, delivery._id)
                                                    }
                                                    variant="contained"
                                                    color="primary"
                                                >
                                                    Đã nhận được hàng
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default GuaranteeDelivery;
