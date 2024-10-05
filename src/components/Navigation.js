import TableChartIcon from '@mui/icons-material/TableChart';

const Navigation = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'Projects', icon: <FolderIcon />, path: '/projects' },
    { text: 'Team', icon: <PeopleIcon />, path: '/team' },
    { text: 'Reports', icon: <BarChartIcon />, path: '/reports' },
    { text: 'Generate Timetable', icon: <TableChartIcon />, path: '/generate' }, // Ensure this is correct
  ];

  // ... (rest of the existing code)
};

export default Navigation;