import React from "react";
import { Bolt, HourglassBottom } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

const data =
    "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text butsomething which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.";
const Card = () => {
    return (
        <Box
            sx={{
                padding: "10px 15px",
                border: "1px solid grey",
                width: "360px",
                borderRadius: 2,
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
                    src="https://logo.clearbit.com/dropbox.com"
                    alt="logo"
                />
                <Box>
                    <Typography sx={{ color: "#8B8B8B" }}>fampay</Typography>
                    <Typography>Backend Engineer</Typography>
                    <Typography>Bangalore</Typography>
                </Box>
            </Box>
            <p>Estimated Salary: 18 - 35LPA</p>
            <Typography>About Company:</Typography>
            <Typography>About us</Typography>
            <Box style={{ position: "relative" }}>
                <Box style={{ position: "relative" }}>
                    <Typography>
                        {data.length <= 250
                            ? data
                            : data.substr(0, 250) + "..."}
                    </Typography>
                    <Box
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            bottom: "-25px",
                            height: "160px",
                            background:
                                "linear-gradient(to bottom, transparent, white)", // Gradient from transparent to white
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
            <Box sx={{ color: "#666666" }}>2 years</Box>
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
