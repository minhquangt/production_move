import * as React from 'react';
import SendIcon from '@mui/icons-material/Send';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import axiosClient from '~/api/axiosClient';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const res = await axiosClient.post('/user/login', { username, password });
            if (res.data.login) {
                setUsername('');
                setPassword('');
                console.log(res.data);
                localStorage.setItem('role', res.data.role);
                localStorage.setItem('id', res.data.id);
                localStorage.setItem('name', res.data.username);
                localStorage.setItem('email', res.data.email);
                localStorage.setItem('idPage', res.data.idPage);
                navigate(`/${res.data.role}`);
                window.location.reload();
            } else {
                setError(res.data.msg);
                setPassword('');
            }
        } catch (err) {
            console.log('Login fe failed: ' + err.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                {/* Login */}
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                    sx={{ height: '100vh', margin: 'auto' }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h2" mb={2}>
                            BigCorp
                        </Typography>
                        <Avatar sx={{ m: 1, bgcolor: 'success.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng nhập
                        </Typography>
                        <ValidatorForm noValidate style={{ width: '100%' }} onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                validators={['required', 'isEmail']}
                                errorMessages={['Vui lòng nhập email', 'Email không hợp lệ']}
                                onFocus={() => setError('')}
                            />
                            <TextValidator
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                validators={['required']}
                                errorMessages={['Vui lòng nhập mật khẩu']}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={() => setError('')}
                            />
                            <Typography
                                component="h1"
                                variant="h5"
                                sx={{ color: '#d32f2f', fontSize: 13, marginLeft: '13px' }}
                                mb={2}
                            >
                                {error}
                            </Typography>
                            <Button
                                color="success"
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, fontSize: 16 }}
                                onClick={() => setError('')}
                            >
                                Đăng nhập
                            </Button>
                        </ValidatorForm>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
