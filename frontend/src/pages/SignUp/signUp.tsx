import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/SignUp.module.scss'
import LufthansaLogo from "@images/lufthansaLogo.png"
import { Checkbox } from "@mui/material"
import { NextPage } from 'next/types'
import { useRouter } from 'next/router'
import { Paths } from '@utils/enums'
import { useState } from 'react'
import { signUp } from '@utils/requests'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp: NextPage = () => {
    const router = useRouter();
    const [firstName, setFirstName] = useState<string>("")
    const [surname, setSurname] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [birthday, setBirthday] = useState<string>("")
    const [isRecruiter, setIsRecruiter] = useState<boolean>(false)
    const [firstNameValidation, setFirstNameValidation] = useState<string>("")
    const [surnameValidation, setSurnameValidation] = useState<string>("")
    const [emailValidation, setEmailValidation] = useState<string>("")
    const [birthdayValidation, setBirthdayValidation] = useState<string>("")
    const [passwordValidation, setPasswordValidation] = useState<string>("")
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState<string>("")
    const onlyLettersRegex = /^[a-zA-Z]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    const handleLogin = () => {
        router.replace(Paths.LoginPage)
    }

    const handleSignUp = () => {
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

        if (password === "") {
            setPasswordValidation("This field can't be empty!")
        } else if (!passwordRegex.test(password)) {
            setPasswordValidation("Password should contain at least one number, uppercase letter, special character!")
        } else {
            setPasswordValidation("")
        }

        if (confirmPassword === "") {
            setConfirmPasswordValidation("This field can't be empty!")
        } else if (!passwordRegex.test(confirmPassword)) {
            setConfirmPasswordValidation("Confirm Password should contain at least one number, uppercase letter, special character!")
        } else {
            setConfirmPasswordValidation("")
        }

        let role: string;
        if (isRecruiter) {
            role = "recruiter"
        } else {
            role = "user"
        }

        if (password != confirmPassword) {
            toast.error("Passwords you entered don't match!")
        } else {
            signUp(firstName, surname, birthday, email, password, role).then((res: any) => {
                if (res.status === 200) {
                    router.replace(Paths.LoginPage)
                } else if (res.status === 404) {
                    toast.error(res.message)
                }
                else {
                    console.log(res.message);
                }
            })
        }
    }

    return (
        <>
            <div className={styles.signup_container}>
                <Head>
                    <title>Sign Up</title>
                </Head>

                <div className={styles.signup_main}>
                    <Image src={LufthansaLogo} width={500} height={300} />
                    <div className={styles.signup_box}>
                        <div>
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} onChange={(e) => { setFirstName(e.target.value) }} type="text" placeholder="Enter First Name" required></input>
                            </div>
                            <span className={styles.spanClass}>{firstNameValidation}</span>
                        </div>
                        <div className="input_div">
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} type="text" onChange={(e) => { setSurname(e.target.value) }} placeholder="Enter Surname" required></input>
                            </div>
                            <span className={styles.spanClass}>{surnameValidation}</span>
                        </div>
                        <div className="input_div">
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Enter Email" required></input>
                            </div>
                            <span className={styles.spanClass}>{emailValidation}</span>
                        </div>
                        <div className="input_div">
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} type="date" onChange={(e) => { setBirthday(e.target.value) }} placeholder="Enter Birthday" required></input>
                            </div>
                            <span className={styles.spanClass}>{birthdayValidation}</span>
                        </div>
                        <div className="input_div">
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password" required></input>
                            </div>
                            <span className={styles.spanClass}>{passwordValidation}</span>
                        </div>
                        <div className="input_div">
                            <div className={styles.bigErrorDiv}>
                                <input className={styles.input_field} type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" required></input>
                            </div>
                            <span className={styles.spanClass}>{confirmPasswordValidation}</span>
                        </div>
                        <div className={styles.isRecruiter_div}>
                            <div className={styles.isRecruiter_text}>
                                Are you a recruiter?
                            </div>
                            <div className={styles.isRecruiter_checkbox}>
                                <Checkbox onChange={() => setIsRecruiter(!isRecruiter)} style={{ width: 20 }} />
                            </div>
                        </div>
                        <div>
                            <input type="button" onClick={handleSignUp} className={styles.login_button} value="Sign Up"></input>
                        </div>
                        <div className={styles.create_account_div}>
                            <h5 className={styles.create_account_text}>Are you already a member? <a className={styles.signup_link} onClick={handleLogin}>Log In</a></h5>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default SignUp