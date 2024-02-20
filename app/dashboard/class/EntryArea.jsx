import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { TextField, Grid, ButtonGroup, Button, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FcLikePlaceholder, FcLike, FcExpand } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { prospectService, invoiceService } from "../../services";
import { todayDate } from "../../Components/StaticData";

const EntryArea = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [important, setImp] = useState(false);
    const [inquiryDate, setInquiryDate] = useState(todayDate());
    const [prospectStage, setProspectStage] = useState(null);
    const [prospectSource, setProspectSource] = useState(null);
    const [message, setMsg] = useState("");
    const [firstName, setFN] = useState("");
    const [PAccordion, setPAccordion] = useState(true);
    const allProspectStage = [{ label: "Casual Inquiry", id: "casualInquiry" }, { label: "Qualified", id: "qualified" }, { label: "Cold", id: "cold" }, { label: "Warm", id: "warm" }, { label: "Hot", id: "hot" }, { label: "Waiting List", id: "waitingList" }, { label: "Lost", id: "lost" }, { label: "Needs Assessment", id: "needsAssessment" }];
    const [allProspectSource, setAllPSource] = useState([]);

    useEffect(() => {
        async function getOneData() {
            try {
                let res = await prospectService.getOne(props.id);
                if (res.variant === "success") {
                    const { _id, important, inquiryDate, prospectStage, prospectSource, message, firstName } = res.data;
                    props.setId(_id);
                    setImp(important);
                    setInquiryDate(inquiryDate);
                    setProspectStage(prospectStage);
                    setProspectSource(prospectSource);
                    setMsg(message);
                    setFN(firstName);
                    setPAccordion(true);
                    snackRef.current.handleSnack(res);
                } else {
                    snackRef.current.handleSnack(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                snackRef.current.handleSnack({ message: "Failed to fetch data.", variant: "error" });
            }
        }
        if (props.id) {
            getOneData();
        }
    }, [props.id]);

    const handleClear = () => {
        props.setId("");
        setImp(false);
        setInquiryDate(todayDate());
        setProspectStage(null);
        setProspectSource(null);
        setMsg("");
        setFN("");
        setPAccordion(true);
    };

    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
            try {
                let prospectData = {
                    _id: props.id,
                    inquiryDate,
                    prospectStage,
                    prospectSource,
                    message,
                    firstName,
                    important
                };
                let response = await prospectService.add(props.id, prospectData);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                snackRef.current.handleSnack({ message: "Failed to submit data.", variant: "error" });
            }
        },
        handleClear: () => handleClear()
    }));

    useEffect(() => {
        async function getPSource() {
            try {
                let res = await invoiceService.getLedger(`api/v1/enquiry/prospectSource/getProspectSource/dropDown/getAll`);
                if (res.variant === "success") {
                    setAllPSource(res.data);
                } else {
                    snackRef.current.handleSnack(res);
                }
            } catch (error) {
                console.error("Error fetching prospect sources:", error);
                snackRef.current.handleSnack({ message: "Failed to fetch prospect sources.", variant: "error" });
            }
        }
        getPSource();
    }, []);

    const handleDelete = async () => {
        try {
            let yes = window.confirm(`Do you really want to permanently delete ${firstName}?`);
            if (yes) {
                let response = await prospectService.deleteLeave(`api/v1/enquiry/prospect/addProspect/deleteOne/${props.id}`);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            snackRef.current.handleSnack({ message: "Failed to delete data.", variant: "error" });
        }
    };

    return (
        <main style={{ background: "#fff", boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px", borderRadius: "10px", padding: 20 }}>
            <Grid sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
                <Typography color="secondary" style={{ fontFamily: 'Courgette' }} align='center' variant='h6'>Create Class</Typography>
                <ButtonGroup variant="text" aria-label="text button group">
                    <Button startIcon={important ? <FcLike /> : <FcLikePlaceholder />} onClick={() => setImp(!important)}>{important ? "Important" : "General"}</Button>
                    <Button endIcon={<MdDeleteForever />} onClick={handleDelete} disabled={!props.id} color="error">Delete</Button>
                </ButtonGroup>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} md={2}>
                    <TextField focused type='date' value={inquiryDate} onChange={(e) => setInquiryDate(e.target.value)} fullWidth label="Inquiry Date :" variant="standard" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allProspectStage}
                        value={prospectStage}
                        onChange={(e, v) => {
                            setProspectStage(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Prospect Stage" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        value={prospectSource}
                        onChange={(e, v) => {
                            setProspectSource(v);
                        }}
                        options={allProspectSource}
                        groupBy={(option) => option?.locationType}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option._id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Prospect Source" helperText="Master > Create Class Source" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Story" value={message} inputProps={{ maxLength: "4000" }} onChange={(e) => setMsg(e.target.value)} placeholder="Type something about the prospect. (If you wish)" fullWidth multiline rows={4} variant="outlined" />
                </Grid>
            </Grid>
            <Accordion expanded={PAccordion}>
                <AccordionSummary
                    expandIcon={<IconButton onClick={() => setPAccordion(!PAccordion)}> <FcExpand /> </IconButton>}
                    aria-controls="ProspectInformation"
                    id="ProspectInformation"
                >
                    <Typography>Prospect Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField fullWidth label="First Name" value={firstName} onChange={(e) => setFN(e.target.value)} inputProps={{ minLength: "2", maxLength: "30" }} placeholder='First Name' variant="standard" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <MySnackbar ref={snackRef} />
        </main>
    );
});

export default EntryArea;
