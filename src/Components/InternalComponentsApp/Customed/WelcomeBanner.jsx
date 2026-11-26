import { Box, Typography, Stack, Button } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { obtenerNombre } from "../js/usuario";

// Frase según la hora del día
const saludo = () => {
    const hora = new Date().getHours();
    if (hora < 12) return 'Buenos días';
    if (hora < 19) return 'Buenas tardes';
    return 'Buenas noches';
};

const fechaHoy = () => {
    const texto = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' });
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};

// Franja de bienvenida del Inicio: saludo, fecha y acceso directo a crear receta.
const WelcomeBanner = ({ onNuevaReceta }) => (
    <Box
        sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 3,
            p: { xs: 2.5, sm: 3.5 },
            color: '#1d3b2f',
            background: 'linear-gradient(120deg, #e3f6ec 0%, #e1f1f7 60%, #fdf1e4 100%)',
            border: '1px solid rgba(43, 182, 117, 0.25)',
        }}
    >
        {/* Ícono decorativo de fondo */}
        <RestaurantMenuIcon
            sx={{
                position: 'absolute',
                right: { xs: -20, sm: 24 },
                bottom: -30,
                fontSize: 180,
                color: 'rgba(43, 182, 117, 0.12)',
                transform: 'rotate(-15deg)',
                pointerEvents: 'none',
            }}
        />
        <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
            sx={{ position: 'relative' }}
        >
            <Box>
                <Typography variant="body2" sx={{ color: '#3d6b58', fontWeight: 500 }}>{fechaHoy()}</Typography>
                <Typography variant="h4" className="font-marca" sx={{ color: '#1d3b2f', lineHeight: 1.2, mt: 0.5 }}>
                    {saludo()}, {obtenerNombre()}
                </Typography>
                <Typography variant="body1" sx={{ color: '#3d6b58', mt: 0.5 }}>
                    Esto es lo que ha pasado en tu cocina esta semana.
                </Typography>
            </Box>
            <Button
                variant="contained"
                size="large"
                startIcon={<AddCircleOutlineIcon />}
                onClick={onNuevaReceta}
                sx={{
                    bgcolor: '#2bb675',
                    color: '#fff',
                    borderRadius: 2,
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 16px rgba(43, 182, 117, 0.35)',
                    '&:hover': { bgcolor: '#229a62' },
                }}
            >
                Nueva receta
            </Button>
        </Stack>
    </Box>
);

export default WelcomeBanner;
