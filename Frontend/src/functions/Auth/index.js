import axios from "axios";

const Register = async(userData) => (e) => {
    
    try{
        e.preventDefault();

        //calling the register API
        await axios.post("http://localhost:5000/users/register", userData);

        //re-route to the dashboard page

    }catch(err){
        console.log(err)
    }

}

const Login = async(userData) => (e) => {

    try{
        e.preventDefault();

        //calling the register API
        const returnData = await axios.post("http://localhost:5000/users/login", userData);
        const token = returnData.token;

        // varifying the token

        const isValid = await axios.post("http://localhost:5000/users/tokenIsValid", {}, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if(isValid === true){

            //re-route to the dashboard page
        }

        if(isValid === false){
            console.log("Unauthorized");
        }

        

    }catch(err){
        console.log(err)
    }

}

export {
    Signup,
    Signin
}