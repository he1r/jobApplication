import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@styles/Login.module.scss'
import LufthansaLogo from "@images/lufthansaLogo.png"
import { useRouter } from 'next/router'
import { CookieNames, Paths } from '@utils/enums'
import { getAllUsers, getJobListings, getUserFavouriteJobListings, getUserJobApplications, login } from '@utils/requests'
import { setUserCookie } from '@utils/authorization'
import { useCookies } from "react-cookie";

const Login: NextPage = () => {
  const router = useRouter()

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [, setCookie] = useCookies([CookieNames.USER]);
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleSignUp = () => {
    router.replace(Paths.SignupPage)
  }

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin = () => {
    login(email, password).then((res: any) => {
      if (res.status === 200) {
        setUserCookie(setCookie, res.user);

        const promise1 = getJobListings(res.user.token)
        const promise2 = getAllUsers(res.user.token)
        const promise3 = getUserFavouriteJobListings(res.user.id, res.token)
        const promise4 = getUserJobApplications(res.user.id, res.token)

        Promise.allSettled([promise1, promise2, promise3, promise4]).finally(() => {
          router.replace(Paths.Home)
        })

      } else {
        if (email === "" || password === "") {
          setErrorMessage("The email or password input field can't be empty!")
        } else {
          setErrorMessage(res.message)
        }
        setTimeout(() => {
          setErrorMessage("")
        }, 6000)
      }
    })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Log In</title>
      </Head>

      <div className={styles.main}>
        <Image src={LufthansaLogo} width={500} height={300} />
        <div className={styles.login_box}>
          <span className={styles.spanError}>{errorMessage}</span>
          <div>
            <input className={styles.input_field} onChange={(e) => handleEmailOnChange(e)} type="email" placeholder="Enter Email" required></input>
          </div>
          <div className="email-input-div flex-column">
            <input className={styles.input_field} onChange={(e) => handlePasswordOnChange(e)} type="password" placeholder="Enter Password" required></input>
          </div>
          <div>
            <input type="button" onClick={handleLogin} className={styles.login_button} value="Log In"></input>
          </div>
          <div className={styles.create_account_div}>
            <h5 className={styles.create_account_text}>{"You don't have an account?"} <a className={styles.signup_link} onClick={handleSignUp}>{"Sign Up"}</a></h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

