import { Card, CardContent, Stack, Box, Typography, Avatar, Skeleton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import BoxCustom from "./BoxCustom";

// Tarjeta de una métrica del Inicio: ícono de color, título, número y porcentaje.
// Mientras `loading` es true muestra bloques grises animados en vez de los valores.
const StatCard = ({ icon, color, title, value, percent, loading }) => (
    <Card
        elevation={0}
        sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderLeft: `5px solid ${color}`,
            borderRadius: 2,
            transition: 'transform .2s ease, box-shadow .2s ease',
            '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 6px 18px ${alpha(color, 0.18)}` },
        }}
    >
        <CardContent sx={{ '&:last-child': { pb: 2 } }}>
            <Stack direction="row" spacing={2} alignItems="center">
                <Avatar sx={{ bgcolor: alpha(color, 0.14), color, width: 48, height: 48 }}>
                    {icon}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>{title}</Typography>
                    {loading
                        ? <Skeleton width={56} height={42} />
                        : <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>{value || 0}</Typography>}
                </Box>
                {loading
                    ? <Skeleton variant="rounded" width={100} height={36} />
                    : <BoxCustom valueA={percent} text={`${percent || 0} % del total`} />}
            </Stack>
        </CardContent>
    </Card>
);

export default StatCard;
