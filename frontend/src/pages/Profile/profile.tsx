import { useEffect, useState } from "react";
import { redirectIfNotAuthorized, setUserCookie } from "@utils/authorization";
import SideBar from "@components/SideBar/SideBar";
import styles from "@styles/Profile.module.scss";
import Image from "next/image";
import defaultAvatar from "@images/default.png";
import { NextPage } from "next";
import { getAllUsers, getJobListings, getUserFavouriteJobListings, getUserJobApplications, updateUser } from "@utils/requests";
import { useCookies } from "react-cookie";
import { CookieNames } from "@utils/enums";
import ChangePasswordModal from "@components/ChangePasswordModal/ChangePasswordModal";
import { useSelector } from "react-redux";
import { selectFavouriteJobListings } from "@utils/redux/features/favouriteJobListings";
import { selectJobListings } from "@utils/redux/features/jobListings";
import JobCard from "@components/JobCard/JobCard";
import { selectAllUsers } from "@utils/redux/features/users";
import { toast } from "react-toastify";
import { selectUserJobApplications } from "@utils/redux/features/jobApplications";

const Profile: NextPage = (props: any) => {
    const [firstName, setFirstName] = useState<string>(props.firstName)
    const [surname, setSurname] = useState<string>(props.surname)
    const [email, setEmail] = useState<string>(props.email)
    const [birthday, setBirthday] = useState<string>(props.birthday)
    const [, setCookie] = useCookies([CookieNames.USER]);
    const [showModal, setShowModal] = useState<boolean>(false)
    const userFavouriteJobListings = useSelector(selectFavouriteJobListings)
    const jobListings = useSelector(selectJobListings)
    const [favourites, setFavourites] = useState([])
    const [jobApplications, setJobApplications] = useState([])
    const allUsers = useSelector(selectAllUsers)
    const userJobApplications = useSelector(selectUserJobApplications)
    const [firstNameValidation, setFirstNameValidation] = useState<string>("")
    const [surnameValidation, setSurnameValidation] = useState<string>("")
    const [emailValidation, setEmailValidation] = useState<string>("")
    const [birthdayValidation, setBirthdayValidation] = useState<string>("")
    const [updateProfileValidation, setUpdateProfileValidation] = useState<string>("")
    const onlyLettersRegex = /^[a-zA-Z]+$/;
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    useEffect(() => {
        const favPromise = getUserFavouriteJobListings(props.id, props.token)
        const jobListingsPromise = getJobListings(props.token)
        const allUsersPromise = getAllUsers(props.token)
        const jobApplicationsPromose = getUserJobApplications(props.id, props.token)
        Promise.allSettled([favPromise, jobListingsPromise, allUsersPromise, jobApplicationsPromose]).finally(() => {
            let favouriteListingsArray = userFavouriteJobListings?.map(favouriteListing => { return favouriteListing?.jobListingID; });
            let favouriteFilter = jobListings?.filter(jobList => favouriteListingsArray?.includes(jobList.id))
            setFavourites(favouriteFilter)
            let jobApplicationArray = userJobApplications?.map(jobApplication => { return jobApplication?.job_id; })
            let jobApplicationFilter = jobListings?.filter(jobList => jobApplicationArray?.includes(jobList.id))
            setJobApplications(jobApplicationFilter)
        })

    }, [])

    const handleOnClickUpdateUserButton = () => {

        if (firstName === "") {
            setFirstNameValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(firstName)) {
            setFirstNameValidation("This field should contain letters only!")
        } else {
            setFirstNameValidation("")
        }

        if (surname === "") {
            setSurnameValidation("This field can't be empty!")
        } else if (!onlyLettersRegex.test(surname)) {
            setSurnameValidation("This field should contain letters only!")
        } else {
            setSurnameValidation("")
        }

        if (email === "") {
            setEmailValidation("This field can't be empty!")
        } else if (!emailRegex.test(email)) {
            setEmailValidation("The email format you entered is incorrect!")
            return
        } else {
            setEmailValidation("")
        }

        if (birthday === "") {
            setBirthdayValidation("This field can't be empty!")
        } else {
            setBirthdayValidation("")
        }
        updateUser(props.id, firstName, surname, birthday, email, props.role, props.token).then((res: any) => {
            if (res.status === 200) {
                setUserCookie(setCookie, res.user);
                toast.success("User Updated!")
            } else if (res.status === 404) {
                toast.error(res.message)
            } else {
                console.log(res.message);
            }
        })
    }

    const handleOnChangePasswordButton = () => {
        setShowModal(true)
    }

    const handleUpdateAvatarOnClick = () => {
        setUpdateProfileValidation("This option is not developed yet! Sorry 😞")
        setTimeout(() => {
            setUpdateProfileValidation("")
        }, 5000)
    }

    return (
        <>
            <div className={styles.main_div}>
                <SideBar userId={props.id} token={props.token} role={props.role} />
                <div className={styles.profile_container}>
                    <div className={styles.main_body}>
                        <div className={styles.profile_body_container}>
                            <div className={styles.profile_badge}>
                                <div className={styles.avatar_div}>
                                    <Image className={styles.profile_avatar} src={defaultAvatar} width={150} height={150} />
                                </div>
                                <div className={styles.user_name}>
                                    heir
                                </div>
                                <div className={styles.settings_page}>
                                    <button onClick={handleUpdateAvatarOnClick} className={styles.upload_pic}>Upload Profile Picture</button>
                                    <div className={styles.error_span_div}>
                                        <span className={styles.userProfileValidation}>{updateProfileValidation}</span>
                                    </div>
                                </div>
                            </div>
                            <ChangePasswordModal id={props.id} token={props.token} open={showModal} setShowModal={setShowModal} />
                            <div className={styles.profile_settings}>
                                <div className={styles.inputs_div}>
                                    <div className={styles.first_input_div}>

                                        <div>
                                            <div className={styles.firstName_label}>
                                                First Name
                                            </div>
                                            <div>
                                                <input type={"text"} onChange={(e) => setFirstName(e.target.value)} defaultValue={props.firstName} className={styles.firstName_input} />
                                                <div className={styles.error_span_div}>
                                                    <span className={styles.userProfileValidation}>{firstNameValidation}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.surname_label}>
                                            <div className={styles.firstName_label}>
                                                Surname
                                            </div>
                                            <div>
                                                <input type={"text"} onChange={(e) => setSurname(e.target.value)} defaultValue={props.surname} className={styles.firstName_input} />
                                                <div className={styles.error_span_div}>
                                                    <span className={styles.userProfileValidation}>{surnameValidation}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.second_input_div}>
                                        <div>
                                            <div className={styles.firstName_label}>
                                                Email
                                            </div>
                                            <div>
                                                <input type={"email"} onChange={(e) => setEmail(e.target.value)} defaultValue={props.email} className={styles.firstName_input} />
                                                <div className={styles.error_span_div}>
                                                    <span className={styles.userProfileValidation}>{emailValidation}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.surname_label}>
                                            <div className={styles.firstName_label}>
                                                Birthday
                                            </div>
                                            <div>
                                                <input type={"date"} onChange={(e) => setBirthday(e.target.value)} defaultValue={props.birthday} className={styles.firstName_input} />
                                                <div className={styles.error_span_div}>
                                                    <span className={styles.userProfileValidation}>{birthdayValidation}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.buttons_div}>
                                        <div>
                                            <button onClick={handleOnClickUpdateUserButton} className={styles.button}>Update</button>
                                        </div>
                                        <div className={styles.second_button}>
                                            <button onClick={handleOnChangePasswordButton} className={styles.button}>Change Password</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className={styles.favourites_body}>
                            <div className={styles.favourite_label}>
                                {favourites?.length > 0 && "Favourite Job Listings:"}

                            </div>
                            <div>
                                {favourites?.map((jobList: any, index) =>
                                    <JobCard token={props.token} listingId={jobList.id} isUserJobs={false} key={index} AllUsers={allUsers} userId={jobList.user_id} createdDate={jobList.Created_Date} jobCategory={jobList.Job_Category} jobDescription={jobList.Job_Description} jobPrice={jobList.Job_Price} jobSkill={jobList.Job_Skill} jobTittle={jobList.Job_Title} />
                                )}
                            </div>
                            <div className={styles.favourite_label}>
                                {jobApplications?.length > 0 && "Job Applications You've Applied For"}
                            </div>
                            <div>
                                {jobApplications?.map((jobList: any, index) =>
                                    <JobCard token={props.token} listingId={jobList.id} isUserJobs={false} key={index} AllUsers={allUsers} userId={jobList.user_id} createdDate={jobList.Created_Date} jobCategory={jobList.Job_Category} jobDescription={jobList.Job_Description} jobPrice={jobList.Job_Price} jobSkill={jobList.Job_Skill} jobTittle={jobList.Job_Title} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Profile

export async function getServerSideProps({ req }) {
    return redirectIfNotAuthorized(req, "/Login/login")
}
