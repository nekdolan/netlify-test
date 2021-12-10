// {
//   "exp": 1639162246,
//   "sub": "7efdb22c-7747-4fbc-acc2-1de3eb09ce7b",
//   "email": "trinimac@protonmail.com",
//   "app_metadata": {
//     "provider": "email",
//     "roles": [
//       "pro"
//     ]
//   },
//   "user_metadata": {
//     "full_name": "Daniel"
//   }
// }

exports.handler = async (event, context) => {
    // const {type} = JSON.parse(event.body);
    const {user} = context.clientContext;
    // const roles = user ? user.app_metadata.roles : false;
    // const {allowedRoles} = content[type];
    //
    // if (!roles || !roles.some(role => allowedRoles.includes(role))) {
    //     return {
    //         statusCode: 402,
    //         body: JSON.stringify({
    //             message: `This content requires a ${type} subscription.`,
    //         }),
    //     };
    // }
    // console.log(user)

    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
}