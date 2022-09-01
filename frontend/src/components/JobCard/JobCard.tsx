import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import styles from "@components/JobCard/JobCard.module.scss"
import defaultAvatar from "@images//default.png"
import Image from "next/image"
import { addFavouriteJobListing, deleteJobListing, getJobListings, getUserFavouriteJobListings, getUserJobListings, removeFavouriteJobListing } from "@utils//requests";
import EditJobModal from "@components/EditJobModal/EditJobModal";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { selectFavouriteJobListings } from "@utils/redux/features/favouriteJobListings";
import { useSelector } from "react-redux";
import { Paths } from "@utils/enums";
import { useRouter } from "next/router";

interface JobCardProps {
    userId: string;
    jobTittle: string;
    jobDescription: string;
    jobCategory: string;
    jobSkill: string;
    jobPrice: string;
    createdDate: string;
    AllUsers: [];
    isUserJobs: boolean;
    listingId: string;
    token?: string;
}

const JobCard = (props: JobCardProps) => {
    const [clicked, setCliked] = useState(false)
    const [userName, setUserName] = useState<string>("")
    const [showModal, setShowModal] = useState<boolean>(false)
    const userFavouriteJobListings = useSelector(selectFavouriteJobListings)
    const router = useRouter()

    useEffect(() => {
        getUserFavouriteJobListings(props.userId, props.token)
        if (props.AllUsers) {
            const jobUser: any = props.AllUsers?.filter((usr: any) => usr.id === props.userId)
            if (jobUser) {
                setUserName(jobUser[0]?.First_Name)
            }
        }
    }, [])

    useEffect(() => {
        const isLiked = userFavouriteJobListings?.filter((jobListing: any) => jobListing.jobListingID === props.listingId)
        if (isLiked) {
            if (Object.keys(isLiked).length >= 1) {
                setCliked(true)
            }
        }

    }, [props.listingId])

    const handleOnDeleteJobButton = () => {
        deleteJobListing(props.listingId, props.token).then(() => {
            getJobListings(props.token)
            getUserJobListings(props.userId, props.token)
            toast.success("Job Listing Deleted!")
        })
    }
    const handleOnEditJobButton = () => {
        setShowModal(!showModal)
    }

    const handleHeartIsNotClicked = () => {
        addFavouriteJobListing(props.listingId, props.userId, props.token).then((res: any) => {
            if (res.status === 200) {
                setCliked(true)
            } else if (res.status === 404) {
                toast.error(res.message)
            } else {
                console.log(res.message)
            }
        })
        getUserFavouriteJobListings(props.userId, props.token)
    }

    const handleHeartIsClicked = () => {
        removeFavouriteJobListing(props.listingId, props.token).then((res: any) => {
            if (res.status === 200) {
                setCliked(false)
            } else if (res.status === 404) {
                toast.error(res.message)
            } else {
                console.log(res.message);
            }
        })
        getUserFavouriteJobListings(props.userId, props.token)
    }

    const handleOnClickJobCard = () => {
        router.replace({ pathname: Paths.JobApply, query: { jobId: props.listingId } })
    }

    return (
        <>
            <div
                className={styles.jobCard}
            >
                <div className={styles.tittle_div}>
                    <div className={styles.jobCard_header}>{props.jobTittle.toLocaleUpperCase()}</div>
                    <div className={styles.heart_button}>
                        {!clicked && <FaRegHeart onClick={handleHeartIsNotClicked} color={"black"} />}
                        {clicked && <FaHeart onClick={handleHeartIsClicked} color={"red"} />}
                    </div>
                </div>
                <EditJobModal userId={props.userId} token={props.token} jobId={props.listingId} jobCategory={props.jobCategory} jobDescription={props.jobDescription} jobPrice={props.jobPrice} jobSkill={props.jobSkill} jobTittle={props.jobTittle} setShowModal={setShowModal} open={showModal} />
                <div className={styles.job_description} onClick={handleOnClickJobCard}>
                    <div className={styles.jobPrice}>
                        Fixed-Price: {props.jobPrice}$
                    </div>
                    <div className={styles.jobDesc}>
                        {props.jobDescription}
                    </div>
                    <div className={styles.jobCategory}>
                        <div className={styles.category}>
                            {props.jobCategory}
                        </div>
                        <div className={styles.category}>
                            {props.jobSkill}
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.postedByDiv}>
                        <Image width={30} height={30} src={defaultAvatar} className={styles.userAvatar} />
                        <div className={styles.postedByTest}>{userName}</div>
                    </div>
                    <div>
                        {props.isUserJobs &&
                            <div className={styles.isUserJob}>
                                <div>
                                    <button onClick={handleOnEditJobButton} className={styles.editButton}>EDIT</button>
                                </div>
                                <div>
                                    <button onClick={handleOnDeleteJobButton} className={styles.editButton}>DELETE</button>
                                </div>
                            </div>
                        }
                    </div>
                    <div className={styles.createdDate}>
                        {props.createdDate}
                    </div>
                </div>
            </div>
        </>
    )
}
export default JobCard