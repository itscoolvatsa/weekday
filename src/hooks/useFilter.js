import { rolesExpanded } from "../utils/roles";

const filterJobs = (
    jobs,
    selectedRoles,
    selectedNoOfEmployees,
    selectedExperience,
    selectedWorkLocation,
    selectedSalary
) => {
    return jobs.filter((job) => {
        // Filter by selected roles
        if (
            selectedRoles.length > 0 &&
            !selectedRoles.some(
                (role) =>
                    rolesExpanded[role]["cluster"].toLowerCase() ===
                        job.jobRole.toLowerCase() ||
                    (rolesExpanded[role]["secondaryCluster"] &&
                        rolesExpanded[role][
                            "secondaryCluster"
                        ].toLowerCase() === job.jobRole.toLowerCase())
            )
        ) {
            return false;
        }

        // Filter by selected work location
        if (
            selectedWorkLocation.length > 0 &&
            !selectedWorkLocation.some(
                (location) =>
                    location.toLowerCase() === job.location.toLowerCase()
            )
        ) {
            return false;
        }

        // Filter by selected salary
        if (
            selectedSalary.length > 0 &&
            !selectedSalary.some(
                (salary) =>
                    job.minJdSalary === null || job.minJdSalary >= salary
            )
        ) {
            return false;
        }

        // Filter by selected experience
        if (
            selectedExperience.length > 0 &&
            !selectedExperience.some(
                (experience) => job.minExp === null || job.minExp >= experience
            )
        ) {
            return false;
        }

        // Filter by selected number of employees N/A

        return true;
    });
};

export default filterJobs;
