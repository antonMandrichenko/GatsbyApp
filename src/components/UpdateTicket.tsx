import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"
import Button from "@material-ui/core/Button"
import DescriptionInput from "../components/DescriptionInput"
import LoadingData from "./LoadingData"
import TicketContext, {
  usersTypes,
  ticketsTypes,
} from "../context/TicketContext"

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
    width: 250,
  },
}))

type AddTicketTypes = {
  callback: Function
  isLoading: boolean
  text: string
  id: number
  addedButton: Function
}

export default function UpdateTicket({
  callback,
  isLoading,
  text,
  id,
  addedButton,
}: AddTicketTypes) {
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
    await callback({ description: inputText, id })
    setOpen(false)
  }

  const enterText = (e: React.MouseEvent<HTMLElement>) => {
    setInputText(e.target.value)
  }

  return (
    <div>
      <TicketContext.Consumer>
        {({ tickets }) => (
          <React.Fragment>
            {addedButton(`${text} ticket`, handleOpen)}
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
                      <h2 id="modal-title">{`${text} ticket`} </h2>
                      <DescriptionInput enterText={enterText} value={id !== undefined ? tickets.find(ticket => ticket.id === id).description : ""}/>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={addedTicketAndClose}
                        disabled={id === undefined && !Boolean(inputText) }
                      >
                        {`${text} ticket`}
                      </Button>
                    </React.Fragment>
                  )}
                </div>
              </Fade>
            </Modal>
          </React.Fragment>
        )}
      </TicketContext.Consumer>
    </div>
  )
}
