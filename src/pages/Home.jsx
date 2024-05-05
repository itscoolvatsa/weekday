import { Box, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { MultiSelectAutocomplete } from "../components/Dropdown";
import filterJobs from "../hooks/useFilter";
import getJobs from "../requests/getJobs";
import { experience, noOfEmployees, salary } from "../utils/employees";
import { roles, workLocaltion } from "../utils/roles";
import "./home.css";

const Home = () => {
    const uri = "https://api.weekday.technology/adhoc/getSampleJdJSON";

    // jobs state
    const [jobs, setJobs] = useState([]);
    // offset to control the data loading as per the scroll
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filteredJobs, setFilteredJobs] = useState([]);

    const pageRef = useRef(null);

    // states for dropdown for filtering data
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedNoOfEmployees, setSelectedNoOfEmployees] = useState([]);
    const [selectedExperience, setSelectedExperience] = useState([]);
    const [selectedWorkLocation, setSelectedWorkLocation] = useState([]);
    const [selectedSalary, setSelectedSalary] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState("");

    // Handlers for dropdown changes
    const handleRolesChange = (data) => {
        setSelectedRoles(data);
    };

    const handleNoOfEmployeesChange = (data) => {
        setSelectedNoOfEmployees(data);
    };

    const handleExperienceChange = (data) => {
        setSelectedExperience(data);
    };

    const handleWorkLocationChange = (data) => {
        setSelectedWorkLocation(data);
    };

    const handleSalaryChange = (data) => {
        setSelectedSalary(data);
    };

    const handleCompanyChange = (data) => {
        setSelectedCompany(data);
    };

    useEffect(() => {
        let pgref = pageRef.current;

        const handleIntersect = (entries) => {
            if (entries[0].isIntersecting && !loading) {
                loadMoreData();
            }
        };

        const loadMoreData = async () => {
            try {
                setLoading(true);
                const data = await getJobs(uri, offset);
                setOffset((prevOffset) => prevOffset + 9); // Increment offset
                setJobs((prevJobs) => [...prevJobs, ...data]);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        });

        if (pgref) {
            observer.observe(pgref);
        }

        return () => {
            if (pgref) {
                observer.unobserve(pgref);
            }
        };
    }, [loading, offset]);

    useEffect(() => {
        // Filter the loaded jobs based on the applied filters
        const filtered = filterJobs(
            jobs,
            selectedRoles,
            selectedNoOfEmployees,
            selectedExperience,
            selectedWorkLocation,
            selectedSalary,
            selectedCompany
        );

        // Set the filtered jobs state
        setFilteredJobs(filtered);
    }, [
        jobs,
        selectedRoles,
        selectedNoOfEmployees,
        selectedExperience,
        selectedWorkLocation,
        selectedSalary,
        selectedCompany,
    ]);

    const renderCards = () => (
        <Box className="card__container">
            {filteredJobs.map((job) => (
                <div key={job.jdUid} className="card__wrapper">
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
        <Box className="container">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <MultiSelectAutocomplete
                    data={roles}
                    defaultValue="roles"
                    onSelectedDataChange={handleRolesChange}
                />
                <MultiSelectAutocomplete
                    data={noOfEmployees}
                    defaultValue="Number Of Employees"
                    onSelectedDataChange={handleNoOfEmployeesChange}
                />
                <MultiSelectAutocomplete
                    data={experience}
                    defaultValue="Experience"
                    onSelectedDataChange={handleExperienceChange}
                />
                <MultiSelectAutocomplete
                    data={workLocaltion}
                    defaultValue="Remote"
                    onSelectedDataChange={handleWorkLocationChange}
                />
                <MultiSelectAutocomplete
                    data={salary}
                    defaultValue="Minimum Base Pay Salary"
                    onSelectedDataChange={handleSalaryChange}
                />
                <TextField
                    label="Company"
                    variant="outlined"
                    sx={{ m: 1, width: "250px" }}
                    onChange={(e) => {
                        handleCompanyChange(e.target.value);
                    }}
                />
            </Box>

            {renderCards()}

            <div ref={pageRef}></div>

            {loading && <p>Loading...</p>}
        </Box>
    );
};

export default Home;
