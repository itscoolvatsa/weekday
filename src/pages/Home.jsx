import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Card from "../components/Card";
import { MultiSelectAutocomplete } from "../components/Dropdown";
import filterJobs from "../hooks/useFilter";
import getJobs from "../requests/getJobs";
import { experience, noOfEmployees, salary } from "../utils/employees";
import { roles, workLocaltion } from "../utils/roles";

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
            selectedSalary
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
    ]);

    const renderCards = () => (
        <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            maxWidth="1920px"
            margin="0 auto"
        >
            {filteredJobs.map((job) => (
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
            </Box>

            {renderCards()}

            <div ref={pageRef}></div>

            {loading && <div>Loading...</div>}
        </div>
    );
};

export default Home;
