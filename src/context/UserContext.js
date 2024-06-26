import { createContext } from 'react';

// our user context is a global object that can be accesed from anywhere in our application
// when we set up context, we're setting up the shape of the data which are our default values
const UserContext = createContext({
    user: { name: '', isLoggedIn: false },
    // this will be the function that we use in order to modify our user
    setUser: () => {}
})

export default UserContext;