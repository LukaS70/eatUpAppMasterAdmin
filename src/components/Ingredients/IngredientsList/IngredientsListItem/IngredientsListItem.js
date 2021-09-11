import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { Avatar, Button, CardActions, CardHeader, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import PublicIcon from "@material-ui/icons/Public";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

const IngredientListItem = (props) => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" style={{ backgroundColor: "#f44336" }}>
            {props.firstName.charAt(0)}
          </Avatar>
        }
        title={props.firstName + " " + props.lastName}
        subheader={props.email}
        action={
            <Button disabled style={{color: 'black', marginTop: '10px'}}>
              Ingredient Review Request
            </Button>
          }
      />
      <CardMedia component="img" height="200" image={props.image} />
      <CardContent>
        <div style={{ padding: "5px" }}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold', fontSize: '20px', padding:'12px'}}>
                    {props.name}
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: '20px', padding:'12px'}} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Category
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.category}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Measurement Unit
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.measurementUnit}
                  </TableCell>
                </TableRow>
                </TableBody>
              <TableHead>
                <TableRow>
                  <TableCell style={{fontWeight: 'bold', fontSize: '17px', padding:'12px'}}>
                    Nutrition
                  </TableCell>
                  <TableCell style={{fontWeight: 'bold', fontSize: '17px', padding:'12px'}} align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Calories
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.calories >= 0.01 ? props.calories : 0} kcal
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Total Fats
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.totalFats >= 0.01 ? props.totalFats : 0} g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Saturated Fats
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.saturatedFats >= 0.01 ? props.saturatedFats : 0} g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Total Carbohydrates
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.totalCarbohydrates >= 0.01
                      ? props.totalCarbohydrates
                      : 0}{" "}
                    g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Sugars
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.sugar >= 0.01 ? props.sugar : 0} g
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row" style={{padding:'12px'}}>
                    Proteine
                  </TableCell>
                  <TableCell align="right" style={{padding:'12px'}}>
                    {props.proteine >= 0.01 ? props.proteine : 0} g
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={props.public}
          style={{ width: "100%", margin: "10px" }}
          startIcon={<PublicIcon />}
        >
          ACCEPT
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          onClick={props.deny}
          style={{ marginLeft: "auto", width: "100%", margin: "10px" }}
          startIcon={<RemoveCircleIcon />}
        >
          DENY
        </Button>
      </CardActions>
    </Card>
  );
};

export default IngredientListItem;
