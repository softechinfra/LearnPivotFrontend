"use client"
import { useEffect, useState } from "react";
import { Container, Grid, Typography, TextField, RadioGroup, FormControlLabel, Radio, MenuItem, Fab, Alert, FormControl, InputLabel, Select } from '@mui/material/';
import { FcFeedback, FcApproval } from "react-icons/fc";
import Link from 'next/link';
import axios from "axios";
import SmallOneClass from "../Classes/SmallOneClass";

const BuyComponent = ({data}) => {
  const [enquiryFor, setEnquiryFor] = useState("self");
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState(null);
  const [loadingCity, setLoadingCity] = useState(false);
  const [state, setStateName] = useState(null);
  const [allCity, setAllCity] = useState([]);
  const [marketing, setMarketing] = useState("");
  const [message, setMsg] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    async function getZIPData() {
      if (zip.length === 5) {
        setLoadingCity(true);
        try {
          const res = await axios.get(`/api/public/zipToLocation?zipCode=${zip}`);
          setAllCity(res.data);
        } catch (error) {
          console.error(error);
          alert("Please enter a correct ZIP code.");
          setZip("");
          setCity(null);
          setAllCity([]);
          setStateName(null);
        } finally {
          setLoadingCity(false);
        }
      }
    }
    getZIPData();
  }, [zip]);

  const handleEnquiry = (e) => {
    e.preventDefault();
    const user = { enquiryFor, firstName, lastName, email, mobile, address, zip, city: city?.city, state, marketing, message };
    try {
      // Assuming this should be replaced with actual API call
      const res = { variant: "success" };
      if (res.variant === "success") {
        setSubmitted(true);
        setEnquiryFor("self");
        setFName("");
        setLName("");
        setEmail("");
        setMobile("");
        setAddress("");
        setZip("");
        setCity(null);
        setAllCity([]);
        setStateName(null);
        setMarketing("");
        setMsg("");
      } else {
        alert(res.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    }
  };

  const allMarketing = ["Web Search / Google", "Friend or colleague Recommendation", "Social Media", "Direct Mailer", "Family Member", "Email", "Blog or Publication"];

  return (
    <section className="enquiryBg" id="enquiry">
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} lg={6}>
          <SmallOneClass data ={data} selectedDates={selectedDates} setSelectedDates={setSelectedDates}/>
          </Grid>
          <Grid item xs={12} lg={6}>
            <form onSubmit={handleEnquiry} id="enquiryForm">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Alert icon={<FcApproval fontSize="inherit" />} severity="success">
                    Protecting your privacy: This website adheres to <a href="https://en.wikipedia.org/wiki/Health_Insurance_Portability_and_Accountability_Act" target="_blank"><strong>HIPAA compliance</strong> standards.</a>
                  </Alert>
                </Grid>
                {submitted ? (
                  <Grid item xs={12} className="center" sx={{ flexDirection: "column" }}>
                    <div id="thanks"/>
                    <Typography color="teal" sx={{ fontSize: { xs: "14px", md: "18px" } }}>Your message has been sent. We will get back to you very shortly.</Typography>
                    <br/>
                    <Fab variant="extended" size="medium" color="primary" onClick={() => setSubmitted(false)} aria-label="Thank">
                      <FcFeedback style={{ fontSize: 24, marginRight: 10 }} sx={{ mr: 1 }} />
                      New Enquiry?
                    </Fab>
                  </Grid>
                ) : (
                  <> 
                    <Grid item xs={12} id="self" className="center">
                      <Typography color="primary" variant="h5">Are you interested in &#x2192;</Typography>
                      <RadioGroup row style={{ marginLeft: 30 }} defaultValue="self" value={enquiryFor} onChange={e => setEnquiryFor(e.target.value)} name="radio-buttons-group">
                        <FormControlLabel value="self" control={<Radio />} label="Self" />
                        <FormControlLabel value="other" style={{ marginLeft: 20 }} control={<Radio />} label="Other" />
                      </RadioGroup>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth value={firstName} required onChange={e => setFName(e.target.value)} label="First Name" placeholder="First Name..." variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField fullWidth value={lastName} required onChange={e => setLName(e.target.value)} label="Last Name" placeholder="Last Name..." variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}> 
                      <TextField fullWidth value={email} required type="email" onChange={e => setEmail(e.target.value)} label="Email" placeholder="Enter your Email" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}> 
                      <TextField fullWidth value={mobile} required onChange={e => setMobile(e.target.value)} label="Phone" type="number" placeholder="Enter your Mobile No" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}> 
                      <TextField fullWidth value={age} onChange={e => setAge(e.target.value)} label="Age" type="number" placeholder="Enter your Age" variant="outlined" />
                    </Grid>
                    <Grid item xs={12} md={6}> 
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="Gender"
                          onChange={e => setGender(e.target.value)}
                        >
                          <MenuItem value={"male"}>Male</MenuItem>
                          <MenuItem value={"female"}>Female</MenuItem>
                          <MenuItem value={"other"}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} md={12}> 
                      <TextField fullWidth value={address} onChange={e => setAddress(e.target.value)} label="Address" placeholder="Enter your Address" variant="outlined" />
                    </Grid>
                    <Grid item xs={12}> 
                      <TextField fullWidth value={marketing} select onChange={e => setMarketing(e.target.value)} label="How did you hear about us?" placeholder="State" variant="outlined">
                        {allMarketing.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}> 
                      <Fab variant="extended" size="medium" color="primary" aria-label="add" type="submit">
                        <FcFeedback style={{ fontSize: 24, marginRight: 10 }} sx={{ mr: 1 }} />
                        Register Now
                      </Fab>
                    </Grid>
                  </>
                )}
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}

export default BuyComponent;
