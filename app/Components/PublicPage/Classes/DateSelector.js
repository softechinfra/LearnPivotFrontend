import React, { useState } from "react";
import { Divider, Grid, Typography, Chip, Button, TextField } from "@mui/material";
const DateSelector = ({ data }) => {

    let [startDate, setStartDate] = useState()
  return (
    <Grid container key={data._id} spacing={4}>
      <Grid item xs={12} md={4}>
      <TextField focused type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth label="Start Time :" variant="standard" />
       
      </Grid>
    
      <Grid item xs={12}>
        <Divider sx={{ marginTop: "-20px", marginBottom:"15px" }} />
      </Grid>
    </Grid>
  );
};

export default DateSelector;
