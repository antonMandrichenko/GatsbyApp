import React, { useContext } from "react"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import Avatar from "@material-ui/core/Avatar"
import ImageIcon from "@material-ui/icons/Image"
import WorkIcon from "@material-ui/icons/Work"
import BeachAccessIcon from "@material-ui/icons/BeachAccess"
import LinearProgress from "@material-ui/core/LinearProgress"
import AppContext from "../context/AppContext"

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}))

const TicketDetails = () => {
  const classes = useStyles()
  const { ticket, user, loadingData } = useContext(AppContext)
  return (
    <Layout>
      <Link to="/">Back to list</Link>
      {loadingData ? (
        <LinearProgress color="primary" />
      ) : (
        <React.Fragment>
          {ticket ? (
            <List className={classes.root}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={ticket.description} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <WorkIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`Completed: ${ticket.completed}`} />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <BeachAccessIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user ? user.name : "no assigned"}
                  secondary={user && `userId ${user.id}`}
                />
              </ListItem>
            </List>
          ) : (
            <div>No data from server</div>
          )}
        </React.Fragment>
      )}
    </Layout>
  )
}

export default TicketDetails
