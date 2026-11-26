// Datos del usuario para mostrar en pantalla.
// El contexto tiene `userName`, pero nada lo llena: por eso se sacan del correo guardado al iniciar sesión.

const obtenerCorreo = () => localStorage.getItem('correo') || '';

// "ana.perez@correo.com" -> "Ana.perez"
const obtenerNombre = () => {
    const usuario = obtenerCorreo().split('@')[0];
    if (!usuario) return 'Chef';
    return usuario.charAt(0).toUpperCase() + usuario.slice(1);
};

// "ana.perez@correo.com" -> "AP"; "ana@correo.com" -> "A"
const obtenerIniciales = () => {
    const usuario = obtenerCorreo().split('@')[0];
    if (!usuario) return '?';
    const partes = usuario.split(/[._-]+/).filter(Boolean);
    return partes.slice(0, 2).map((p) => p.charAt(0).toUpperCase()).join('');
};

export { obtenerCorreo, obtenerNombre, obtenerIniciales };
