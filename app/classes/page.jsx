"use client";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header1/Header";
import "./classes.css";
import { Container, Typography, Grid, Breadcrumbs, Divider, Tabs, Tab, TablePagination } from "@mui/material";
import Footer from "../Components/Footer/Footer";
import { useRouter } from "next/navigation";
import Enquiry from "@/app/Components/Enquiry/Enquiry";
import OneClass from "../Components/PublicPage/Classes/OneClass";
import FilterComponent from "../Components/PublicPage/Classes/FilterComponent"; 
import FilterDialog from "../Components/PublicPage/Classes/FilterDialog"; 
import { Dialog, useMediaQuery, useTheme, Button, DialogActions, DialogContent } from "@mui/material";
import Slide from '@mui/material/Slide';
import { myClassService } from "../services";

function Events() {
  const [events] = useState([
    
        {
          _id: "541564515545451",
          title: "Mastering English Grammar",
          timing: "February 21, 2024 @ 10:00AM to 12 Noon",
          description: "Join our comprehensive session on mastering English grammar rules and usage.",
          img: "https://img.freepik.com/free-vector/flat-design-english-school-background_23-2149485957.jpg?w=900&t=st=1706446104~exp=1706446704~hmac=1793f247f123d53401121af165d35788ac318e724b2ed7485971e8e773ae2044",
          tags:[
            { name: "Class", value: "4", type: "class" },
            { name: "Type", value: "Full Course", type: "type" },
            { name: "Duration", value: "3 Month", type: "duration" },
          ]
        },
        {
          _id: "54156453456431",
          title: "Fundamental Mathmatics",
          timing: "March 01, 2024 @ 11:00AM to 12 Noon",
          description: "Join our comprehensive session on mastering English grammar rules and usage.",
          img: "https://lawshule.co.ke/wp-content/uploads/2022/08/mathematics-word-illustration-stem-science-technology-engineering-education-concept-typography-design-kid-87906806.jpg",
          tags:[
            { name: "Class", value: "5", type: "class" },
            { name: "Type", value: "Full Course", type: "type" },
            { name: "Duration", value: "1 Year", type: "duration" },
          ]
        },
     
  ]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [sortBy, setSort]= useState("newToOld");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [totalCount,setTotalCount] = useState(0)
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function fetchAllData() {
      setLoading(true)
      let response = await myClassService.publicGetAll(
        {sortBy,page,rowsPerPage,searchText,totalCount}
        );
     console.log(response)
      if(response.variant === "success"){
        setLoading(false)
        setRows(response.data)
        setTotalCount(response.totalCount)
      }else {console.log(response); setLoading(false)}
    }
    fetchAllData()
  }, [rowsPerPage,page,searchText,sortBy])

  return (
    <main style={{ backgroundColor: "#fff" }}>
      <Header />

      <br />
      <Container>
        <Grid container spacing={3}>
        {fullScreen? (
       
        <FilterDialog />
     
      ):(
        <Grid item xs={2}>
        <FilterComponent />
      </Grid>
      )}
          <Grid item xs={fullScreen ? 12 : 10}>
            {rows &&
              rows.map((p, j) => (
                <OneClass data={p} key={p._id} />
              ))}
          </Grid>

        </Grid>
        <TablePagination
                rowsPerPageOptions={[5,10,15,100]}
                component="div"
                count={totalCount}
                sx={{overflowX:"hidden"}}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(e,v)=>setPage(v)}
                onRowsPerPageChange={e=>{
                  setRowsPerPage(parseInt(e.target.value, 10));
                  setPage(0)
                }}
              />
      </Container>
      <Enquiry />
      <Footer />
    </main>
  );
}

export default Events;
