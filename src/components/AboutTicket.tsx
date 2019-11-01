import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "gatsby"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import TicketContext from "../context/TicketContext"

const useStyles = makeStyles(theme => ({
  card: {
    width: "100%",
    height: "50vh",
    marginTop: theme.spacing(3),
  },
}))

export default function AboutTicket() {
  const classes = useStyles()

  const TypograthyList: React.SFC<{
    message: JSX.Element
    color: string
    variant: string
  }> = (message, color, variant) => {
    return (
      <Typography variant={variant} component="h3" color={color} gutterBottom>
        {message}
      </Typography>
    )
  }

  return (
    <TicketContext.Consumer>
      {({ selectedTicket }) => (
        <React.Fragment>
          <Card className={classes.card}>
            {!selectedTicket ? (
              TypograthyList(<b>No choose ticket</b>, "secondary", "h4")
            ) : (
              <CardContent>
                <Typography
                  variant="h4"
                  component="h3"
                  color="primary"
                  gutterBottom
                >
                  <b>Ticket description:</b> {selectedTicket.description}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Completed:</b> {selectedTicket.completed ? "yes" : "no"}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Number:</b> {selectedTicket.id}
                </Typography>
                <Typography
                  variant="h5"
                  component="h3"
                  color="textSecondary"
                  gutterBottom
                >
                  <b>Assigned user:</b> {selectedTicket.assigneeId}
                </Typography>
              </CardContent>
            )}
            <CardActions>
              <Link to="/">
                <Button size="small" variant="contained" color="primary">
                  To tickets list
                </Button>
              </Link>
            </CardActions>
          </Card>
        </React.Fragment>
      )}
    </TicketContext.Consumer>
  )
}
