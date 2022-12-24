import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import agencyLogo from '~/assets/image/agencylogo.jpg';
import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

function AdminAgency() {
    const navigate = useNavigate();
    const [agencies, setAgencies] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axiosClient.get('/agency');
                setAgencies(res.data);
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
                        {agencies.map((agency) => {
                            return (
                                <>
                                    <Card
                                        key={agency._id}
                                        sx={{ maxWidth: 345, margin: '0 20px' }}
                                        onClick={() => {
                                            navigate(`/admin/agency/${agency._id}`);
                                        }}
                                    >
                                        <CardActionArea>
                                            <CardMedia component="img" height="250" image={agencyLogo} alt="Image" />
                                            <CardContent>
                                                <Typography
                                                    sx={{ textAlign: 'center', fontSize: '1.2rem' }}
                                                    gutterBottom
                                                    variant="h4"
                                                    component="div"
                                                >
                                                    {agency.name}
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

export default AdminAgency;
