import axios from "axios";


const Login = async(userData) =>  {

    try{
       
        console.log(userData);
        //calling the register API
        const returnData = await axios.post("http://localhost:5000/users/login", userData);
        const token = returnData.token;
        console.log(token)

        // varifying the token

        const isValid = await axios.post("http://localhost:5000/users/tokenIsValid", null, {
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });

        if(isValid === true){

            //re-route to the dashboard page
            console.log("I'm In")
        }

        if(isValid === false){
            console.log("Unauthorized");
        }

        

    }catch(err){
        console.log(err)
    }

}

export {
    Login
}