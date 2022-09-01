const express = require('express')
const config = require('./config.json')
const mysql = require('mysql')
const cors = require("cors")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const jwt = require('jsonwebtoken')

//CONNECT TO THE DATABASE
const db = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})

//CREATE THE APP WITH EXPRESS
const app = express();

//FORMAT THE REQUEST DATA 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json())
app.use(fileUpload())

//POST REQUEST ON /UPDATEPROFILE
app.post("/updateUser", async (req, res) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    try {
        var decoded = jwt.verify(token, config.jwt_secret);
        const userId = req.body.userId
        const name = req.body.name
        const surname = req.body.surname
        const email = req.body.email
        const birthday = req.body.birthday
        const role = req.body.role

        //REGEX VALIDATORS
        var onlyLettersRegex = /^[a-zA-Z]+$/;
        var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        if (name === "" || surname === "") {
            res.send({ message: "Name, Surname can't be empty!", status: 400 })
            return res.end()
        }
        //VALIDATE EACH DATA WE GET FROM THE REQUEST
        if (!onlyLettersRegex.test(name) || !onlyLettersRegex.test(surname)) {
            res.send({ message: "Name, Surname must contain letters only!", status: 400 })
            return res.end()
        }
        if (!emailRegex.test(email)) {
            res.send({ message: "The email format you entered is incorrect!", status: 400 })
            return res.end()

        }
        if (birthday == "") {
            res.send({ message: "Birthday must not be empty" })
            return res.end()
        }

        var getUserRowQuery = "SELECT * FROM users where id = ?"

        db.query(getUserRowQuery, [userId], (err, result) => {

            const row = JSON.parse(JSON.stringify(result))
            if (err) {
                console.log(err)
            }
            //IF THE USER EMAIL == THE EMAIL WE GET FROM THE FRONTEND THAT MEANS HE DIDNT CHANGE HIS EMAIL
            if (row[0].Email == email) {

                let updateUserQuery = `UPDATE users SET First_Name= '${name}', Surname= '${surname}', Email= '${email}', Birthday= '${birthday}', Role='${role}' WHERE id= ${userId}`

                db.query(updateUserQuery, (err, result) => {

                    if (err) throw err;

                    const row = JSON.parse(JSON.stringify(result))

                    if (row.affectedRows >= 1) {
                        let updatedToken = jwt.sign({ email: email }, config.jwt_secret, { expiresIn: config.jwt_expires })
                        res.send({ message: "User updated", status: 200, user: { id: userId, firstName: name, surname: surname, email: email, birthday: birthday, role: role, token: updatedToken } })
                    }
                })
            } else {

                let checkEmailQuery = "SELECT * FROM users where email = ?"

                db.query(checkEmailQuery, [email], (err, result) => {

                    if (result.length >= 1) {
                        res.send({ message: "A user with that email already exists!", status: 404 })
                        return res.end()

                    }

                    else {
                        let updateUserQuery = `UPDATE users SET First_Name= '${name}', Surname= '${surname}', Email= '${email}', Birthday= '${birthday}', Role='${role}' WHERE id= ${userId}`

                        db.query(updateUserQuery, (err, result) => {

                            if (err) throw err;

                            const row = JSON.parse(JSON.stringify(result))

                            if (row.affectedRows >= 1) {
                                let updatedToken = jwt.sign({ email: email }, config.jwt_secret, { expiresIn: config.jwt_expires })
                                res.send({ message: "User updated", status: 200, user: { id: id, firstName: name, surname: surname, email: email, birthday: birthday, role: role, token: updatedToken } })
                                return res.end()
                            }
                        })
                    }
                })
            }
        })
    } catch (err) {
        console.log(err)
    }

    return

    // ALL THE DATA BEING SENT FROM THE REQUEST

})

