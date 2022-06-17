const filterUserObject = (user) => {
    // before we send loggedIn user data to the client we need to omit some properties
    // those are listed downed first in the destructuring statement below

    const { 
        password,
        secret,
        created_by,
        created_ip,
        created_time,
        modified_by,
        modified_ip,
        modified_time,
        deleted,
        ...filteredUser } = user
    
    // return filteredUSer
    return filteredUser
}

module.exports = { filterUserObject };