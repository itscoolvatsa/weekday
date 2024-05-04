const capitalize = (str) => {
    if (str === null || str === undefined) {
        return "";
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
};

export default capitalize;
