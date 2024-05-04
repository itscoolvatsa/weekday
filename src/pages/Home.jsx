import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import getJobs from "../requests/getJobs";

const Home = () => {
    const uri = "https://api.weekday.technology/adhoc/getSampleJdJSON";

    const [jobs, setJobs] = useState(null);

    console.log(getJobs(uri));

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
    return (
        <div>
            {jobs !== null &&
                jobs.map((job) => (
                    <Card
                        key={job.jdUid}
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
                ))}
            <Card />
        </div>
    );
};

export default Home;
