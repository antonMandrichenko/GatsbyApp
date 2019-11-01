import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import InputLabel from "@material-ui/core/InputLabel"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"
import Select from "@material-ui/core/Select"
import { sortArrayByNameUp, sortArrayByNameDown } from "../utils/sort"

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

type SortByTypes = {
  sortBy: Function
}

export default function SortBy({ sortBy }: SortByTypes) {
  const classes = useStyles()
  const [value, setValue] = React.useState("")

  const handleChange = event => {
    setValue(event.target.value)
    sortBy(event.target.value === 10 ? sortArrayByNameUp : sortArrayByNameDown)
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-label">Sort by:</InputLabel>
        <Select
          labelId="select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={10}>Alfabetically up</MenuItem>
          <MenuItem value={20}>Alfabetically dowm</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
