import React, { useEffect, useState, useRef } from "react";
import Card from "../components/Card";
import getJobs from "../requests/getJobs";
import { Box, MenuItem, TextField } from "@mui/material";
import { roles } from "../utils/roles";
import Dropdown from "../components/Dropdown";

const Home = () => {
    const uri = "https://api.weekday.technology/adhoc/getSampleJdJSON";

    const [jobs, setJobs] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getJobs(uri, offset);
                setOffset((o) => o + 10);
                setJobs(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const pgRef = pageRef.current;
        const handleIntersect = (entries) => {
            if (entries[0].isIntersecting) {
                loadMoreData();
            }
        };

        const loadMoreData = async () => {
            if (!loading) {
                try {
                    setLoading(true);
                    const data = await getJobs(uri, offset);
                    setOffset((o) => o + 10);
                    setJobs((prevJobs) => [...prevJobs, ...data]);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching data:", error);
                    setLoading(false);
                }
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });

        if (pgRef) {
            observer.observe(pgRef);
        }

        return () => {
            if (pgRef) {
                observer.unobserve(pgRef);
            }
        };
    }, [loading, offset]);

    const renderCards = () => (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            maxWidth="1920px"
            margin="0 auto"
        >
            {jobs.map((job) => (
                <div
                    key={job.jdUid}
                    style={{
                        flex: "0 0 calc(33.33% - 20px)",
                        marginBottom: "20px",
                    }}
                >
                    <Card
                        companyName={job.companyName}
                        jdLink={job.jdLink}
                        jdUid={job.jdUid}
                        jobDetailsFromCompany={job.jobDetailsFromCompany}
                        jobRole={job.jobRole}
                        location={job.location}
                        logoUrl={job.logoUrl}
                        maxExp={job.maxExp}
                        maxJdSalary={job.maxJdSalary}
                        minExp={job.minExp}
                        minJdSalary={job.minJdSalary}
                        salaryCurrencyCode={job.salaryCurrencyCode}
                    />
                </div>
            ))}
        </Box>
    );

    return (
        <div
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                maxWidth: "1920px",
                margin: "0 auto",
            }}
        >
            {/* <TextField
                select
                label="Select"
                defaultValue="Roles"
                // helperText="Roles"
                variant="outlined"
                placeholder="Roles"
                sx={{ m: 1, width: "250px" }}
            >
                {roles.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField> */}
            <Dropdown data={roles} defaultValue="roles" />

            {renderCards()}
            <div ref={pageRef}></div>
            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Home;
