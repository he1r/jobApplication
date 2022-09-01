/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * user login
     * user login
     * @param requestBody body login
     * @throws ApiError
     */
    public static login(
requestBody: {
email: string;
password: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * user SignUp
     * userSignUp
     * @param requestBody body signUp
     * @throws ApiError
     */
    public static signUp(
requestBody: {
name: string;
surname: string;
email: string;
birthday: string;
password: string;
role: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/signUp',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * user SignUp
     * @param requestBody 
     * @throws ApiError
     */
    public static updateUser(
requestBody: {
userId: string;
name: string;
surname: string;
email: string;
birthday: string;
role: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/updateUser',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * recruiter creates job listing
     * createJobListing
     * @param requestBody body create job listing
     * @throws ApiError
     */
    public static createJob(
requestBody: {
user_id: string;
job_tittle: string;
job_category: string;
job_description: string;
job_skill: string;
job_price: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/createJobListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * recruiter updates job listing
     * @param requestBody body update job listing
     * @throws ApiError
     */
    public static updateJobListing(
requestBody: {
jobId: string;
job_tittle: string;
job_category: string;
job_description: string;
job_skill: string;
job_price: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/updateJobListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * adds a favourite listing for the user
     * @param requestBody 
     * @throws ApiError
     */
    public static addFavouriteJobListing(
requestBody: {
jobId: string;
user_id: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/addFavouriteJobListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * adds a jobApplication for the user
     * @param requestBody 
     * @throws ApiError
     */
    public static addJobApplication(
requestBody: {
job_id: string;
user_id: string;
application_reason: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/addJobApplication',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * gets all user job applications
     * @param requestBody 
     * @throws ApiError
     */
    public static getUserJobApplications(
requestBody: {
user_id: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/getUserJobApplications',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * adds a favourite listing for the user
     * @param requestBody 
     * @throws ApiError
     */
    public static removeFavouriteJobListing(
requestBody: {
jobId: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/removeFavouriteJobListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * update user password
     * @param requestBody 
     * @throws ApiError
     */
    public static updatePassword(
requestBody: {
id: string;
oldPassword: string;
newPassword: string;
confirmPassword: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/updatePassword',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * gets all job listings
     * @throws ApiError
     */
    public static getAllJobLstings(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/getJobListings',
        });
    }

    /**
     * gets all user job listings favourites
     * @param requestBody 
     * @throws ApiError
     */
    public static getUserJobListingFavourites(
requestBody: {
user_id: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/getUserJobListingFavourites',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * gets all users
     * getUsers
     * @throws ApiError
     */
    public static getAllUsers(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/getUsers',
        });
    }

    /**
     * gets all user listings
     * getUserListings
     * @param requestBody job listings for the user
     * @throws ApiError
     */
    public static getUserListings(
requestBody: {
user_id: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/getUserListings',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * deletes a jobListing
     * deletes a job listing
     * @param requestBody job listing id
     * @throws ApiError
     */
    public static deleteJobListing(
requestBody: {
listingId: string;
},
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/deleteJobListing',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}
