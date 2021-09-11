import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import User from './User/User';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 0,
    },
    user: {
        padding: theme.spacing(0.5),
        textAlign: '',
        color: theme.palette.text.secondary,
        /* minWidth: '550px' */
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

const Users = (props) => {
    const classes = useStyles();

    const users = props.users.map(user => {
        return (
            <Grid item sm={12} xl={12} key={user.id} className={classes.user}>
                <User
                    email={user.email}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    gender={user.gender}
                    dateOfBirth={user.dateOfBirth}
                    height={user.height}
                    weight={user.weight}
                    maxCalories={user.maxCalories}
                />
            </Grid>
        )
    })

    return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                {users}
            </Grid>
        </div>
    );
}

export default Users;