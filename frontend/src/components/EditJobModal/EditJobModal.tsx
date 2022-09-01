import { Dispatch, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material"
import { getJobListings, getUserJobListings, updateJobListing } from "@utils//requests";
import { toast } from "react-toastify";
import styles from "@styles//CreateJob.module.scss"
import 'react-toastify/dist/ReactToastify.css';
import Dropdown from "@components//Dropdown/Dropdown";

interface EditJobModalProps {
    open: boolean
    setShowModal: Dispatch<boolean>;
    jobId: string
    jobTittle: string;
    jobDescription: string;
    jobCategory: string;
    jobSkill: string;
    jobPrice: string;
    token: string;
    userId: string;
}

const EditJobModal = (props: EditJobModalProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [jobCategory, setJobCategory] = useState<string>("")
    const [jobTittle, setJobTittle] = useState<string>(props.jobTittle);
    const [jobDescription, setJobDescription] = useState<string>(props.jobDescription)
    const [jobSkill, setJobSkill] = useState<string>(props.jobSkill)
    const [jobPrice, setJobPrice] = useState<string>(props.jobPrice)
    const [jobTittleValidation, setJobTittleValidation] = useState<string>("")
    const [jobDescriptionValidation, setJobDescriptionValidation] = useState<string>("")
    const [requiredSkillValidation, setRequiredSkillValidation] = useState<string>("")
    const [priceValidation, setPriceValidation] = useState<string>("")
    const [jobCategoryValidation, setJobCategoryValidation] = useState<string>("")
    const onlyLettersRegex = /^[a-zA-Z\s]*$/;
    const onlyNumbersRegex = /^[0-9]+$/;

    useEffect(() => {
        setJobCategory(props.jobCategory)
    }, [props.jobCategory])

    const handleDropDownClick = (event: React.MouseEvent<HTMLElement>) => {
        return setAnchorEl(event.currentTarget);
    };

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "80vw",
        height: "70vh",
        bgcolor: 'background.paper',
        backgroundImage: "linear-gradient(to right top, #ffffff, #eef1ff, #d6e5ff, #b5dbff, #8ad2ff, #8ad2ff, #8ad2ff, #8ad2ff, #b5dbff, #d6e5ff, #eef1ff, #ffffff)",
        boxShadow: "4px 4px 0px 0px rgb(0 0 0)",
        p: 4,
    };

    const handleUpdateJobListing = () => {
        if (jobTittle === "") {
            setJobTittleValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(jobTittle)) {
            setJobTittleValidation("This field should contain letters only!")
        } else {
            setJobTittleValidation("")
        }

        if (jobDescription === "") {
            setJobDescriptionValidation("This field can't be empty!")
        } else {
            setJobDescriptionValidation("")
        }

        if (jobSkill === "") {
            setRequiredSkillValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(jobSkill)) {
            setRequiredSkillValidation("This field should contain letters only!")
        } else {
            setRequiredSkillValidation("")
        }

        if (jobPrice === "") {
            setPriceValidation("This field can't be empty!")
        } else if (!onlyNumbersRegex.test(jobPrice)) {
            setPriceValidation("This field should contain numbers only!")
        } else {
            setPriceValidation("")
        }

        if (jobCategory === "") {
            setJobCategoryValidation("You must select a category!")
        } else {
            setJobCategoryValidation("")
        }

        updateJobListing(props.jobId, jobTittle, jobSkill, jobPrice, jobDescription, jobCategory, props.token).then((res: any) => {
            if (res.status === 200) {
                getUserJobListings(props.userId, props.token)
                getJobListings(props.token)
                toast.success("Job Listing Updated!")
            } else if (res.status === 404) {
                toast.error(res.message)
            }
            else {
                console.log(res.message);
            }
        })
    }

    return (
        <div>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.job_body}>

                        <div className={styles.tittle_div}>
                            <div className={styles.job_tittle}>
                                Job Tittle
                            </div>
                            <div className={styles.job_tittle_input_div}>
                                <input onChange={(e) => { setJobTittle(e.target.value) }} className={styles.job_tittle_input} defaultValue={props.jobTittle} type="text" placeholder="Job Tittle"></input>
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
                                <textarea maxLength={250} onChange={(e) => { setJobDescription(e.target.value) }} rows={4} cols={50} defaultValue={props.jobDescription} className={styles.job_description_input} placeholder="Job Description"></textarea>
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
                                        <div onClick={(e) => handleDropDownClick(e)}>
                                            <div className={styles.innerContainer}>
                                                <input disabled className={styles.input_container} placeholder={"Select Category"} value={jobCategory}></input>
                                                <div className={styles.span_div}>
                                                    <span className={styles.create_job_validation_span}>{jobCategoryValidation}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.dropDownImage_container}>
                                            <Dropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} setLabel={setJobCategory} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.skill_div}>
                                <div className={styles.job_skill}>
                                    Required Skill
                                </div>
                                <div className={styles.job_skill_div}>
                                    <input onChange={(e) => { setJobSkill(e.target.value) }} className={styles.job_skill_input} defaultValue={props.jobSkill} type="text" placeholder="Required Skill"></input>
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
                                    <input onChange={(e) => { setJobPrice(e.target.value) }} defaultValue={props.jobPrice} className={styles.job_price_input} type="text" placeholder="Price"></input>
                                    <div className={styles.span_div}>
                                        <span className={styles.create_job_validation_span}>{priceValidation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.cancel_edit_job_button}>
                            <button onClick={handleUpdateJobListing} className={styles.create_job_button}>Update Job Listing</button>
                            <button onClick={() => { props.setShowModal(false) }} className={styles.create_job_button}>Cancel</button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </div >
    )
}
export default EditJobModal