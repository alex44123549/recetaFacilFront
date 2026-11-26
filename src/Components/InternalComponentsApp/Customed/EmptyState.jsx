import { Box, Typography, Button, Avatar } from "@mui/material";

// Lo que se muestra cuando una sección no tiene datos, en vez de dejarla en blanco.
const EmptyState = ({ icon, title, text, actionText, onAction }) => (
    <Box sx={{ textAlign: 'center', py: 5, px: 2, color: 'text.secondary' }}>
        <Avatar sx={{ bgcolor: 'rgba(43, 182, 117, 0.12)', color: '#2bb675', width: 72, height: 72, mx: 'auto', mb: 2 }}>
            {icon}
        </Avatar>
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>{title}</Typography>
        {text && <Typography variant="body2" sx={{ mt: 0.5, maxWidth: 360, mx: 'auto' }}>{text}</Typography>}
        {actionText && (
            <Button
                variant="outlined"
                onClick={onAction}
                sx={{ mt: 2, borderRadius: 2, textTransform: 'none', color: '#2bb675', borderColor: '#2bb675' }}
            >
                {actionText}
            </Button>
        )}
    </Box>
);

export default EmptyState;
