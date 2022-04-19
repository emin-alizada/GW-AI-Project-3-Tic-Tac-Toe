import apiClient from "./base.js"
import qs from 'qs';
import {teamId} from "./constants.js";

// Tested and working
export const getOpenGames = () => {
    return apiClient.get("", { params: { type: 'myOpenGames' } }).then((response) => response.data)
}

// TODO TEST
export const createGame = (opponentTeamId, boardSize = 3, target = 3) => {
    const data = qs.stringify({
        teamId1: teamId,
        teamId2: opponentTeamId,
        boardSize,
        target,
        type: "game",
        gameType: "TTT",
    })

    return apiClient.post("", data).then((response) => response.data)
}

// TODO TEST
export const makeMove = (gameId) => {
    const data = qs.stringify({
        teamId,
        gameId,
        type: "move",
        move: "0,0",
    })

    return apiClient.post(`/${gameId}`).then((response) => response.data)
}

// TODO TEST
export const getMoves = (gameId, count = 1) => {
    const params = {
        gameId,
        count,
        type: "moves",
    }

    return apiClient.get("", { params }).then((response) => response.data)
}

// TODO TEST
export const getBoardString = (gameId) => {
    const params = {
        gameId,
        type: "boardString",
    }

    return apiClient.get("", { params }).then((response) => response.data)
}