// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const { faunaFetch } = require('./utils/fauna');
// const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

function getPath(fileName) {
    return (process.env.LAMBDA_TASK_ROOT)? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName):path.resolve(__dirname, fileName)
}

exports.handler = async (data, context, callback) => {
// const fileName = "./zipped-function/some-other.js"
// const resolved = (process.env.LAMBDA_TASK_ROOT)? path.resolve(process.env.LAMBDA_TASK_ROOT, fileName):path.resolve(__dirname, fileName)
    try {
        // const content = await fs.readFile(path.join(__dirname, "data/test.txt"), {
        const content = await fs.readFile(getPath("./data/test.txt"), {
        // const content = await fs.readFile(path.join("./data/test.txt"), {
            encoding: "utf-8"
        });
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'text/plain',
            },
            body: content
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: {message: e.message}
        };
    }

    // const {user, identity} = context.clientContext;
    // if (!user) {
    //     return {
    //         statusCode: 401,
    //         body: '{}'
    //     }
    // }
    // const result = await faunaFetch({
    //     query: `
    //   query ($netlifyID: ID!) {
    //     getUserByNetlifyID(netlifyID: $netlifyID) {
    //       stripeID
    //     }
    //   }
    // `,
    //     variables: {
    //         netlifyID: user.sub,
    //     },
    // });
    //
    // if (!result.errors || user.app_metadata.roles.length) {
    //     return {
    //         statusCode: 200,
    //         body: '{}'
    //     }
    // }
}
    // const customer = await stripe.customers.create({ email: user.email });
    //
    // // subscribe the new customer to the free plan
    // await stripe.subscriptions.create({
    //     customer: customer.id,
    //     items: [{ price: process.env.STRIPE_FREE_PLAN }],
    // });
    //
    // // store the Netlify and Stripe IDs in Fauna
    // await faunaFetch({
    //     query: `
    //   mutation ($netlifyID: ID!, $stripeID: ID!) {
    //     createUser(data: { netlifyID: $netlifyID, stripeID: $stripeID }) {
    //       netlifyID
    //       stripeID
    //     }
    //   }
    // `,
    //     variables: {
    //         netlifyID: user.sub,
    //         stripeID: customer.id,
    //     },
    // });

    // const debugUrl = 'https://ecstatic-mccarthy-e13f1b.netlify.app/.netlify/identity'
//
//     const result2 = await fetch(`${identity.url}/admin/users/${user.sub}`, {
//     // const result2 = await fetch(`${debugUrl}/admin/users/${user.sub}`, {
//         method: 'PUT',
//         headers: {
//             // note that this is a special admin token for the Identity API
//             Authorization: `Bearer ${identity.token}`,
//         },
//         body: JSON.stringify({
//             app_metadata: {
//                 roles: ['free'],
//             },
//         }),
//     }).then((res) => res.json())
//     .catch((err) => console.error(JSON.stringify(err, null, 2)));
//
//     return {
//         statusCode: 200,
//         body: JSON.stringify({result2, identity, url: `${identity.url}/admin/users/${user.sub}`}),
//         // body: JSON.stringify({status: 'ok'}),
//         // body: '{"r": 1}',
//     };
// }