import {
    Drawer, List, ListItemIcon, ListItemText,
    Toolbar, Box, ListItemButton,
    useMediaQuery, useTheme, ListSubheader,
    Avatar, Typography, Stack
} from "@mui/material";
import { obtenerNombre, obtenerIniciales } from "./js/usuario";
import HomeIcon from "@mui/icons-material/Home";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import LogoutIcon from '@mui/icons-material/Logout';
import CalculateIcon from '@mui/icons-material/Calculate';
import { dataContext } from "../Context/MetricsContext";
import { useEffect, useContext } from "react";

const SideBar = () => {
    const { top, setTop } = useContext(dataContext);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { openDrawer, setOpenDrawer } = useContext(dataContext);
    const correo = localStorage.getItem("correo");
    const { setOptions, menuOptions } = useContext(dataContext);

    const handleLogout = () => {
        const formData = new FormData();
        formData.append('mail', correo);
        formData.append('token', localStorage.getItem('barer'));
        fetch(`${import.meta.env.VITE_URL_ENVIRONMENT}/Session/Jwt/Logout`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (!response.ok) {
                return {
                    data: { 'Code': 500, "Message": "Error interno del servidor" }
                }
            }
            return response.json();
        }).then(data => {
            switch (data.statusCode || data.Code) {
                case 200:
                    if (data.statusCode.Code === 200) {
                        localStorage.removeItem("correo");
                        localStorage.removeItem("barer");
                        window.location.href = '/login';
                    }
                case 401:
                    localStorage.removeItem("correo");
                    localStorage.removeItem("barer");
                    window.location.href = '/login';
                    break;
                default: break;
            }
        })
    }

    const handleDashboard = () => setOptions("dashboard");
    const handleRecetas = () => setOptions("receta");
    const handleCollection = () => setOptions("collection");
    const handleGraficos = () => setOptions("graficos");

    useEffect(() => {
        if (!isMobile) handleAppBarClose()
        if (isMobile) setTop('0');
    }, [isMobile])

    const handleAppBarClose = () => {
        setOpenDrawer(false);
        setTop('65');
    }

    return (
        <>
            <Drawer variant={isMobile ? 'temporary' : 'persistent'} open={openDrawer} slotProps={{
                paper: {
                    sx: {
                        width: '250px',
                        top: `${top}px`,
                        height: `calc(100% -  ${top}px)`
                    }
                }
            }}>
                <Box sx={{ m: 0, p: 0 }}>
                    {/* Perfil del usuario */}
                    <Stack
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{ px: 2, py: 2, background: 'linear-gradient(120deg, #e3f6ec 0%, #e1f1f7 100%)' }}
                    >
                        <Avatar sx={{ bgcolor: '#2bb675', color: '#fff', fontWeight: 700, width: 44, height: 44 }}>
                            {obtenerIniciales()}
                        </Avatar>
                        <Box sx={{ minWidth: 0 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1d3b2f', lineHeight: 1.2 }} noWrap>
                                {obtenerNombre()}
                            </Typography>
                            <Typography variant="caption" sx={{ color: '#3d6b58', display: 'block' }} noWrap title={correo || ''}>
                                {correo}
                            </Typography>
                        </Box>
                    </Stack>
                    <List subheader={
                        <ListSubheader sx={{
                            bgcolor: 'grey.300',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            lineHeight: '32px'
                        }} component="div">Menu de opciones</ListSubheader>
                    }>
                        <ListItemButton
                            onClick={handleDashboard}
                            selected={menuOptions === "dashboard"}
                            sx={{
                                '&.Mui-selected': {
                                    bgcolor: '#e3f2fd',
                                    '& .MuiSvgIcon-root': { color: '#1976d2' }
                                },
                                '&.Mui-selected:hover': { bgcolor: '#bbdefb' }
                            }}
                        >
                            <ListItemIcon>
                                <Toolbar><HomeIcon /><ListItemText primary="Inicio" /></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleRecetas}
                            selected={menuOptions === "receta"}
                            sx={{
                                '&.Mui-selected': {
                                    bgcolor: '#e3f2fd',
                                    '& .MuiSvgIcon-root': { color: '#1976d2' }
                                },
                                '&.Mui-selected:hover': { bgcolor: '#bbdefb' }
                            }}
                        >
                            <ListItemIcon>
                                <Toolbar><CalculateIcon /><ListItemText primary="Crea tu Receta" /></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>

                        <ListItemButton
                            onClick={handleCollection}
                            selected={menuOptions === "collection"}
                            sx={{
                                '&.Mui-selected': {
                                    bgcolor: '#e3f2fd',
                                    '& .MuiSvgIcon-root': { color: '#1976d2' }
                                },
                                '&.Mui-selected:hover': { bgcolor: '#bbdefb' }
                            }}
                        >
                            <ListItemIcon>
                                <Toolbar><LibraryBooksIcon /><ListItemText primary="Colecciones" /></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>

                    <List subheader={
                        <ListSubheader sx={{
                            bgcolor: 'grey.300',
                            color: 'primary.main',
                            fontWeight: 'bold',
                            fontSize: 12,
                            letterSpacing: 1,
                            textTransform: 'uppercase',
                            lineHeight: '32px'
                        }} component="div">Estadísticas</ListSubheader>
                    }>
                        <ListItemButton
                            onClick={handleGraficos}
                            selected={menuOptions === "graficos"}
                            sx={{
                                '&.Mui-selected': {
                                    bgcolor: '#e3f2fd',
                                    '& .MuiSvgIcon-root': { color: '#1976d2' }
                                },
                                '&.Mui-selected:hover': { bgcolor: '#bbdefb' }
                            }}
                        >
                            <ListItemIcon>
                                <Toolbar><EqualizerIcon /><ListItemText primary="Gráficos" /></Toolbar>
                            </ListItemIcon>
                        </ListItemButton>
                    </List>
                </Box>

                <Box sx={{ flexGrow: 1 }} />
                <Toolbar>
                    <Box sx={{ justifyContent: 'flex-end' }}>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon /><ListItemText primary="LogOut" />
                            </ListItemIcon>
                        </ListItemButton>
                    </Box>
                    {isMobile && (
                        <Box sx={{ flexFlow: 1, justifyContent: 'flex-end' }}>
                            <ListItemButton onClick={handleAppBarClose}>
                                <ListItemIcon>
                                    <KeyboardDoubleArrowLeftIcon />
                                </ListItemIcon>
                            </ListItemButton>
                        </Box>
                    )}
                </Toolbar>
            </Drawer>
        </>
    );
}

export default SideBar;
