// netlify dev --live
let out = 'JS ok2'

const button1 = document.getElementById('left');
const button2 = document.getElementById('right');
const login = () => netlifyIdentity.open('login');
const signup = () => netlifyIdentity.open('signup');

button1.addEventListener('click', login);
button2.addEventListener('click', signup);

const updateUserInfo = (user) => {
    const container = document.querySelector('.user-info');

    // cloning the buttons removes existing event listeners
    const b1 = button1.cloneNode(true);
    const b2 = button2.cloneNode(true);

    // empty the user info div
    container.innerHTML = '';

    if (user) {
        b1.innerText = 'Log Out';
        b1.addEventListener('click', () => {
            netlifyIdentity.logout();
        });

        b2.innerText = 'Manage Subscription';
        b2.addEventListener('click', () => {
            fetch('/.netlify/functions/create-manage-link', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token.access_token}`,
                },
            })
            .then((res) => res.json())
            .then((link) => {
                window.location.href = link;
            })
            .catch((err) => console.error(err));
        });
    } else {
        // if no one is logged in, show login/signup options
        b1.innerText = 'Log In';
        b1.addEventListener('click', login);

        b2.innerText = 'Sign Up';
        b2.addEventListener('click', signup);
    }

    // add the updated buttons back to the user info div
    container.appendChild(b1);
    container.appendChild(b2);


};

const handleUserStateChange = (user) => {
    updateUserInfo(user);
    loadSubscriptionContent(user);
};

const loadSubscriptionContent = async (user) => {
    // console.log(user)
    const body = { send: 1 }
    const token = user ? await netlifyIdentity.currentUser().jwt(true) : false;

    if (!token) {
        console.log('no token')
        return
    }
    // if (user.app_metadata.roles && user.app_metadata.roles.length === 0) {
    //     const signup = await fetch('/.netlify/functions/signup', {
    //         method: 'POST',
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         },
    //         body: JSON.stringify(body),
    //     }).then(function (response) {
    //         if (!response.ok) {
    //             return null
    //         }
    //         return response.json()
    //     })
    //     console.log('/**********/')
    //     console.log(signup)
    //     console.log('\\**********\\')
    // }

    const data = await fetch('/.netlify/functions/get-protected-content', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    }).then(function (response) {
        if (!response.ok) {
            return null
        }
        return response.json()
    })
    console.log(data)
}

netlifyIdentity.on('init', handleUserStateChange);
netlifyIdentity.on('login', handleUserStateChange);
netlifyIdentity.on('logout', handleUserStateChange);

// document.getElementById('output').innerHTML = out