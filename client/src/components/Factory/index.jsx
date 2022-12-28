import { Box, Typography } from '@mui/material';
import axiosClient from '~/api/axiosClient';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import factoryImage from '~/assets/image/factorylogo.jpg';

function Factory() {
    const [factory, setFactory] = useState();

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get(`/factory/${localStorage.getItem('idPage')}`);
                setFactory(res.data.factory);
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
                    backgroundcolor: '#fff',

                    overflowY: 'scroll',
                }}
            >
                {factory ? (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                            <Card sx={{ maxWidth: 750, margin: '0 20px' }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="300"
                                        image={factoryImage}
                                        alt="Image"
                                        backgroundColor="black"
                                    />
                                    <CardContent>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {factory.name}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            {factory.address}
                                        </Typography>
                                        <Typography
                                            sx={{ marginTop: '10px', textAlign: 'center', fontSize: '1.4rem' }}
                                            gutterBottom
                                            variant="h7"
                                            component="div"
                                        >
                                            Hoạt động: Thứ 2 - Thứ 7 (7h -22h)
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Box>
                    </>
                ) : (
                    <></>
                )}
            </Box>
        </>
    );
}

export default Factory;
