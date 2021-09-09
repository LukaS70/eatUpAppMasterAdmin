/* import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import MeetingRoomOutlinedIcon from '@material-ui/icons/MeetingRoomOutlined';
import RestaurantOutlinedIcon from '@material-ui/icons/RestaurantOutlined';
import ShoppingBasketOutlinedIcon from '@material-ui/icons/ShoppingBasketOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    logo: {
        margin: 'auto',
        textAlign: 'center',
        maxWidth: '50%',
        maxHeight: '70%',
    },
    logoHorizontallyCenter: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }
}));

export default function Appbar(props) {
    const auth = useSelector(state => state.auth.token !== null);
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    let items = (
        <div>
            <List>
                <ListItem button component={NavLink} to="/recipes">
                    <ListItemIcon> <AssignmentOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='Recipes' />
                </ListItem>
                <ListItem button component={NavLink} to="/ingredients">
                    <ListItemIcon> <RestaurantOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='Ingredients' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={NavLink} to="/auth">
                    <ListItemIcon> <AccountCircleOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='SignUp' />
                </ListItem>
            </List>
        </div>
    );

    if (auth) {
        items = (
            <div>
            <List>
                <ListItem button component={NavLink} to="/recipes">
                    <ListItemIcon> <AssignmentOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='Recipes' />
                </ListItem>
                <ListItem button component={NavLink} to="/ingredients">
                    <ListItemIcon> <RestaurantOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='Ingredients' />
                </ListItem>
                <ListItem button component={NavLink} to="/shoppinglist">
                    <ListItemIcon> <ShoppingBasketOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='ShoppingList' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button component={NavLink} to="/myaccount">
                    <ListItemIcon> <AccountCircleOutlinedIcon /> </ListItemIcon>
                    <ListItemText primary='MyAccount' />
                </ListItem>
                {<ListItem button component={NavLink} to="/admin">
                    <ListItemIcon><SupervisorAccountOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Admin' />
                </ListItem>}
                <ListItem button component={NavLink} to="/logout">
                    <ListItemIcon> <MeetingRoomOutlinedIcon /></ListItemIcon>
                    <ListItemText primary='Logout' />
                </ListItem>
            </List>
        </div>
        );
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        eatUp
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                {items}
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {props.children}
            </main>
        </div>
    );
} */

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Appbar(props) {
  const auth = useSelector(state => state.auth.token !== null);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  const resetValue = () => {
      setValue(0);
  }

    let items = (
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
        </Tabs>
    );

    if (auth) {
        items = (
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" /* style={{height: 60}} */>
                <Tab label="Data Management" button component={NavLink} {...a11yProps(0)} to="/datamanagement"  /* style={{width: 210, fontSize: 16}} *//>
                <Tab label="Pending Reviews" button component={NavLink} {...a11yProps(1)} to="/pendingreviews" /* style={{width: 210, fontSize: 16}} *//>
                <Tab label="Users & Analytics" button component={NavLink} {...a11yProps(2)} to="/analytics" /* style={{width: 210, fontSize: 16}} *//>
                <Button component={NavLink} to="/logout" onClick={resetValue}
                    style={{ width: '150px', marginLeft: 'auto' }}
                    variant="contained"
                    startIcon={<ExitToAppIcon />}>Logout</Button>
            </Tabs>
        );
    }
  return (
    <div className={classes.root}>
      <AppBar position="static">
          {items}
      </AppBar>
      <TabPanel value={value} index={0}>
      {props.children}
      </TabPanel>
      <TabPanel value={value} index={1}>
      {props.children}
      </TabPanel>
      <TabPanel value={value} index={2}>
      {props.children}
      </TabPanel>
    </div>
  );
}