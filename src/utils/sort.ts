import {ticketsTypes} from "../context/TicketContext"
export const sortArrayByNameUp = (a:ticketsTypes , b: ticketsTypes) => {
    console.log(a, b)
    if (a.description > b.description) {
      return 1;
    }
    if (a.description < b.description) {
      return -1;
    }
    return 0;
  };

  export const sortArrayByNameDown = (a:ticketsTypes , b: ticketsTypes) => {
    if (a.description < b.description) {
      return 1;
    }
    if (a.description > b.description) {
      return -1;
    }
    return 0;
  };

  