import {teamId as myTeamId} from "../api/constants.js";

export const sleep = s => new Promise(r => setTimeout(r, s * 1000));

export const asyncFilter = async (arr, predicate) => Promise.all(arr.map(predicate))
    .then((results) => arr.filter((_v, index) => results[index]));

export const setMiniMaxSymbolsAndExtractGameId = (game) => {
    const gameId = Object.keys(game)[0];
    const [team1Id, team2Id] = game[gameId].split(':');

    const mySymbol = team1Id === myTeamId ? 'O' : 'X';
    const opSymbol = team1Id === myTeamId ? 'X' : 'O';

    return {gameId, team1Id, team2Id, mySymbol, opSymbol};
};