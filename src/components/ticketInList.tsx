import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import DeleteIcon from "@material-ui/icons/Delete"
import EditIcon from "@material-ui/icons/Edit"
import Grid from "@material-ui/core/Grid"
import Button from "@material-ui/core/Button"
import { ticketsTypes, usersTypes } from "../context/TicketContext"
import SelectAssign from "../components/SelectAssign"
import IconsButton from "../components/IconsButton"

const useStyles = makeStyles({
  card: {
    width: "100%",
    padding: "1rem",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  pos: {
    marginBottom: 12,
  },
})

type TicketInListProps = {
  ticket: ticketsTypes
  users: Array<usersTypes>
  deleteTicket: CallableFunction
}

export default function TicketInList({ ticket, users, deleteTicket }: TicketInListProps) {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item lg={10} md={9} sm={8} xs={12}>
          <CardContent>
            <Typography
              variant="h5"
              component="h3"
              color="textSecondary"
              gutterBottom
            >
              {ticket.description}
            </Typography>
          </CardContent>
          <SelectAssign assignedId={ticket.assigneeId} users={users} />
          <CardActions>
            <Link to="/ticket">
              <Button size="small" variant="contained" color="primary">
                About ticket
              </Button>
            </Link>
          </CardActions>
        </Grid>
        <Grid item lg={2} md={3} sm={4} xs={12}>
          <CardActions>
            <IconsButton type="edit" Icon={EditIcon} />
            <IconsButton type="delete" Icon={DeleteIcon} deleteTicket={deleteTicket} id={ticket.id}/>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  )
}
