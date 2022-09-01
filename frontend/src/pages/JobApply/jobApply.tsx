import { useEffect, useState } from "react";
import { redirectIfNotAuthorized } from "@utils/authorization";
import styles from "@styles/JobApply.module.scss";
import { FiArrowLeftCircle } from "react-icons/fi";
import { IconContext } from "react-icons";
import { useRouter } from "next/router";
import { Paths } from "@utils/enums";
import { useSelector } from "react-redux";
import { selectJobListings } from "@utils/redux/features/jobListings";
import { addJobApplication } from "@utils/requests";
import { toast } from "react-toastify";

const JobApply = (props: any) => {
    const router = useRouter()
    const jobId = router.query.jobId as string;
    const jobListings = useSelector(selectJobListings)
    const [jobListing, setJobListing] = useState<any>({})
    const [applyReason, setApplyReason] = useState<string>("")
    const [applyReasonValidation, setApplyReasonValidation] = useState<string>("")

    useEffect(() => {
        const jobListing = jobListings.filter((jobList: any) => jobList.id == jobId)[0]
        setJobListing(jobListing)
    }, [jobId])

    const handleOnBackClick = () => {
        router.replace(Paths.Home)
    }

    const handleApplyButton = () => {

        if (applyReason === "") {
            setApplyReasonValidation("This field must not be empty!")
        } else {
            setApplyReasonValidation("")
        }
        addJobApplication(props.id, jobListing.id, applyReason, props.token).then((res: any) => {
            if (res.status === 200) {
                toast.success("Your application for this job was successfully submitted!")
            } else if (res.status === 404) {
                toast.error(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <IconContext.Provider value={{ size: "3em" }}>
                        <div className={styles.jobGoBack}>
                            <FiArrowLeftCircle onClick={handleOnBackClick} color={"black"} />
                        </div>
                    </IconContext.Provider>
                </div>
                <div className={styles.jobHeader}>
                    {(jobListing?.Job_Title)?.toLocaleUpperCase()}
                </div>
                <div className={styles.descriptionLabel}>
                    <div className={styles.jobDescription_label}>
                        {"Job Description: "}
                    </div>
                </div>
                <div className={styles.jobDescription}>
                    {jobListing.Job_Description}
                </div>
                <div className={styles.row_div}>
                    <div className={styles.column_div}>
                        <div className={styles.jobDescription_label}>
                            {"Job Category"}
                        </div>
                        <div className={styles.job_data_div}>
                            {jobListing.Job_Category}
                        </div>
                    </div>
                    <div className={styles.column_div}>
                        <div className={styles.jobDescription_label}>
                            {"Job Skill"}
                        </div>
                        <div className={styles.job_data_div}>
                            {jobListing.Job_Skill}
                        </div>
                    </div>
                    <div className={styles.column_div}>
                        <div className={styles.jobDescription_label}>
                            {"Job Price"}
                        </div>
                        <div className={styles.job_data_div}>
                            {jobListing.Job_Price}{"$"}
                        </div>
                    </div>
                </div>
                <div className={styles.reason_div}>
                    <div className={styles.jobDescription_label}>
                        {"Why are you applying for this job?"}
                    </div>
                    <div className={styles.input_div}>
                        <textarea onChange={(e) => { setApplyReason(e.target.value) }} maxLength={250} rows={4} cols={50} className={styles.apply_reason_input}></textarea>
                        <div className={styles.span_div}>
                            <span className={styles.error_span}>{applyReasonValidation}</span>
                        </div>
                    </div>
                </div>
                <div className={styles.apply_button_div}>
                    <button onClick={handleApplyButton} className={styles.apply_button}>Apply</button>
                </div>
            </div>

        </>
    )

}

export default JobApply

export async function getServerSideProps({ req }) {
    return redirectIfNotAuthorized(req, "/Login/login")
}
