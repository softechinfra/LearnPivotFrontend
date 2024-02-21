import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { TextField, Grid, ButtonGroup, Button, Typography, Accordion, AccordionSummary, AccordionDetails, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { FcLikePlaceholder, FcLike, FcExpand } from "react-icons/fc";
import { MdDeleteForever } from "react-icons/md";
import MySnackbar from "../../Components/MySnackbar/MySnackbar";
import { myClassService } from "../../services";
import { todayDate } from "../../Components/StaticData";
import { useImgUpload } from "@/app/hooks/auth/useImgUpload";

const EntryArea = forwardRef((props, ref) => {
    const snackRef = useRef();
    const [important, setImp] = useState(false);
    const [startDate, setStartDate] = useState(todayDate());
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [classTitle, setClassTitle] = useState("");
    const [classLink, setClassLink] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [courseClass, setCourseClass] = useState(null);
    const [courseType, setCourseType] = useState(null);
    const [duration, setDuration] = useState(null);
    const [fullDescription, setFullDescription] = useState("");
    const [url, setDocUrl] = useState("");

    const [PAccordion, setPAccordion] = useState(true);
    const allClass = [
        { label: "4", id: "4" },
         { label: "5", id: "5" },
        ];
    const allCourseType = [
        { label: "Full Course", id: "fullCourse" },
         { label: "Crash Course", id: "crashCourse" },
        ];
    const allDuration = [
        { label: "3 Months", id: "3months" },
         { label: "6 Months", id: "6months" },
         { label: "1 Years", id: "1years" },
        ];
    
    const [loadingDoc, setLoadingDoc] = useState(false);
    function convertToSlug(text) {
        return text.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      }
    const onTitleChange = (e) => {
        setClassTitle(e)
        let link = convertToSlug(e)
        setClassLink(link)
    }
  
    useEffect(() => {
        async function getOneData() {
            try {
                let res = await myClassService.getOne(props.id);
                if (res.variant === "success") {
                    const { _id, important, startDate, myClassStage, myClassSource, fullDescription, classTitle } = res.data;
                    props.setId(_id);
                    setImp(important);
                    setStartDate(startDate);               
                    setFullDescription(fullDescription);
                    setClassTitle(classTitle);
                    setPAccordion(true);
                    snackRef.current.handleSnack(res);
                } else {
                    snackRef.current.handleSnack(res);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                snackRef.current.handleSnack({ fullDescription: "Failed to fetch data.", variant: "error" });
            }
        }
        if (props.id) {
            getOneData();
        }
    }, [props.id]);

    const handleClear = () => {
        props.setId("");
        setImp(false);
        setStartDate(todayDate());
        setStartTime("");
        setEndTime("");
        setClassTitle("");
        setClassLink("");
        setShortDescription("");
        setCourseClass(null);
        setCourseType(null);
        setDuration(null);
        setFullDescription("");
        setDocUrl(d ? d?.url : "");
        setPAccordion(true);
    };
    

    useImperativeHandle(ref, () => ({
        handleSubmit: async () => {
            try {
                let myClassData = {
                    _id: props.id,
                    startDate,
                    endDate,
                    startTime,
                    endTime,
                    classTitle,
                    classLink,
                    shortDescription,
                    courseClass,
                    courseType,
                    duration,
                    fullDescription,
                    url,
                    important
                };
                let response = await myClassService.add(props.id, myClassData);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            } catch (error) {
                console.error("Error submitting data:", error);
                snackRef.current.handleSnack({ fullDescription: "Failed to submit data.", variant: "error" });
            }
        },
        handleClear: () => handleClear()
    }));
    const imgUpload  = async (e) => {
        setLoadingDoc(true);
        let url = await useImgUpload(e);
        if (url) {
          setDocUrl(url);
          setLoadingDoc(false);
        } else {
          snackRef.current.handleSnack({
            message: "Image Not Selected",
            info: "warning",
          });
          setLoadingDoc(false);
        }
      };


    const handleDelete = async () => {
        try {
            let yes = window.confirm(`Do you really want to permanently delete ${classTitle}?`);
            if (yes) {
                let response = await myClassService.deleteLeave(`api/v1/enquiry/myClass/addProspect/deleteOne/${props.id}`);
                if (response.variant === "success") {
                    snackRef.current.handleSnack(response);
                    handleClear();
                } else {
                    snackRef.current.handleSnack(response?.response?.data);
                }
            }
        } catch (error) {
            console.error("Error deleting data:", error);
            snackRef.current.handleSnack({ fullDescription: "Failed to delete data.", variant: "error" });
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
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Class Title" value={classTitle} onChange={(e) => onTitleChange(e.target.value)} inputProps={{ minLength: "2", maxLength: "30" }} placeholder='Class Title' variant="standard" />
                    <p><bold>Link- </bold> {classLink}</p>
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField focused type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} fullWidth label="Start Date :" variant="standard" />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField focused type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} fullWidth label="Start Time :" variant="standard" />
                </Grid>
                <Grid item xs={12} md={2}>
                    <TextField focused type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} fullWidth label="End Time :" variant="standard" />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField fullWidth label="Short Description" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} inputProps={{ minLength: "2", maxLength: "100" }} placeholder='Short Description' variant="standard" />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allClass}
                        value={courseClass}
                        onChange={(e, v) => {
                            setCourseClass(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Class" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allCourseType}
                        value={courseType}
                        onChange={(e, v) => {
                            setCourseType(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Course Type" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.id === value?.id}
                        options={allDuration}
                        value={duration}
                        onChange={(e, v) => {
                            setDuration(v);
                        }}
                        renderOption={(props, option) => {
                            return (
                                <li {...props} key={option.id}>
                                    {option.label}
                                </li>
                            );
                        }}
                        renderInput={(params) => <TextField {...params} label="Duration" variant="standard" />}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Document (If Any)"
                        size="small"
                        disabled={loadingDoc}
                        helperText="Only Image Files are allowed"
                        inputProps={{ accept: "image/*" }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="start">
                                    {loadingDoc && <CircularProgress size={25} />}{" "}
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => imgUpload(e.target.files[0])}
                        type="file"
                        focused
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Accordion expanded={PAccordion}>
                <AccordionSummary
                    expandIcon={<IconButton onClick={() => setPAccordion(!PAccordion)}> <FcExpand /> </IconButton>}
                    aria-controls="ProspectInformation"
                    id="ProspectInformation"
                >
                    <Typography>Additional Optional Information</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Full Description" value={fullDescription} inputProps={{ maxLength: "4000" }} onChange={(e) => setFullDescription(e.target.value)} placeholder="Write the Long Description about the classes" fullWidth multiline rows={4} variant="outlined" />
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
            <MySnackbar ref={snackRef} />
        </main>
    );
});

export default EntryArea;
