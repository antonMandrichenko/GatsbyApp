import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

type CompletedTicketTypes = {
    setCompleted: Function
    id: number
    completed: boolean
}

export default function CompletedTicket({setCompleted, id, completed}: CompletedTicketTypes) {
  const [value, setValue] = React.useState(completed);

  const handleChange = e => {
    setValue(e.target.checked);
    setCompleted({completed:e.target.checked, ticketId: id })
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={value}
            onChange={handleChange}
            color="primary"
          />
        }
        label="Completed"
      />
    </FormGroup>
  );
}
