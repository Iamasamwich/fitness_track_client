import React, {useState, useEffect} from 'react';
import {DateInput} from 'semantic-ui-calendar-react';


const Test = () => {

  const d = new Date();
  const currDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();

  const [date, setDate] = useState(currDate);

  const handleDateChange = (e, {name, value}) => {
    const newDate = value.split('-');
    setDate(newDate[2] + '-' + newDate[1] + '-' + newDate[0]);
  }

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <form>
      <DateInput
        name="date"
        placeholder="Date"
        value={date}
        autoComplete="off"
        onChange={handleDateChange}
      />
    </form>
  )
}

export default Test;