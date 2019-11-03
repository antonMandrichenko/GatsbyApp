import React, { useContext } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Portal from "@material-ui/core/Portal"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"
import AppContext from "../context/AppContext"

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
  },
  alert: {
    padding: theme.spacing(1),
    margin: theme.spacing(1, 0),
    border: "1px solid",
  },
}))

const AddTicket: React.FC = () => {
  const classes = useStyles()
  const [show, setShow] = React.useState(false)
  const [disable, setDisable] = React.useState(false)
  const [description, setText] = React.useState("")
  const container = React.useRef(null)
  const { addedTicketToList, loadingData } = useContext(AppContext)

  const handleClick = () => {
    setShow(!show)
    setDisable(!disable)
  }

  const closeMenu = (description: string) => {
    setShow(false)
    setDisable(false)
    if (description) {
      addedTicketToList({ description })
    }
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        fullWidth
        onClick={handleClick}
        disabled={disable || loadingData}
        data-testid="button-first"
      >
        Create list item
      </Button>
      {show ? (
        <Portal container={container.current}>
          <TextField
            id="standard-disabled"
            label="Description"
            onChange={(e: React.ChangeEvent<Element>) => {
              setText(e.target.value)
            }}
            data-testid="text"
            
          />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            fullWidth
            onClick={() => {
              closeMenu(description)
            }}
            data-testid="button-second"
          >
            {!description ? "Close" : "Add item to list"}
          </Button>
        </Portal>
      ) : null}
      <div className={classes.alert} ref={container} />
    </div>
  )
}

export default AddTicket
