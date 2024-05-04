import React from "react";
import { Bolt, HourglassBottom } from "@mui/icons-material";
import { Box, Button, Link, Typography } from "@mui/material";
import capitalize from "../utils/stringUtils";

const Card = ({
    companyName,
    jdLink,
    jobDetailsFromCompany,
    jobRole,
    location,
    logoUrl,
    maxExp,
    maxJdSalary,
    minExp,
    minJdSalary,
    salaryCurrencyCode,
}) => {
    return (
        <Box
            sx={{
                padding: "10px 15px",
                border: "1px solid grey",
                width: "360px",
                borderRadius: 2,
                margin: "10px",
            }}
        >
            <Box
                component="section"
                sx={{
                    width: 200,
                    border: "1px solid grey",
                    textAlign: "center",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <HourglassBottom /> {"posted 10 days ago"}
            </Box>
            <Box sx={{ display: "flex", marginTop: "20px" }}>
                <Box
                    component="img"
                    sx={{
                        height: 80,
                        width: 60,
                        marginRight: "10px",
                    }}
                    src={`${logoUrl}`}
                    alt="logo"
                />
                <Box>
                    <Typography sx={{ color: "#8B8B8B" }}>
                        {companyName}
                    </Typography>
                    <Typography>{capitalize(jobRole)}</Typography>
                    <Typography>{capitalize(location)}</Typography>
                </Box>
            </Box>
            <p>{`Estimated Salary: ${salaryCurrencyCode} ${
                minJdSalary === null ? "not available" : minJdSalary
            } - ${
                maxJdSalary === null ? "not available" : maxJdSalary
            } KPA`}</p>
            <Typography>About Company:</Typography>
            <Typography>About us</Typography>
            <Box style={{ position: "relative" }}>
                <Box style={{ position: "relative" }}>
                    <Typography>
                        {jobDetailsFromCompany?.length <= 250
                            ? jobDetailsFromCompany
                            : (jobDetailsFromCompany?.substring(0, 250) || "") +
                              "..."}
                    </Typography>
                    <Box
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: "-25px",
                            height: "160px",
                            background:
                                "linear-gradient(to bottom, transparent, white)",
                        }}
                    />
                </Box>
                <Button
                    sx={{
                        width: "100%",
                        textAlign: "center",
                        marginTop: "-8px",
                        "&:hover": {
                            backgroundColor: "transparent",
                            opacity: "0.8",
                        },
                    }}
                >
                    View Job
                </Button>
            </Box>

            <Box sx={{ color: "#8B8B8B" }}>Minimum Experience</Box>
            <Box sx={{ color: "#666666" }}>
                {minExp === null ? "not available" : minExp} years
            </Box>
            <Button
                variant="solid"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    background: "#54EFC3",
                    marginTop: "10px",
                    "&:hover": {
                        backgroundColor: "#54EFC3",
                    },
                }}
                component={Link}
                to={jdLink}
            >
                <Bolt sx={{ color: "yellow" }} />
                Easy Apply
            </Button>
            <Button
                variant="solid"
                sx={{
                    width: "100%",
                    marginTop: "10px",
                    color: "#ffffff",
                    background: "#4943DA",
                    "&:hover": {
                        backgroundColor: "#4943DA",
                    },
                }}
            >
                Unlock referral asks
            </Button>
        </Box>
    );
};

export default Card;
