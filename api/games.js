import apiClient from "./base.js"
import qs from 'qs';
export function getOpenGames() {
    return apiClient.get("", { params: { type: 'myOpenGames' } }).then((response) => response.data)
}

export function createGame(teamId1, teamId2) {

    const data = qs.stringify({
        teamId1,
        teamId2,
        type: "game",
        gameType: "TTT",
    })
    return apiClient.post("", data).then((response) => response.data)
}