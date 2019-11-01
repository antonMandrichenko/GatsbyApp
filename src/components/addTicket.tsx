import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import DescriptionInput from "../components/DescriptionInput"
import LoadingData from "./LoadingData"

type AddTicketTypes = {
  addTicket: Function
  isLoading: boolean
}

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 200,
    width: 250
  },
}))

export default function AddTicket({ addTicket, isLoading }: AddTicketTypes) {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [inputText, setInputText] = React.useState("")

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const addedTicketAndClose = async () => {
    await addTicket({ description: inputText })
    setOpen(false)
  }

  const enterText = (e: React.MouseEvent<HTMLElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Add ticket
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {isLoading ? (
              <LoadingData />
            ) : (
              <React.Fragment>
                <h2 id="modal-title">Added ticket</h2>
                <DescriptionInput enterText={enterText} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={addedTicketAndClose}
                  disabled={!Boolean(inputText)}
                >
                  Add new ticket
                </Button>
              </React.Fragment>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
