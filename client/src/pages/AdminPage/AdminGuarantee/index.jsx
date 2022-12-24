import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import guaranteeLogo from '~/assets/image/guaranteelogo.jpg';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

function AdminGuarantee() {
    const navigate = useNavigate();
    const [guarantee, setGuarantee] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get('/guarantee');
                setGuarantee(res.data);
                // console.log(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        getData();
    }, []);

    return (
        <>
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
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        {guarantee.map((guarantee) => {
                            return (
                                <>
                                    <Card
                                        key={guarantee._id}
                                        sx={{ maxWidth: 345, margin: '0 20px' }}
                                        onClick={() => {
                                            navigate(`/admin/guarantee/${guarantee._id}`);
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia component="img" height="250" image={guaranteeLogo} alt="Image" />
                                            <CardContent>
                                                <Typography
                                                    sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                    gutterBottom
                                                    variant="h4"
                                                    component="div"
                                                >
                                                    {guarantee.name}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </>
                            );
                        })}
                    </Box>
                </Box>
            </>
        </>
    );
}

export default AdminGuarantee;
