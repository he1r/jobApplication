import { Box, Modal } from "@mui/material"
import styles from "@components/ChangePasswordModal/ChangePasswordModal.module.scss"
import { Dispatch, useState } from "react";
import { updatePassword } from "@utils/requests";
import { toast } from "react-toastify";

interface ChangePasswordModalProps {
    open: boolean
    setShowModal: Dispatch<boolean>;
    id: string
    token: string
}

const ChangePasswordModal = (props: ChangePasswordModalProps) => {
    const [oldPassword, setOldPassowrd] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [oldPasswordValidation, setOldPasswordValidation] = useState<string>("")
    const [passwordValidation, setPasswordValidation] = useState<string>("")
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<string>("")
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: "40vw",
        height: "58vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid black",
        bgcolor: 'background.paper',
        backgroundImage: "linear-gradient(to right top, #ffffff, #eef1ff, #d6e5ff, #b5dbff, #8ad2ff, #8ad2ff, #8ad2ff, #8ad2ff, #b5dbff, #d6e5ff, #eef1ff, #ffffff)",
        p: 4,
    };

    const handleOnClickUpdatePassword = () => {
        if (!passwordRegex.test(oldPassword)) {
            setOldPasswordValidation("Password should have at least one uppercase letter, number and special character!")
        } else {
            setOldPasswordValidation("")
        }
        if (!passwordRegex.test(password)) {
            setPasswordValidation("Password should have at least one uppercase letter, number and special character!")
        } else {
            setPasswordValidation("")
        }
        if (!passwordRegex.test(confirmPassword)) {
            setConfirmPasswordValidation("Password should have at least one uppercase letter, number and special character!")
        } else {
            setConfirmPasswordValidation("")
        }

        updatePassword(oldPassword, password, confirmPassword, props.id, props.token).then((res: any) => {
            if (res.status === 200) {
                toast.success("Password successfully updated!")
            } else if (res.status === 404) {
                toast.error(res.message)
            } else {
                console.log(res.message)
            }
        })
    }

    return (
        <>
            <Modal
                open={props.open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.password_modal}>
                        <div className={styles.change_password_box}>
                            <div className={styles.password_modal_labels}>
                                Old Password
                            </div>
                            <div className={styles.input_divs}>
                                <input type={"password"} onChange={(e) => setOldPassowrd(e.target.value)} className={styles.changePassword_inputs} />
                                <span className={styles.change_password_span}>
                                    {oldPasswordValidation}
                                </span>
                            </div>
                        </div>
                        <div className={styles.password_divs}>
                            <div className={styles.password_modal_labels}>
                                New Password
                            </div>
                            <div className={styles.input_divs}>
                                <input type={"password"} onChange={(e) => setPassword(e.target.value)} className={styles.changePassword_inputs} />
                                <span
                                    className={styles.change_password_span}>{passwordValidation}
                                </span>
                            </div>
                        </div>
                        <div className={styles.password_divs}>
                            <div className={styles.password_modal_labels}>
                                Confirm Password
                            </div>
                            <div className={styles.input_divs}>
                                <input type={"password"} onChange={(e) => setConfirmPassword(e.target.value)} className={styles.changePassword_inputs} />
                                <span className={styles.change_password_span}>
                                    {confirmPasswordValidation}
                                </span>
                            </div>
                        </div>
                        <div className={styles.cancel_edit_job_button}>
                            <button onClick={handleOnClickUpdatePassword} className={styles.create_job_button}>Update Password</button>
                            <button onClick={() => { props.setShowModal(false) }} className={styles.create_job_button}>Cancel</button>
                        </div>

                    </div>
                </Box>
            </Modal>
        </>
    )
}
export default ChangePasswordModal