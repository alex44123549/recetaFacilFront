import { Box, Typography, Stack, useTheme, useMediaQuery, Card, CardContent, Skeleton } from "@mui/material";
import { dataContext } from "../../Context/MetricsContext";
import { useContext, useState, useEffect } from "react";
import PruebaECharts from "../Graphics/PruebaEcharts";
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import ViewSingleRecetas from "./SpecificActions/viewSingleRecetas";
import ChangeRecetaStatus from "./SpecificActions/deleteItem";
import LinearChart from "../Graphics/LinearCharts";
import WelcomeBanner from "../Customed/WelcomeBanner";
import StatCard from "../Customed/StatCard";
import RecipeCard from "../Customed/RecipeCard";
import EmptyState from "../Customed/EmptyState";

// Título de cada sección del Inicio, con la fuente de la marca
const SectionTitle = ({ children }) => (
  <Typography variant="h5" className="font-marca" sx={{ color: '#1d3b2f', mb: 1.5 }}>{children}</Typography>
);

// Tarjeta blanca con borde suave que envuelve gráficas y listas
const PanelCard = ({ children, sx }) => (
  <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2, ...sx }}>
    <CardContent sx={{ height: '100%' }}>{children}</CardContent>
  </Card>
);

const OverView = () => {
  const { openDrawer, setOptions, eChartData, setChartData, collectionData, setCollectionData, recetasToday, setToday } = useContext(dataContext);
  const [loading, setLoading] = useState(true);

  const [todayPercent, setPercent] = useState('');
  const [collectPercent, setCollectPercent] = useState('');
  const [recetas_week, setRecetasWeek] = useState('');
  const [recetas_week_percent, setRecetasWeelPercent] = useState('');
  const [top_5_recetas, setTop5] = useState([]);
  const [all_week_collections, setCollection] = useState('');
  const [all_week_collections_percent, setWeekCollectionsPercent] = useState('');
  const [viewOpenModal, setOpenModal] = useState(false);
  const [viewChangeModal, setChangeModal] = useState(false);
  const [rows, setRows] = useState([]);
  const [rowsChangeModal, setRowsChangeModal] = useState([]);
  const [recipes_per_status, setRecipes_per_status] = useState([]);
  const [update_render,setUpdateRender] = useState(false);

  const handleCloseChangeStatusModal = () => {
    setChangeModal(false);
  }


  const handleOpenModal = (param) => {
    setOpenModal(true);
    setRows(param);
  }

  const handleCloseModal = () => {
    setOpenModal(false);
  }
  const handleOpenChangeStatusModal = (param) => {
    setRowsChangeModal(param)
    setChangeModal(true);
  }

  // Si el usuario no tiene recetas, el back manda 0 en vez de una lista
  const ultimasRecetas = Array.isArray(top_5_recetas) ? top_5_recetas : [];
  const sinDatosSemana = !eChartData || Object.keys(eChartData).length === 0;
  const sinDatosEstados = !recipes_per_status || recipes_per_status.length === 0;
  const irANuevaReceta = () => setOptions('receta');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const formData = new FormData();

    formData.append('mail', localStorage.getItem('correo'));
    formData.append('token', localStorage.getItem('barer'));
    formData.append('date_init', `${year}-${month}-${day - 7}`);
    formData.append('date_end', `${year}-${month}-${day}`);
    formData.append('today', `${year}-${month}-${day}`);

    fetch(`${import.meta.env.VITE_URL_ENVIRONMENT}/Reports/home`, {
      method: 'POST',
      body: formData
    }).then(res => res.json())
      .then(data => {
        if (data.Code === 401) {
          localStorage.removeItem("correo");
          localStorage.removeItem("barer");
          window.location.href = '/login';
        }
        setChartData(data.data.statusWeek.data);
        setCollectionData(data.data.collections);
        setToday(data.data.today);
        setPercent(data.data.rf_all_);
        setRecetasWeek(data.data.rf_all_Week);
        setRecetasWeelPercent(data.data.rf_all_Week_percent);
        setCollection(data.data.rf_all_week_collections);
        setCollectPercent(data.data.rf_collect_today);
        setTop5(data.data.rf_top_5);
        setWeekCollectionsPercent(data.data.rf_all_week_collections_percent);
        setRecipes_per_status(data.data.rf_recipes_per_status);
      })
      .catch((error) => console.error('Error al cargar el Inicio:', error))
      .finally(() => setLoading(false));
  }, [update_render]);

  return (
    <Box
      component="main"
      sx={{
        height: "calc(100vh - 64px)",
        ml: openDrawer ? "270px" : "20px",
        pr: '2%',
        transition: "margin .3s ease",
        overflowX: "hidden",
        mt: '64px'
      }}
    >
      <Box sx={{ p: 1, pb: 4, top: '65px', overflowX: "hidden", height: 'calc(100vh - 100px)' }}>
        <Stack direction="column" spacing={3}>
          {/* 1. Bienvenida */}
          <WelcomeBanner onNuevaReceta={irANuevaReceta} />

          {/* 2. Métricas + gráfica de la semana */}
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
            <Stack direction="column" spacing={2} sx={{ flex: 1, width: '100%' }}>
              <StatCard loading={loading} color="#2bb675" icon={<RestaurantMenuIcon />}
                title="Recetas hoy" value={recetasToday} percent={todayPercent} />
              <StatCard loading={loading} color="#2b96b6" icon={<DateRangeIcon />}
                title="Recetas esta semana" value={recetas_week} percent={recetas_week_percent} />
              <StatCard loading={loading} color="#f2994a" icon={<LibraryBooksIcon />}
                title="Colecciones hoy" value={collectionData} percent={collectPercent} />
              <StatCard loading={loading} color="#9b51e0" icon={<CollectionsBookmarkIcon />}
                title="Colecciones esta semana" value={all_week_collections} percent={all_week_collections_percent} />
            </Stack>
            <PanelCard sx={{ flex: 2, width: '100%', minHeight: isMobile ? 300 : 420 }}>
              {loading ? (
                <Skeleton variant="rounded" height={380} />
              ) : sinDatosSemana ? (
                <EmptyState icon={<ShowChartIcon fontSize="large" />} title="Sin actividad esta semana"
                  text="Cuando crees recetas, aquí verás cuántas hiciste cada día." />
              ) : (
                <PruebaECharts />
              )}
            </PanelCard>
          </Stack>

          {/* 3. Últimas recetas como tarjetas */}
          <Box>
            <SectionTitle>Tus últimas recetas</SectionTitle>
            {loading ? (
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} variant="rounded" height={170} />)}
              </Box>
            ) : ultimasRecetas.length === 0 ? (
              <PanelCard>
                <EmptyState icon={<RamenDiningIcon fontSize="large" />} title="Aún no tienes recetas"
                  text="Crea tu primera receta con los ingredientes que tengas en casa."
                  actionText="Crear mi primera receta" onAction={irANuevaReceta} />
              </PanelCard>
            ) : (
              <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
                {ultimasRecetas.map((receta, index) => (
                  <RecipeCard key={receta.id} receta={receta} index={index}
                    onVer={handleOpenModal} onGuardar={handleOpenChangeStatusModal} />
                ))}
              </Box>
            )}
          </Box>

          {/* Gráfica de recetas por estado */}
          <Box>
            <SectionTitle>Recetas por estado</SectionTitle>
            <PanelCard sx={{ minHeight: isMobile ? 300 : 420 }}>
              {loading ? (
                <Skeleton variant="rounded" height={380} />
              ) : sinDatosEstados ? (
                <EmptyState icon={<ShowChartIcon fontSize="large" />} title="Todavía no hay datos"
                  text="Aquí verás cuántas recetas tienes guardadas y sin guardar." />
              ) : (
                <LinearChart data={recipes_per_status} />
              )}
            </PanelCard>
          </Box>
        </Stack>
      </Box>
      <ViewSingleRecetas row={rows} open={viewOpenModal} onClose={handleCloseModal} />
      <ChangeRecetaStatus title='¿Desea Guardar la receta?' value={'1'} route={'/recetaChangeStatus'} open={viewChangeModal} id={rowsChangeModal} onClose={handleCloseChangeStatusModal} onSuccess={()=>setUpdateRender(prev=>!prev)}/>
    </Box>
  );
};

export default OverView;
