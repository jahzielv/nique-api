const fetch = require("node-fetch");
const FB_APP_ID = process.env.FB_APP_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;
const FB_APP_SECRET = process.env.FB_APP_SECRET;

exports.handler = async (event, context) => {
    const data = event["queryStringParameters"]["code"];
    console.log("Function `fb-auth` invoked", data);

    const promise = new Promise((resolve, reject) => {
        fetch(
            `https://graph.facebook.com/v6.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(
                REDIRECT_URI
            )}&client_secret=${FB_APP_SECRET}&code=${data}`
        )
            .then((res) => res.json())
            .then((data) => resolve(JSON.stringify({ statusCode: 201, body: data })))
            .catch((err) => reject(err));
    });
    return promise;
};