//POST REQUEST ON /SIGNUP
app.post("/signUp", (req, res) => {

    //ALL THE DATA BEING SENT FROM THE REQUEST
    const name = req.body.name
    const surname = req.body.surname
    const email = req.body.email
    const birthday = req.body.birthday
    const password = req.body.password
    const role = req.body.role

    //REGEX VALIDATORS
    var onlyLettersRegex = /^[a-zA-Z]+$/;
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    var emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

    //VALIDATE EACH DATA WE GET FROM THE REQUEST
    if (!onlyLettersRegex.test(name) || !onlyLettersRegex.test(surname)) {
        res.send({ message: "Name, Surname should contain letters only!", status: 400 })
        return
    }
    if (!emailRegex.test(email)) {
        res.send({ message: "The email format you entered is incorrect!", status: 400 })
        return
    }
    if (!passwordRegex.test(password)) {
        res.send({ message: "Password should contain at least one number, uppercase letter, special character!", status: 400 })
        return
    }
    if (birthday == "") {
        res.send({ message: "Birthday cannot be empty!", status: 400 })
        return
    }

    /**
  * QUERYT PER TE PARE NQFS EMAILI DHE PASSWORD JANE NE DATABAZA
  */
    let emailExistsQuery = "SELECT * FROM users WHERE Email= ?";

    //IF EMAIL OR PHONE EXISTS SEND A RESPONSE WITH STATUS 400
    db.query(emailExistsQuery, [email], (err, result) => {
        if (result.length >= 1) {
            res.send({ message: "A user with that email already exists!", status: 404 })
            return
        } else {
            //INSERT USER DATA TO THE DATABASE
            let sqlInsertUser = "INSERT INTO users (First_Name, Surname, Email, Password, Birthday, role) VALUES (?, ?, ?, ?, ?, ?)"
            try {
                db.query(sqlInsertUser, [name, surname, email, password, birthday, role,], (err, result) => {
                    if (result) {
                        res.send({ message: "User registered", status: 200 })
                        res.end()
                        return
                    }
                })
            } catch (error) {
                console.log(error)
            }
        }
    })


    //EXECUTE QUERY AND SEND A RESPONSE WITH STATUS 200
})

//POST REQUEST ON /LOGIN
app.post("/login", (req, res) => {

    //DATA FROM THE REQUEST
    const email = req.body.email;
    const password = req.body.password;

    //VALIDATORS
    if (email == "" || password == "") {
        res.send({ message: "Email or Password field is empty!", status: 400 })
        return;
    }

    //QUERY TO GET THE ROW WITH THE EMAIL FROM THE REQUEST DATA
    const sqlInsertQuery = "SELECT * FROM users WHERE Email= ?"

    //EXECUTE QUERY
    db.query(sqlInsertQuery, [email], (err, result) => {
        //IF THERES A RESULT CHECK IF THE PASSWORD FROM THE REQUEST DATA IS THE SAME AS THE PASSWORD FROM THE DATABASE
        if (result) {

            const row = JSON.parse(JSON.stringify(result))
            if (!row[0]) {
                res.send({ message: "The email you entered does not exist!", status: 404 })
                return
            }
            if (password == row[0].Password) {
                var token = jwt.sign({ email: email }, config.jwt_secret, { expiresIn: config.jwt_expires });
                res.send({ message: "User logs in", status: 200, user: { id: row[0].id, firstName: row[0].First_Name, surname: row[0].Surname, birthday: row[0].Birthday, email: row[0].Email, role: row[0].Role, token: token } })
                return
            } else {
                res.send({ message: "The password you entered is incorrect!", staus: 404 })
            }
            //IF THERES AN ERROR
            if (err) {
                console.log(err)
                return
            }
        }
        res.end()
    })

})

//POST  REQUEST TO UPDATE THE USER PASSWORD
app.post("/updatePassword", (req, res) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }
    try {
        var decoded = jwt.verify(token, config.jwt_secret)

        const oldPassword = req.body.oldPassword
        const newPassword = req.body.newPassword
        const confirmPassword = req.body.confirmPassword
        const id = req.body.id

        var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/

        if (!passwordRegex.test(newPassword)) {
            res.send({ message: "The new password should have at least one uppercase letter, number and special character!", status: 400 })
            return
        }
        if (newPassword != confirmPassword) {
            res.send({ message: "The passwords you entered don't match!", status: 404 })
            return
        }

        let getOldPasswordQuery = "SELECT * FROM users WHERE id = ?"

        db.query(getOldPasswordQuery, [id], (err, result) => {

            const row = JSON.parse(JSON.stringify(result))

            if (row[0].Password != oldPassword) {
                res.send({ message: "The old password you entered is incorrect!", status: 404 })
                return
            } else {
                let updatePasswordQuery = `UPDATE users SET Password= '${newPassword}' WHERE id= '${id}'`

                db.query(updatePasswordQuery, (err, result) => {
                    if (err) throw err
                    const queryResult = JSON.parse(JSON.stringify(result))
                    if (queryResult.affectedRows >= 1) {
                        res.send({ message: "Password updated!", status: 200 })
                        return
                    }
                })
            }
        })

    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})


