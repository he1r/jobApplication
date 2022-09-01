import { useState } from "react";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarFooter,
    SidebarContent,
} from "react-pro-sidebar";
import 'react-pro-sidebar/dist/css/styles.css';
import { FaEdit, FaList, FaUser } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import styles from "@components/SideBar/Sidebar.module.scss"
import { IconContext } from "react-icons";
import LufthansaLogo from "@images/lufthansaLogoSideBar.png"
import Image from "next/image"
import { useRouter } from "next/router";
import { CookieNames, Paths } from "@utils//enums";
import { useCookies } from "react-cookie";
import { setUserCookie } from "@utils/authorization";
import { getAllUsers, getJobListings, getUserFavouriteJobListings, getUserJobApplications } from "@utils/requests";

interface SideBarProps {
    role: string;
    token: string
    userId: string
}

const SideBar = (props: SideBarProps) => {
    const router = useRouter()
    const [, setCookie] = useCookies([CookieNames.USER]);

    const [menuCollapse, setMenuCollapse] = useState(false)

    const menuIconClick = () => {
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };

    const isRecruiter = props.role === "user" ? false : true

    const handleLogOut = () => {
        setUserCookie(setCookie, {});
        router.replace(Paths.LoginPage)
    }

    const handleJobListingsOnClick = () => {
        const promise1 = getJobListings(props.token)
        const promise2 = getAllUsers(props.token)
        const promise3 = getUserFavouriteJobListings(props.userId, props.token)
        Promise.allSettled([promise1, promise2, promise3]).finally(() => {
            router.replace(Paths.JobListings)
        })
    }

    const handleHomeOnClick = () => {
        const promise1 = getJobListings(props.token)
        const promise2 = getAllUsers(props.token)
        const promise3 = getUserFavouriteJobListings(props.userId, props.token)
        Promise.allSettled([promise1, promise2, promise3]).finally(() => {
            router.replace(Paths.Home)
        })
    }
    const handleProfileOnClick = () => {
        const promise1 = getJobListings(props.token)
        const promise2 = getAllUsers(props.token)
        const promise3 = getUserFavouriteJobListings(props.userId, props.token)
        const promise4 = getUserJobApplications(props.userId, props.token)
        Promise.allSettled([promise1, promise2, promise3, promise4]).finally(() => {
            router.replace(Paths.Profile)
        })
    }
    const handleCreateJobOnClick = () => {
        router.replace(Paths.CreateJobPage)
    }

    return (
        <div className={styles.container}>
            <ProSidebar collapsed={menuCollapse}>
                <SidebarContent className={styles.sidebar_content}>
                    <IconContext.Provider value={{ size: "3em" }}>
                        <div className={styles.close_menu} onClick={menuIconClick}>
                            {!menuCollapse &&
                                <div className={styles.lufthansa_logo}>
                                    <Image src={LufthansaLogo} width={150} height={150} />
                                </div>
                            }
                            {menuCollapse ? (
                                <FiArrowRightCircle color={"green"} />
                            ) : (
                                <FiArrowLeftCircle color={"red"} />
                            )}
                        </div>
                    </IconContext.Provider>
                    <Menu iconShape="square">
                        <MenuItem className={styles.sidebar_text} onClick={handleHomeOnClick} icon={<FiHome />}>Home</MenuItem>
                        <MenuItem className={styles.sidebar_text} onClick={handleProfileOnClick} icon={<FaUser />}>Profile</MenuItem>
                        {
                            isRecruiter &&
                            <>
                                <MenuItem className={styles.sidebar_text} onClick={handleJobListingsOnClick} icon={<FaList className={styles.iconClass} />}>Your Job Listings</MenuItem>
                                <MenuItem className={styles.sidebar_text} onClick={handleCreateJobOnClick} icon={<FaEdit />}>Create Job Listing</MenuItem>
                            </>

                        }
                    </Menu>
                </SidebarContent>
                <SidebarFooter className={styles.sidebar_content}>
                    <Menu iconShape="square">
                        <MenuItem className={styles.sidebar_text} onClick={handleLogOut} icon={<FiLogOut color="white" />}>Logout</MenuItem>
                    </Menu>
                </SidebarFooter>
            </ProSidebar>

        </div>
    )

}
export default SideBar