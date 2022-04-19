import MiniMax from "./minimax.js";
import {teamId as myTeamId} from "../api/constants.js";

export const sleep = s => new Promise(r => setTimeout(r, s * 1000));

export const setMiniMaxSymbolsAndExtractGameId = (game) => {
    const gameId = Object.keys(game)[0];
    const [team1Id, team2Id] = game[gameId].split(':');

    MiniMax.mySymbol = team1Id === myTeamId ? 'O' : 'X';
    MiniMax.opSymbol = team1Id === myTeamId ? 'X' : 'O';

    return {gameId, team1Id, team2Id};
};