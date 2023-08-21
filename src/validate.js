import { memo, useEffect,useState } from "react";

export function Validate(props){
    let xx = {
        username:"as",
        pass:"dgf"
    }
    const user = props.user
    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
          const foundUser = JSON.parse(loggedInUser);
          setUser(foundUser);
        }
      }, []);
      return (
        user
      ) 
}

