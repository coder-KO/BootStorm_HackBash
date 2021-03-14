import React,{useContext} from "react";
import { UserContext } from "../../context/UserContext";


export default function DocumentList() {
  const {userData} = useContext(UserContext)
  console.log(userData)

  return <div>
    <p>All uploaded docs</p>
    <ul>
      {
        userData.user.signed_docs.map((doc,key) => {
          return (
            <li>
              {/* <object
              data={
                  doc
              }
              width="600"
              height="400"
            ></object> */}
            <a href={doc} target="_blank">Document - {key}</a>
            </li>
          )
        })
      }
    </ul>
  </div>;
}
