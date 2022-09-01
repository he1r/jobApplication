import { DefaultService } from "openapi"
import store from "@utils/redux/store"
import { Login } from "@utils/redux/features/user"
import { setToken } from "@utils/authorization"
import { updatejobListings } from "@utils/redux/features/jobListings"
import { updateUsers } from "@utils/redux/features/users"
import { updateUserJobListings } from "@utils/redux/features/userJobListings"
import { updateFavouriteJobListings } from "@utils/redux/features/favouriteJobListings"
import { updateUserJobApplications } from "./redux/features/jobApplications"

export const login = (email: string, password: string) => {
    const promise = DefaultService.login({ email: email, password: password })
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(Login(res.user.data))
        } else {
            console.log(res.message)
        }
    }).catch((err) => {
        console.error(err)
    })
    return promise
}
export const signUp = (name: string, surname: string, birthday: string, email: string, password: string, role: string) => {
    const promise = DefaultService.signUp({ name: name, surname: surname, birthday: birthday, email: email, password: password, role: role })
    promise.catch((err) => {
        console.error(err)
    })
    return promise
}

export const createJobListing = (userId: string, job_tittle: string, job_skill: string, job_price: string, job_description: string, job_category: string, token: string) => {
    setToken(token)
    const promise = DefaultService.createJob({ user_id: userId, job_tittle: job_tittle, job_skill: job_skill, job_price: job_price, job_description: job_description, job_category: job_category })
    return promise;
}

export const getJobListings = (token: string) => {
    setToken(token)
    const promise = DefaultService.getAllJobLstings();
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(updatejobListings(res.message))
        } else {
            console.log(res.message)
        }
    }).catch((err) => {
        console.log(err)
    })
    return promise;
}

export const getAllUsers = (token: string) => {
    setToken(token);
    const promise = DefaultService.getAllUsers()
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(updateUsers(res.message))
        } else {
            console.log(res.message)
        }
    }).catch((err) => {
        console.log(err)
    })
    return promise
}

export const getUserJobListings = (user_id: string, token: string) => {
    setToken(token)
    const promise = DefaultService.getUserListings({ user_id: user_id })
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(updateUserJobListings(res.message))
        } else {
            console.log(res.message)
        }
    }).catch((err) => {
        console.log(err)
    })
    return promise
}

export const deleteJobListing = (listingId: string, token: string) => {
    setToken(token)
    const promise = DefaultService.deleteJobListing({ listingId: listingId })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}

export const updateJobListing = (jobId: string, job_tittle: string, job_skill: string, job_price: string, job_description: string, job_category: string, token: string) => {
    setToken(token)
    const promise = DefaultService.updateJobListing({ jobId: jobId, job_tittle: job_tittle, job_skill: job_skill, job_price: job_price, job_description: job_description, job_category: job_category })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}

export const updateUser = (userId: string, name: string, surname: string, birthday: string, email: string, role: string, token: string) => {
    setToken(token)
    const promise = DefaultService.updateUser({ userId: userId, name: name, surname: surname, birthday: birthday, email: email, role: role })
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(Login(res.user))
        } else {
            console.log(res.message)
        }
    })
    return promise
}

export const removeFavouriteJobListing = (jobId: string, token: string) => {
    setToken(token)
    const promise = DefaultService.removeFavouriteJobListing({ jobId: jobId })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}

export const addFavouriteJobListing = (jobId: string, userId: string, token: string) => {
    setToken(token)
    const promise = DefaultService.addFavouriteJobListing({ jobId: jobId, user_id: userId })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}

export const getUserFavouriteJobListings = (userId: string, token: string) => {
    setToken(token)
    const promise = DefaultService.getUserJobListingFavourites({ user_id: userId })
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(updateFavouriteJobListings(res.message))
        } else {
            console.log(res.message)
        }
    })
    return promise
}

export const addJobApplication = (user_id: string, job_id: string, application_reason: string, token: string) => {
    setToken(token)
    const promise = DefaultService.addJobApplication({ job_id: job_id, user_id: user_id, application_reason: application_reason })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}

export const getUserJobApplications = (user_id: string, token: string) => {
    setToken(token)
    const promise = DefaultService.getUserJobApplications({ user_id: user_id })
    promise.then((res: any) => {
        if (res.status === 200) {
            store.dispatch(updateUserJobApplications(res.message))
        }
    })
}

export const updatePassword = (oldPassword: string, newPassword: string, confirmPassword: string, id: string, token: string) => {
    setToken(token)
    const promise = DefaultService.updatePassword({ id: id, oldPassword: oldPassword, newPassword: newPassword, confirmPassword: confirmPassword })
    promise.catch((err) => {
        console.log(err)
    })
    return promise
}