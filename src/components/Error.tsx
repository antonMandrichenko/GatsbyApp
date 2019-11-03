import React, { useContext, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import AppContext from "../context/AppContext"

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#ff9999",
    border: "1px solid red",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

const Error: React.FC = () => {
  const classes = useStyles()
  const { error, clearError } = useContext(AppContext)

  const handleClose = () => {
    clearError()
  }

  return (
    <div>
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        className={classes.modal}
        open={error.isError}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={error.isError}>
          <div className={classes.paper}>
            <h2 id="title">Error</h2>
            <p id="description">{error.message}</p>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}

export default Error
