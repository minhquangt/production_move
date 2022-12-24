import { Box, Typography } from '@mui/material';
import axiosClient from '~/api/axiosClient';
import { useEffect, useState } from 'react';

function Guarantee() {
    const [guarantee, setGuarantee] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/guarantee/${localStorage.getItem('idPage')}`);
                console.log(res.data);
                setGuarantee(res.data);
            } catch (e) {
                console.error(e);
            }
        };
        getData();
    }, []);

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
                {guarantee ? (
                    <Box sx={{ margin: '20px 10px' }}>
                        <Typography sx={{ color: '#666', marginTop: '10px' }} variant="h4">
                            Name: {guarantee.name}
                        </Typography>
                        <Typography sx={{ color: '#666', marginTop: '10px' }} variant="h4">
                            Address: {guarantee.address}
                        </Typography>
                        <Typography sx={{ color: '#666', marginTop: '10px' }} variant="h4">
                            Hoạt động: Thứ 2 - Thứ 7 (7h -22h){' '}
                        </Typography>
                    </Box>
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default Guarantee;
