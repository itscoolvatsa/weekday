const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({
    limit: 10,
    offset: 0,
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
};
// const uri = "https://api.weekday.technology/adhoc/getSampleJdJSON";

// fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));

const getJobs = async (uri) => {
    try {
        const response = await fetch(uri, requestOptions);
        const result = await response.json();
        return result["jdList"];
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error to be handled by the caller
    }
};

export default getJobs;
