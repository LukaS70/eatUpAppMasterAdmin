import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button, CardActions } from "@material-ui/core";
import PublicIcon from '@material-ui/icons/Public';

const Recipe = (props) => {
  return (
    <Card>
      <CardActionArea onClick={props.toDetails}>
        <CardMedia component="img" height="140" image={props.image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.instructions.substring(0, 300) + "..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          variant="outlined"
          color="primary"
          onClick={props.unpublic}
          style={{ marginLeft: "auto" }}
          startIcon={<PublicIcon />}
        >
          REMOVE PUBLIC STATUS
        </Button>
      </CardActions>
    </Card>
  );
};

export default Recipe;
