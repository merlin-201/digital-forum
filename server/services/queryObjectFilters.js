// below functions are used to omit some properties from the object returned after a database query
// Ex : porperties like password & secret should not be sent as API response to the client

const commonFilters = (obj) => {
    const { 
        created_by,
        created_ip,
        created_time,
        modified_by,
        modified_ip,
        modified_time,
        deleted,
        ...filteredObj } = obj;
    
    // return filteredUSer
    return filteredObj;
}

exports.filterUserObject = (user) => {
    // before we send loggedIn user data to the client we need to omit some properties
    // those are listed downed first in the destructuring statement below

    user = commonFilters(user);

    const { 
        password,
        secret,
        ...filteredUser } = user
    
    // return filteredUSer
    return filteredUser
}

exports.filterCategoryObject = (category) => {

    category = commonFilters(category);

    //nothing more to omit
    const {
        ...filteredCategory } = category;

    return filteredCategory;
}

exports.filterTopicObject = (topic) => {

    topic = commonFilters(topic);

    //nothing more to omit
    const {
        ...filteredTopic } = topic;

    return filteredTopic;
}


exports.filterPostObject = (post) => {


    //nothing more to omit
    const {
        created_by,
        created_ip,
        modified_by,
        modified_ip,
        modified_time,
        deleted,
        filtered_out,
        filtered_out_by,
        moderated_out,
        moderated_out_by,
        ...filteredPost } = post;

    return filteredPost;
}
