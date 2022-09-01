import { useState } from "react"
import { redirectIfNotAuthorized } from "@utils/authorization"
import { NextPage } from "next"
import Head from "next/head"
import SideBar from "@components/SideBar/SideBar"
import styles from "@styles/CreateJob.module.scss"
import { createJobListing, getJobListings, getUserJobListings } from "@utils/requests"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from "@components/Dropdown/Dropdown"

const CreateJob: NextPage = (props: any) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [jobCategory, setJobCategory] = useState<string>("")
    const [jobTittle, setJobTittle] = useState<string>("")
    const [jobDescription, setJobDescription] = useState<string>("")
    const [requiredSkill, setRequiredSkill] = useState<string>("")
    const [price, setPrice] = useState<string>("")
    const [jobTittleValidation, setJobTittleValidation] = useState<string>("")
    const [jobDescriptionValidation, setJobDescriptionValidation] = useState<string>("")
    const [requiredSkillValidation, setRequiredSkillValidation] = useState<string>("")
    const [priceValidation, setPriceValidation] = useState<string>("")
    const [jobCategoryValidation, setJobCategoryValidation] = useState<string>("")
    const onlyLettersRegex = /^[A-Za-z\s]*$/;
    const onlyNumbersRegex = /^[0-9]+$/;

    const handleDropDownClick = (event: React.MouseEvent<HTMLElement>, firstElement, secondElement) => {
        return setAnchorEl(event.currentTarget);
    };


    const handleCreateJobListing = () => {

        if (jobTittle === "") {
            setJobTittleValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(jobTittle)) {
            setJobTittleValidation("This field should contain letters only!")
        } else {
            setJobTittleValidation("")
        }

        if (jobDescription === "") {
            setJobDescriptionValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(jobDescription)) {
            setJobDescriptionValidation("This field should contain letters only!")
        } else {
            setJobDescriptionValidation("")
        }

        if (requiredSkill === "") {
            setRequiredSkillValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(requiredSkill)) {
            setRequiredSkillValidation("This field should contain letters only!")
        } else {
            setRequiredSkillValidation("")
        }

        if (price === "") {
            setPriceValidation("This field can't be empty!")
        } else if (!onlyNumbersRegex.test(price)) {
            setPriceValidation("This field should contain numbers only!")
        } else {
            setPriceValidation("")
        }

        if (jobCategory === "") {
            setJobCategoryValidation("You must select a category!")
        } else {
            setJobCategoryValidation("")
        }

        createJobListing(props.id, jobTittle, requiredSkill, price, jobDescription, jobCategory, props.token).then((res: any) => {
            if (res.status === 200) {
                toast.success("Job Listing Created!")
                getJobListings(props.token)
                getUserJobListings(props.id, props.token)
            } else if (res.status === 404) {
                toast.error(res.message)
            }
            else {
                console.log(res.message);
            }
        })
    }

    return (<>
        <div className={styles.createJob_container}>
            <Head>
                <title>Create Job</title>
            </Head>
            <SideBar userId={props.id} token={props.token} role={props.role} />
            <div className={styles.createJob_box}>
                <div className={styles.create_box}>
                    <div className={styles.job_header}>
                        CREATE JOB
                    </div>
                    <div className={styles.job_body}>

                        <div className={styles.tittle_div}>
                            <div className={styles.job_tittle}>
                                Job Tittle
                            </div>
                            <div className={styles.job_tittle_input_div}>
                                <div className={styles.span_div}>
                                    <input onChange={(e) => { setJobTittle(e.target.value) }} className={styles.job_tittle_input} type="text" placeholder="Job Tittle"></input>
                                </div>
                                <div className={styles.span_div}>
                                    <span className={styles.create_job_validation_span}>{jobTittleValidation}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.description_div}>
                            <div className={styles.job_description}>
                                Job Description
                            </div>
                            <div className={styles.job_description_input_Div}>
                                <div>
                                    <textarea maxLength={250} onChange={(e) => { setJobDescription(e.target.value) }} rows={4} cols={50} className={styles.job_description_input} placeholder="Job Description"></textarea>
                                </div>
                                <div className={styles.span_div}>
                                    <span className={styles.create_job_validation_span}>{jobDescriptionValidation}</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.category_div}>
                            <div>

                                <div className={styles.job_category}>
                                    Job Category
                                </div>

                                <div className={styles.job_category_div}>
                                    <div>
                                        <div onClick={(e) => handleDropDownClick(e, -2, -1)}>
                                            <div className={styles.innerContainer}>
                                                <div>
                                                    <input disabled className={styles.input_container} placeholder={"Select Category"} value={jobCategory}></input>
                                                </div>
                                                <div className={styles.span_div}>
                                                    <span className={styles.create_job_validation_span}>{jobCategoryValidation}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.dropDownImage_container}>
                                            <Dropdown setAnchorEl={setAnchorEl} anchorEl={anchorEl} setLabel={setJobCategory} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.skill_div}>
                                <div className={styles.job_skill}>
                                    Required Skill
                                </div>
                                <div className={styles.job_skill_div}>
                                    <div>
                                        <input onChange={(e) => { setRequiredSkill(e.target.value) }} className={styles.job_skill_input} type="text" placeholder="Required Skill"></input>
                                    </div>
                                    <div className={styles.span_div}>
                                        <span className={styles.create_job_validation_span}>{requiredSkillValidation}</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.price_div}>
                                <div className={styles.job_price}>
                                    Price
                                </div>
                                <div className={styles.job_price_div}>
                                    <div>
                                        <input onChange={(e) => { setPrice(e.target.value) }} className={styles.job_price_input} type="text" placeholder="Price"></input>
                                    </div>
                                    <div className={styles.span_div}>
                                        <span className={styles.create_job_validation_span}>{priceValidation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.create_job_button_div}>
                            <button onClick={handleCreateJobListing} className={styles.create_job_button}>Create Job Listing</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}
export default CreateJob

export async function getServerSideProps({ req }) {
    return redirectIfNotAuthorized(req, "/Login/login")
}
