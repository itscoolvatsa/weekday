const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const body = JSON.stringify({
    limit: 9,
    offset: 0,
});

const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body,
};
const getJobs = async (uri) => {
    try {
        const response = await fetch(uri, requestOptions);
        const result = await response.json();
        return result["jdList"];
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export default getJobs;
