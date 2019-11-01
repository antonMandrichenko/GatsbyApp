import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { usersTypes } from "../context/TicketContext"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 600,
  },
}))

type SelectAssignTypes = {
  assignedId: number | null
  users: Array<usersTypes>
  assignUser: Function
}

export default function SelectAssign({
  assignedId,
  users,
  assignUser,
}: SelectAssignTypes) {
  const classes = useStyles()
  const assignedUser = users.filter(user => user.id === assignedId)[0]
  console.log(assignedUser)
  const [personName, setPersonName] = React.useState(
    assignedUser ? assignedUser.name : ""
  )

  const handleChange = (e: React.MouseEvent<HTMLElement>) => {
    setPersonName(e.target.value)
    assignUser(e.target.value)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-label">Assign User</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={personName}
          onChange={e => {
            handleChange(e)
          }}
        >
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
          <MenuItem value="">None</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
