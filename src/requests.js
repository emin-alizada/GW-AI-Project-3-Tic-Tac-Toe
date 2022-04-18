import axios from "axios";
import FormData from 'form-data';
import qs from 'qs';

axios.defaults.baseURL = 'https://www.notexponential.com/aip2pgaming/api/index.php';
axios.defaults.headers.common['userId'] = "1097";
axios.defaults.headers.common['x-api-key'] = "d4e411860e5bc0ce0739";
axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded";

const teamId = "1321";

export const createGame = (teamId1, teamId2) => {
    // TODO test it
    const data = qs.stringify({
        teamId1,
        teamId2,
        type: "game",
        gameType: "TTT",
    })

    axios.post("", data)
        .then((response) => response.data)
        .then((data) => {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const createTeam = () => {
    const data = qs.stringify({
        'name': 'team2',
        'type': 'team'
    });

    axios.post("/", data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const addTeamMember = () => {
    const data = qs.stringify({
        type: 'member',
        userId: '1097',
        teamId: '1321',
    })

    axios.post("/", data)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const getTeamMembers = () => {
    axios.get("/", {
        params: {
            type: "team",
            teamId
        }
    })
        .then((response) => response.data)
        .then((data) => {
            console.log("success");
            console.log(data);
        })
        .catch((error) => {
            console.log("in error")
            console.dir(error.message);
        });
}
