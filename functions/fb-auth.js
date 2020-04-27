const fetch = require("node-fetch");
const util = require("util");
const FB_APP_ID = process.env.FB_APP_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

exports.handler = async (event, context) => {
    const data = event["queryStringParameters"]["code"];
    console.log("Function `fb-auth` invoked", data);

    try {
        let response = await fetch(
            `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${REDIRECT_URI}&client_secret=${FB_APP_SECRET}&code=${data}`
        );
        console.log("fetched data");
        let jsonData = await response.json();
        console.log(`got json data: ${util.inspect(jsonData)}`);
        const apiRes = { statusCode: 202, body: jsonData };
        return apiRes;
    } catch (error) {
        console.log("ERROR", error);
        return { statusCode: 511, body: "we big failed" };
    }
};
