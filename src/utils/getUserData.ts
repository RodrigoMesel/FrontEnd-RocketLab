import axios from "axios";
import { useState, useEffect } from "react";

type UserData = {
  id: number;
  name: string;
  grade: number;
  role: string;
};

export function getUserData(userId: number) {
  const [userData, setUserData] = useState<UserData>({ id: 0, name: "", grade: 0, role: "" });

  useEffect(() => {
    axios
      .get(`http://localhost:3000/colaborator/${userId}`)
      .then((res) => {
        const { id, name, grade, role } = res.data;

        const user: UserData = { id, name, grade, role };

        setUserData(user);
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userId]);

  return userData;
}
