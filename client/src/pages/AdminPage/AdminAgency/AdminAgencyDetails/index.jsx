import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function AgencyDetails() {
    const { id } = useParams();
    const [rows, setRows] = useState([]);
    const [storage, setStorage] = useState([]);

    const getAmount = (id) => {
        var result = storage.find((item) => {
            return item.id === id;
        });
        return result.amount;
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/agency/${id}`);
                setRows(res.data.products);
                setStorage(res.data.agency.storage);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, [id]);

    return (
        <>
            <Box
                id="style-2"
                sx={{
                    backgroundColor: '#fff',
                    overflowY: 'scroll',
                }}
            >
                <TableContainer sx={{ marginTop: '10px' }} component={Paper}>
                    <Table sx={{ minWidth: 650 }} size="medium" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">STT</TableCell>
                                <TableCell align="center">Mã Sản Phẩm</TableCell>
                                <TableCell align="center">Tên sản phẩm</TableCell>
                                <TableCell align="center">Số lượng</TableCell>
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
                                    <TableCell align="center">{row.code}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{getAmount(row._id)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default AgencyDetails;
