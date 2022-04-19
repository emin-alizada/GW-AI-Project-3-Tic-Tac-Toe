import API from "../api/index.js";
import {teamId as myTeamId} from "../api/constants.js";
import {getNextMove} from "./minimax.js";
import Board from "./board.js";
import {setMiniMaxSymbolsAndExtractGameId, sleep} from "./helpers.js";

while (true) {
    const { myGames } = await API.getOpenGames()
    // let myGames = [ { '3541': '1321:1324:O' } ]

    // console.log(myGames)

    if (myGames.length === 0) {
        console.log('No game available');
        await sleep(5)
        continue;
    }

    const myActiveGames = myGames.filter(async (game) => {
        const { gameId, mySymbol } = setMiniMaxSymbolsAndExtractGameId(game);

        const response = await API.getMoves(gameId);
        // console.log(response);

        if (response?.code === "FAIL" && response?.message === "No moves" && mySymbol === 'O') {
            return true;
        }

        if (response?.code === "OK" && response?.moves.length === 0 && mySymbol === 'O') {
            return true;
        }

        if (response?.code === "OK" && response?.moves.length > 0 && response?.moves[0]?.teamId === myTeamId) {
            return true;
        }

        return false;
    })

    myActiveGames.forEach(async (game) => {
        const { gameId, mySymbol, opSymbol } = setMiniMaxSymbolsAndExtractGameId(game);

        const { output, target } = await API.getBoardString(gameId);
        // console.log(output);
        // console.log(target);

        const board = Board.createFromString(output, target, mySymbol, opSymbol);

        if (!board.anyMovesRemain()) {
            console.log('No moves remain');
            return;
        }

        const move = getNextMove(board);
        console.log(move);
    })

    console.log("end of loop");
    await sleep(5)
}








// let myMoveExisted = false;
//
// for (let i = 0; i < myGames.length; i++) {
//     const gameId = Object.keys(myGames[i])[0];
//     const [team1Id, team2Id] = myGames[i][gameId].split(':');
//
//     MiniMax.mySymbol = team1Id === myTeamId ? 'O' : 'X';
//     MiniMax.opSymbol = team1Id === myTeamId ? 'X' : 'O';
//
//     const response = await API.getMoves(gameId);
//     console.log(response);
//
//     if (response?.code === "FAIL" && response?.message === "No moves" && MiniMax.mySymbol === 'O') {
//         myMoveExisted = true;
//     }
//
//     if (response?.code === "OK" && response?.moves.length === 0 && MiniMax.mySymbol === 'O') {
//         myMoveExisted = true;
//     }
//
//     if (response?.code === "OK" && response?.moves.length > 0 && response?.moves[0]?.teamId === myTeamId) {
//         myMoveExisted = true;
//     }
// }







// console.log(await API.createGame(opponentTeamId));
// console.log(await API.createTeam('team2testing'));
// console.log(await API.getTeamMembers());
// console.log(await API.getOpenGames());

// 3541