import API from "../api/index.js";
import {teamId as myTeamId} from "../api/constants.js";
import {getNextMove} from "./minimax.js";
import Board from "./board.js";
import {asyncFilter, setMiniMaxSymbolsAndExtractGameId, sleep} from "./helpers.js";

const main = async () => {
    while (true) {
        console.log("Starting loop");
        const { myGames } = await API.getOpenGames()
        // console.log(myGames)

        if (myGames.length === 0) {
            console.log('No game available');
            await sleep(5)
            continue;
        }

        const myActiveGames = await asyncFilter(myGames, async (game) => {
            const { gameId, mySymbol } = setMiniMaxSymbolsAndExtractGameId(game);

            const response = await API.getMoves(gameId);
            // console.log(response);

            if (response?.code === "FAIL" && response?.message === "No moves" && mySymbol === 'O') {
                return true;
            }

            if (response?.code === "OK" && response?.moves.length === 0 && mySymbol === 'O') {
                return true;
            }

            if (response?.code === "OK" && response?.moves.length > 0 && response?.moves[0]?.teamId !== myTeamId) {
                return true;
            }

            return false;
        })

        console.log(myActiveGames);

        for (const game of myActiveGames) {
            const { gameId, mySymbol, opSymbol } = setMiniMaxSymbolsAndExtractGameId(game);

            const { output, target } = await API.getBoardString(gameId);
            // console.log(output);
            // console.log(target);

            const board = Board.createFromString(output, target, mySymbol, opSymbol);

            if (!board.anyMovesRemain()) {
                console.log('No moves remain');
                continue;
            }

            const move = getNextMove(board);
            console.log(move);

            const response = await API.makeMove(gameId, move.toString());
            console.log(response);
        }

        console.log("end of loop");
        await sleep(5)
    }
}

await main();

// console.log(await API.createGame(opponentTeamId));
// console.log(await API.createTeam('team2testing'));
// console.log(await API.getTeamMembers());
// console.log(await API.getOpenGames());