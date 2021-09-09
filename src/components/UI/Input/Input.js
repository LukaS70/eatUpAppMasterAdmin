import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        marginLeft: '10%',
        marginRight: '10%',
        marginBottom: '3%'
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
}));

const input = (props) => {
    let inputElement = null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const classes = useStyles();

    switch (props.elementType) {
        case ('textfield'):
            inputElement = <TextField fullWidth {...props.elementConfig} value={props.value} onChange={props.changed} error={props.invalid && props.shouldValidate && props.touched} disabled={props.disableInput}/>;
            break;
        case ('textarea'):
            inputElement = <TextField fullWidth multiline {...props.elementConfig} value={props.value} onChange={props.changed} error={props.invalid && props.shouldValidate && props.touched} disabled={props.disableInput}/>;
            break;
        case ('textfieldwithstaticlabel'):
            inputElement = <TextField fullWidth {...props.elementConfig} value={props.value} onChange={props.changed} error={props.invalid && props.shouldValidate && props.touched} disabled={props.disableInput}
            /* InputProps={{ startAdornment: <InputAdornment position="end">{props.staticlabel}</InputAdornment> }} */
            />;
            break;
        case ('gender'):
            inputElement = (
                <FormControl component="fieldset">
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup aria-label="gender" name="gender1" value={props.value} onChange={props.changed}>
                        <FormControlLabel value="female" control={<Radio />} label="Female" disabled={props.disableInput}/>
                        <FormControlLabel value="male" control={<Radio />} label="Male" disabled={props.disableInput}/>
                    </RadioGroup>
                </FormControl>
            );
            break;
        case ('select'):
            inputElement = (
                <FormControl variant={props.elementConfig.variant}>
                    <InputLabel /* shrink */ id="demo-simple-select-label">{props.elementConfig.label}</InputLabel>
                    <Select
                        style={{ minWidth: '220px' }}   // mozda ima bolji nacin
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={props.changed}
                        label={props.elementConfig.label}

                    /* displayEmpty */
                    >
                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem> */}
                        {props.options.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
            break;
        case ('filterCategory'):
            inputElement = (
                <FormControl >
                    <InputLabel shrink id="demo-simple-select-label">{props.elementConfig.label}</InputLabel>
                    <Select
                        style={{ minWidth: '220px' }}   // mozda ima bolji nacin
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.value}
                        onChange={props.changed}

                        displayEmpty
                    >
                        <MenuItem value="">
                            <em>All</em>
                        </MenuItem>
                        {props.options.map(option => (
                            <MenuItem key={option.id} value={option.id}>{option.displayName}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            );
            break;
        case ('checkbox'):
            inputElement = (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.value}
                            onChange={props.changed}
                            color="primary"
                        />
                    }
                    label={props.elementConfig.label}
                />
            );
            break;
        case ('search'):
            inputElement = (
                <Paper className={classes.root}>
                    <InputBase
                        className={classes.input}
                        fullWidth
                        {...props.elementConfig}
                        value={props.value}
                        onChange={props.changed}
                    />
                    <IconButton onClick={props.search} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                </Paper>
            );
            break;
        default:
            inputElement = <TextField {...props.elementConfig} value={props.value} onChange={props.changed} />;
    }
    return (
        <div>
            { inputElement}
        </div>
    )
};

export default input;