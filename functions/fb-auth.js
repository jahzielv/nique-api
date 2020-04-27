const fetch = require("node-fetch");
const FB_APP_ID = process.env.FB_APP_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

async function getData() {
    let response = await fetch(
        `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
            REDIRECT_URI
        )}&client_secret=${FB_APP_SECRET}&code=${data}`
    );
    let json = await response.json();
    return json;
}

exports.handler = async (event, context) => {
    const data = event["queryStringParameters"]["code"];
    console.log("Function `fb-auth` invoked", data);

    let fbResData = await getData();
    return { statusCode: 200, body: fbResData };
};
