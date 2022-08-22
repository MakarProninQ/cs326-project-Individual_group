async function readActivities(curUserId) {
    const res = await fetch(`/private/${curUserId}/activities/readMany`);
    return res;
}

async function sendLoginInofmation(username, password) {
    const res = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify( {username: username, password: password } ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

async function updateMyActivities(curUserId, activityId) {
    const res = await fetch(`/private/${curUserId}/activities/delete`, {
        method: 'DELETE',
        body: JSON.stringify( {activityId: activityId} ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

async function deleteAccount(curUserId){
    const res = await fetch(`/private/${curUserId}/user/delete`, {
        method: 'DELETE',
    });
    return res;
}

async function createActivity(curUserId, newActivityObj) {
    const res = await fetch(`/private/${curUserId}/activities/create`, {
        method: 'POST',
        body: JSON.stringify( newActivityObj ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

async function changePassword(curUserId, newPasswordInput, oldPasswordInput){
    const res = await fetch(`/private/${curUserId}/user/updatePassword`, {
        method: 'PUT',
        body: JSON.stringify( {newPassword: newPasswordInput, oldPassword: oldPasswordInput} ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

async function addComment(curUserId, activityId, comments) {
    const res = await fetch(`/private/${curUserId}/activities/updateComments`, {
        method: 'PUT',
        body: JSON.stringify({activityId: activityId, comments: comments}),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

async function loadMoreMyActivitiesWithParam(curUserId, lastActivityId) {
    const res = await fetch(`/private/${curUserId}/user/readMyActivities?lastActivityId=${lastActivityId}`);
    return res;
}

async function loadMoreActivitiesWithParam(curUserId, lastActivityId) {
    const res = await fetch(`/private/${curUserId}/activities/readMany?lastActivityId=${lastActivityId}`);
    return res;
}

async function readMyActivities(curUserId) {
    const res = await fetch(`/private/${curUserId}/user/readMyActivities`);
    return res;
}

async function sendSignUpInformation(newUsernameInput, newPasswordInput) {
    const res = fetch('/signup', {
            method: 'POST',
            body: JSON.stringify( {username: newUsernameInput, password: newPasswordInput } ),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    return res;
}

async function logOut() {
    const res = fetch('/logout');
    return res;
}

async function joinActivity(curUserId, activityId) {
    const res = await fetch(`/private/${curUserId}/user/updateMyActivities`, {
        method: 'PUT',
        body: JSON.stringify( {activityId: activityId} ),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return res;
}

export {readActivities, 
    sendLoginInofmation, 
    updateMyActivities, 
    deleteAccount,
    createActivity,
    changePassword,
    addComment,
    loadMoreMyActivitiesWithParam,
    loadMoreActivitiesWithParam,
    readMyActivities,
    sendSignUpInformation,
    logOut,
    joinActivity,
    };