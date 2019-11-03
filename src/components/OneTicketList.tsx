import React, { useContext } from "react"
import { Link } from "gatsby"
import { makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Avatar from "@material-ui/core/Avatar"
import LinearProgress from "@material-ui/core/LinearProgress"
import IconButton from "@material-ui/core/IconButton"
import FolderIcon from "@material-ui/icons/Folder"
import ZoomInIcon from "@material-ui/icons/ZoomIn"
import AppContext from "../context/AppContext"
import CompleteTicket from "./CompleteTicket"
import AssignUser from "./AssignUser"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}))

export default function OneTicketList() {
  const classes = useStyles()
  const { tickets, loadingData, filterText, getTicket } = useContext(AppContext)

  function generate(elems: typeof tickets) {
    return elems
      .filter(elem => elem && elem.description.indexOf(filterText) !== -1)
      .map(
        value =>
          value && (
            <ListItem key={value.id}>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={value.description} />
              <AssignUser ticket={value} />
              <CompleteTicket ticket={value} />
              <ListItemSecondaryAction>
                <IconButton
                  disabled={loadingData}
                  onClick={() => {
                    getTicket(value.id)
                  }}
                >
                  <Link to="/about">
                    <ZoomInIcon />
                  </Link>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
      )
  }

  return (
    <div className={classes.root}>
      <div className={classes.demo}>
        <List>{generate(tickets)}</List>
        {loadingData && <LinearProgress color="primary" />}
      </div>
    </div>
  )
}
