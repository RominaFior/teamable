exports.isInvalidEmail = (userObject) => {
    return !userObject.email.includes("@")
}

exports.isEmptyPayload = (payload) => {
    return Object.keys(payload).length === 0
}