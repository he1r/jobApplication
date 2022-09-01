import { NextApiRequest } from "next/types";
import { OpenAPI } from "openapi"
import { CookieNames } from "@utils/enums";
import cookie from "cookie"

export const setToken = (token: string) => {
    OpenAPI.TOKEN = token;
}

const getUserData = (req) => {
    let data = cookie.parse(req ? req.headers.cookie || "" : document.cookie);
    if (data.user) data.user = JSON.parse(data.user);
    return data.user;
}

export function setUserCookie(setCookie, user: any) {
    setCookie(CookieNames.USER, JSON.stringify(user), {
        path: "/",
        sameSite: true
    });
}

export const redirectIfNotAuthorized = (req: NextApiRequest,
    redirectTo: string) => {
    const data = getUserData(req)
    if (!data || Object.keys(data).length === 0) {
        return {
            redirect: {
                permanent: false,
                destination: redirectTo
            }
        };
    } else {
        return {
            props: data
        }
    }
}