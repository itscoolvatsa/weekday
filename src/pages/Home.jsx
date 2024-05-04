import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import getJobs from "../requests/getJobs";

const Home = () => {
    const uri = "https://api.weekday.technology/adhoc/getSampleJdJSON";

    const [jobs, setJobs] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs(uri);
                setJobs(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const renderCards = () => {
        if (!jobs) return null;
        return jobs.map((job) => (
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
        ));
    };

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
            {renderCards()}
        </div>
    );
};

export default Home;
