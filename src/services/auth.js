//collect token and username to session storage

export const auth = (res, next) => {
    if (window !== "undefined") {
        //collect data to session storage
        sessionStorage.setItem("token", JSON.stringify(res.data.token))
        sessionStorage.setItem("user", JSON.stringify(res.data.username))
    }
    next()
}

//Push token
export const getToken = () => {
    if(window !== "undefined") {
        if(sessionStorage.getItem("token")) {
            return JSON.parse(sessionStorage.getItem("token"))
        } else {
            return false
        }
    }
}

//Push user
export const getUser = () => {
    if(window !== "undefined") {
        if(sessionStorage.getItem("user")) {
            return JSON.parse(sessionStorage.getItem("user"))
        } else {
            return false
        }
    }
}

export const logout = (next) => {
    if(window !== "undefined") {
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("user")
    }
    next()
}