import { Card, CardContent, CardActions, Stack, Box, Typography, Avatar, Chip, Button } from "@mui/material";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const COLORES = ['#2bb675', '#2b96b6', '#f2994a', '#9b51e0', '#eb5757'];
const MAX_CHIPS = 4;

// `_ingredientes` llega del back como texto JSON (una lista). Si no se puede leer, no se muestran chips.
const leerIngredientes = (raw) => {
    try {
        const valor = JSON.parse(raw);
        return Array.isArray(valor) ? valor : Object.values(valor || {});
    } catch {
        return [];
    }
};

// Tarjeta de una receta en "Últimas recetas" del Inicio.
const RecipeCard = ({ receta, index, onVer, onGuardar }) => {
    const color = COLORES[index % COLORES.length];
    const ingredientes = leerIngredientes(receta._ingredientes);
    const restantes = ingredientes.length - MAX_CHIPS;

    return (
        <Card
            elevation={0}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid',
                borderColor: 'divider',
                borderTop: `4px solid ${color}`,
                borderRadius: 2,
                transition: 'transform .2s ease, box-shadow .2s ease',
                '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 20px rgba(0,0,0,0.08)' },
            }}
        >
            <CardContent sx={{ flex: 1 }}>
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <Avatar sx={{ bgcolor: color, color: '#fff', width: 40, height: 40 }}>
                        <RestaurantIcon fontSize="small" />
                    </Avatar>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', lineHeight: 1.3 }}>
                            {receta._nombre}
                        </Typography>
                        <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', mt: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 14 }} />
                            <Typography variant="caption">{receta._fecha_registro}</Typography>
                        </Stack>
                    </Box>
                </Stack>
                {ingredientes.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
                        {ingredientes.slice(0, MAX_CHIPS).map((ing, i) => (
                            <Chip key={i} label={String(ing)} size="small" variant="outlined" sx={{ maxWidth: '100%' }} />
                        ))}
                        {restantes > 0 && (
                            <Chip label={`+${restantes}`} size="small" sx={{ bgcolor: 'rgba(0,0,0,0.06)', color: 'text.primary' }} />
                        )}
                    </Box>
                )}
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }}>
                <Button
                    size="small"
                    variant="outlined"
                    startIcon={<RemoveRedEyeIcon />}
                    onClick={() => onVer(receta)}
                    sx={{ textTransform: 'none', borderRadius: 2, color: '#2b96b6', borderColor: '#2b96b6' }}
                >
                    Ver
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    startIcon={<SaveAltIcon />}
                    onClick={() => onGuardar(receta.id)}
                    sx={{ textTransform: 'none', borderRadius: 2, bgcolor: '#2bb675', color: '#fff', ml: 'auto', '&:hover': { bgcolor: '#229a62' } }}
                >
                    Guardar
                </Button>
            </CardActions>
        </Card>
    );
};

export default RecipeCard;
