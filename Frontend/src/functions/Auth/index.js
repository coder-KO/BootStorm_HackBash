import axios from "axios";

const Signup = async(event, userData) => {
    try{
        event.preventDefault();

        //calling the register API
        await axios.post("http://localhost:5000/users/register", userData);

        //re-route to the dashboard page

    }catch(err){
        console.log(err)
    }

}

const Signin = async(event, userData) => {

    try{
        event.preventDefault();

        //calling the register API
        await axios.post("http://localhost:5000/users/login", userData);

        //re-route to the dashboard page

    }catch(err){
        console.log(err)
    }

}

export {
    Signup,
    Signin
}