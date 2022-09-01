import { useEffect, useState } from "react"
import { redirectIfNotAuthorized } from "@utils/authorization"
import { selectUserJobListings } from "@utils/redux/features/userJobListings"
import { selectAllUsers } from "@utils/redux/features/users"
import { getAllUsers, getUserJobListings } from "@utils/requests"
import { useSelector } from "react-redux"
import JobCard from "@components/JobCard/JobCard"
import SideBar from "@components/SideBar/SideBar"
import styles from "@styles/Home.module.scss";

const JobListings = (props) => {

    const userJobListings = useSelector(selectUserJobListings)
    const allUsers = useSelector(selectAllUsers)

    const [search, setSearch] = useState<string>("")
    const [filteredJobList, setFilteredJobList] = useState([])

    useEffect(() => {
        getUserJobListings(props.id, props.token)
        getAllUsers(props.token)
    }, [])

    useEffect(() => {
        if (userJobListings) {
            const filtered = userJobListings?.filter((el: any) => el.Job_Title.toLowerCase().includes(search.toLowerCase()) || el.Job_Category.toLowerCase().includes(search) || el.Job_Skill.toLowerCase().includes(search))
            setFilteredJobList(filtered)
        }
    }, [search, userJobListings])

    return (
        <>
            {userJobListings &&
                <div className={styles.container}>
                    <SideBar userId={props.id} token={props.token} role={props.role} />
                    <div className={styles.jobsBody}>
                        <div className={styles.job_search}>
                            <input onChange={(e) => setSearch(e.target.value)} placeholder={"Search"} className={styles.input_search} />
                        </div>
                        <div className={styles.posts}>
                            {filteredJobList?.map((jobList: any, index) =>
                                <JobCard listingId={jobList.id} token={props.token} isUserJobs={true} key={index} AllUsers={allUsers} userId={jobList.user_id} createdDate={jobList.Created_Date} jobCategory={jobList.Job_Category} jobDescription={jobList.Job_Description} jobPrice={jobList.Job_Price} jobSkill={jobList.Job_Skill} jobTittle={jobList.Job_Title} />
                            )}
                        </div>

                    </div>
                </div>
            }
        </>
    )
}
export default JobListings

export async function getServerSideProps({ req }) {
    return redirectIfNotAuthorized(req, "/Login/login")
}
