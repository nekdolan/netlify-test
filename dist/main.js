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
            // TODO handle subscription management
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
    const body = { send: 1 }
    const token = user ? await netlifyIdentity.currentUser().jwt(true) : false;
    const data = await fetch('/.netlify/functions/get-protected-content', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    }).then(response => response.json())
    // console.log(data)
    document.getElementById('output').innerHTML = JSON.stringify(data, null, 2)
}

netlifyIdentity.on('init', handleUserStateChange);
netlifyIdentity.on('login', handleUserStateChange);
netlifyIdentity.on('logout', handleUserStateChange);

document.getElementById('output').innerHTML = out