app.post("/createJobListing", (req, res) => {

    const user_id = req.body.user_id;
    const Job_Tittle = req.body.job_tittle;
    const Job_Category = req.body.job_category;
    const Job_Description = req.body.job_description
    const Job_Skill = req.body.job_skill;
    const Job_Price = req.body.job_price;
    const date = new Date();
    const Created_Date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    const onlyNumbersRegex = /^[0-9]+$/;

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    if (Job_Tittle === "" || Job_Category === "" || Job_Description === "" || Job_Skill === "" || Job_Price === "") {
        res.send({ message: "Job_Tittle, Job_Category, Job_Description, Job_Skill, Job_Price can't be empty!", status: 400 })
        return res.end()
    }
    if (!onlyNumbersRegex.test(Job_Price)) {
        res.send({ message: "Price should be a number", status: 400 })
        return res.end()
    }
    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "INSERT INTO jobs (user_id, Job_Title, Job_Category, Job_Description, Job_Skill, Job_Price, Created_Date) VALUES (?, ?, ?, ?, ?, ?, ?)"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [user_id, Job_Tittle, Job_Category, Job_Description, Job_Skill, Job_Price, Created_Date], (err, result) => {
            if (result) {
                res.send({ message: "Job Created", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/updateJobListing", (req, res) => {

    const jobId = req.body.jobId;
    const Job_Tittle = req.body.job_tittle;
    const Job_Category = req.body.job_category;
    const Job_Description = req.body.job_description
    const Job_Skill = req.body.job_skill;
    const Job_Price = req.body.job_price;

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }
    if (Job_Tittle === "" || Job_Category === "" || Job_Description === "" || Job_Skill === "" || Job_Price === "") {
        res.send({ message: "Job_Tittle, Job_Category, Job_Description, Job_Skill, Job_Price can't be empty!", status: 400 })
        return res.end()
    }
    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "UPDATE jobs SET Job_Title=?, Job_Category=?, Job_Description=?, Job_Skill=?, Job_Price=? WHERE id = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [Job_Tittle, Job_Category, Job_Description, Job_Skill, Job_Price, jobId], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send({ message: "Job Updated", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/getJobListings", (req, res) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "Select * from jobs"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, (err, result) => {
            if (result) {
                res.send({ message: result, status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
    }
})

app.post("/getUsers", (req, res) => {

    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "Select * from users"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, (err, result) => {
            if (result) {
                res.send({ message: result, status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/getUserListings", (req, res) => {
    const user_id = req.body.user_id
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "Select * from jobs where user_id = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [user_id], (err, result) => {
            if (result) {
                res.send({ message: result, status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/getUserJobListingFavourites", (req, res) => {
    const user_id = req.body.user_id
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "Select * from favourites where userId = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [user_id], (err, result) => {
            if (result) {
                res.send({ message: result, status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/getUserJobApplications", (req, res) => {
    const user_id = req.body.user_id
    let token;
    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "Select * from applications where user_id = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [user_id], (err, result) => {
            if (result) {
                console.log(result)
                res.send({ message: result, status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/deleteJobListing", (req, res) => {

    const listingId = req.body.listingId
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }
    console.log(listingId)
    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "DELETE FROM jobs WHERE id = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [listingId], (err, result) => {
            if (result) {
                res.send({ message: "Job Listing Deleted", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/removeFavouriteJobListing", (req, res) => {

    const jobListingId = req.body.jobId
    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }
    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "DELETE FROM favourites WHERE jobListingID = ?"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [jobListingId], (err, result) => {
            if (result) {
                res.send({ message: "Job Listing Favourite Removed", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/addFavouriteJobListing", (req, res) => {

    const jobListingId = req.body.jobId
    const user_id = req.body.user_id

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "INSERT INTO favourites (jobListingID, userId) VALUES (?, ?)"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [jobListingId, user_id], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send({ message: "Job Listing Favourite Added", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})

app.post("/addJobApplication", (req, res) => {

    const jobListingId = req.body.job_id
    const user_id = req.body.user_id
    const application_reason = req.body.application_reason

    if (application_reason === "") {
        res.send({ message: "application reason can't be empty!", status: 400 })
        return res.end()
    }

    let token;

    if (req.headers.authorization) {
        token = req.headers.authorization.split(" ")[1]
    }

    //INSERT USER DATA TO THE DATABASE
    let sqlInsertUser = "INSERT INTO applications (user_id, job_id, application_reason) VALUES (?, ?, ?)"
    try {
        const decoded = jwt.verify(token, config.jwt_secret)
        db.query(sqlInsertUser, [user_id, jobListingId, application_reason], (err, result) => {
            if (err) {
                console.log(err)
            }
            if (result) {
                res.send({ message: "Job Application Added", status: 200 })
                res.end()
                return
            } else {
                res.send({ message: "An error happened", status: 404 })
                res.end()
            }
        })
    } catch (error) {
        res.send({ message: error, status: 404 })
        res.end()
    }
})


app.listen(config.port, () => {
    console.log("Running on port " + config.port)
})
