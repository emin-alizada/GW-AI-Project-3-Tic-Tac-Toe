import axios from "axios";
import FormData from 'form-data';

// axios.defaults.baseURL = 'https://www.notexponential.com/aip2pgaming/api/index.php';
// axios.defaults.headers.common['userId'] = "1097";
// axios.defaults.headers.common['x-api-key'] = "d4e411860e5bc0ce0739";
// axios.defaults.headers.common['Accept'] = "*/*";

const teamId = "1321";

export const createGame = (teamId1, teamId2) => {
    // TODO test it
    axios.post("", {
        teamId1,
        teamId2,
        type: "game",
        gameType: "TTT",
    })
        .then((response) => response.data)
        .then((data) => {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        });
}

export const createTeam = () => {
    // TODO test it

    var data = new FormData();
    data.append('type', 'team');
    data.append('name', 'team2');

    var config = {
        method: 'post',
        url: 'https://www.notexponential.com/aip2pgaming/api/index.php',
        headers: {
            'userId': '1097',
            'x-api-key': 'd4e411860e5bc0ce0739',
            // 'Accept': 'text/html',
            // ...data.getHeaders(),
            // "Accept-Encoding": "gzip, deflate, br",
            // 'Content-Type': 'multipart/form-data',
            // "Connection": "keep-alive",
            "Content-Type": 'application/json',
        },
        data : data
    };

    console.log(config.headers);

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error.message);
        });

}

export const addTeamMember = () => {
    // text/html; charset=UTF-8

    var data = new FormData();
    data.append('type', 'member');
    data.append('userId', '1097');
    data.append('teamId', '1321');

    var config = {
        method: 'post',
        url: 'https://www.notexponential.com/aip2pgaming/api/index.php',
        headers: {
            'userId': '1097',
            'x-api-key': 'd4e411860e5bc0ce0739',

            ...data.getHeaders()
        },
        data : data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error.message);
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
