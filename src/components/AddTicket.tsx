import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Portal from "@material-ui/core/Portal"
import Button from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

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

export default function AddTicket() {
  const classes = useStyles()
  const [show, setShow] = React.useState(false)
  const [disable, setDisable] = React.useState(false)
  const container = React.useRef(null)

  const handleClick = () => {
    setShow(!show)
    setDisable(!disable)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        fullWidth
        onClick={handleClick}
        disabled={disable}
      >
        Create list item
      </Button>
      {show ? (
        <Portal container={container.current}>
          <TextField id="standard-disabled" label="Description" />
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            fullWidth
            onClick={handleClick}
          >
            Add item to list
          </Button>
        </Portal>
      ) : null}
      <div className={classes.alert} ref={container} />
    </div>
  )
}
