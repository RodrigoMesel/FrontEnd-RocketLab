import axios from "axios";
import { useState, useEffect } from "react";

export function getUserData(userId : number) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/colaborator/${userId}`)
      .then((res) => {
        const { id, name, grade, role } = res.data;

        const user = { id, name, grade, role };
        
        //setUserData(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return userData;
}
