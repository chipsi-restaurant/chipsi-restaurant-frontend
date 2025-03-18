import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Paper, Link } from '@mui/material';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <Paper elevation={3} sx={{ padding: 6, backgroundColor: '#fff', textAlign: 'center', borderRadius: 2, width: '500px' }}>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                    Регистрация
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}>
                    <TextField label="Имя" name="firstName" value={formData.firstName} onChange={handleChange} fullWidth required sx={{ width: '100%' }} />
                    <TextField label="Фамилия" name="lastName" value={formData.lastName} onChange={handleChange} fullWidth required sx={{ width: '100%' }} />
                    <TextField label="Телефон" name="phone" value={formData.phone} onChange={handleChange} fullWidth required sx={{ width: '100%' }} />
                    <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth required sx={{ width: '100%' }} />
                    <TextField label="Пароль" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required sx={{ width: '100%' }} />
                    <Button type="submit" variant="contained" sx={{ backgroundColor: '#000', color: '#fff', mt: 2, padding: '12px', fontSize: '16px' }} fullWidth>
                        Зарегистрироваться
                    </Button>
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Уже есть аккаунт? <Link href="/login" underline="hover" sx={{ fontWeight: 'bold', color: '#000' }}>Войти</Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Signup;