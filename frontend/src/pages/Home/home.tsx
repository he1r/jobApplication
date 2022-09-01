import { useEffect, useState } from "react"
import SideBar from "@components/SideBar/SideBar"
import { redirectIfNotAuthorized } from "@utils/authorization"
import styles from "@styles/Home.module.scss"
import { useSelector } from "react-redux"
import { selectJobListings } from "@utils/redux/features/jobListings"
import { getAllUsers, getJobListings } from "@utils/requests"
import JobCard from "@components/JobCard/JobCard"
import { selectAllUsers } from "@utils/redux/features/users"

const Home = (props) => {
    const jobListings = useSelector(selectJobListings)
    const allUsers = useSelector(selectAllUsers)

    const [search, setSearch] = useState<string>("")
    const [filteredJobList, setFilteredJobList] = useState([])

    useEffect(() => {
        getJobListings(props.token)
        getAllUsers(props.token)
    }, [])

    useEffect(() => {
        if (jobListings) {
            const filtered = jobListings?.filter((el: any) => el.Job_Title.toLowerCase().includes(search.toLowerCase()) || el.Job_Category.toLowerCase().includes(search) || el.Job_Skill.toLowerCase().includes(search))
            setFilteredJobList(filtered)
        }
    }, [search, jobListings])

    return (
        <>
            {filteredJobList &&
                <div className={styles.container}>
                    <SideBar userId={props.id} token={props.token} role={props.role} />
                    <div className={styles.jobsBody}>
                        <div className={styles.job_search}>
                            <input onChange={(e) => setSearch(e.target.value)} placeholder={"Search"} className={styles.input_search} />
                        </div>
                        <div className={styles.posts}>
                            {filteredJobList?.map((jobList: any, index) =>
                                <JobCard token={props.token} listingId={jobList.id} isUserJobs={false} key={index} AllUsers={allUsers} userId={props.id} createdDate={jobList.Created_Date} jobCategory={jobList.Job_Category} jobDescription={jobList.Job_Description} jobPrice={jobList.Job_Price} jobSkill={jobList.Job_Skill} jobTittle={jobList.Job_Title} />
                            )}

                        </div>

                    </div>
                </div>
            }
        </>

    )
}

export default Home

export async function getServerSideProps({ req }) {
    return redirectIfNotAuthorized(req, "/Login/login")
}
