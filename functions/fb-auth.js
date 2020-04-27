const fetch = require("node-fetch");
const util = require("util");
const FB_APP_ID = process.env.FB_APP_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

exports.handler = async (event, context) => {
    const data = event["queryStringParameters"]["code"];
    console.log("Function `fb-auth` invoked", data);
    console.log(
        `FB_APP_ID: ${FB_APP_ID}, REDIRECT_URI: ${REDIRECT_URI}, FB_APP_SECRET: ${FB_APP_SECRET}`
    );

    try {
        let response = await fetch(
            `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
                REDIRECT_URI
            )}&client_secret=${FB_APP_SECRET}&code=${data}`
        );
        console.log("fetched data");
        let jsonData = await response.json();
        console.log(`got json data: ${util.inspect(jsonData)}`);
        if (jsonData.error) {
            return { statusCode: 500, body: JSON.stringify(jsonData) };
        }
        const apiRes = { statusCode: 202, body: JSON.stringify(jsonData) };
        return apiRes;
    } catch (error) {
        console.log("ERROR", error);
        return error;
    }
};
