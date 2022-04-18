import qs from 'qs';
import apiClient from "./base.js"

export const getTeamMembers = () => {
    let params = {
        type: "team",
        teamId: "1321"
    }
    return apiClient.get("/", { params }).then((response) => response.data)
}

export const createTeam = (name) => {
    const data = qs.stringify({
        'name': name,
        'type': 'team'
    });
    return apiClient.post("/", data).then((response) => response.data)
}

export const addTeamMember = (name) => {
    const data = qs.stringify({
        type: 'member',
        userId: '1097',
        teamId: '1321',
    })
    return apiClient.post("/", data).then((response) => response.data)
}