const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const getJobs = async (uri, offset) => {
    const body = JSON.stringify({
        limit: 9,
        offset: offset,
    });
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body,
    };

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
