import handleUser from "@/apis/handleUser";
import { Button } from "antd";
import axios from "axios";
import React from "react";

const Home = () => {
  const fetchData = async () => {
    const data = {
      userName: "DM",
      password: "1",
      parameters: {
        languageName: "Việt Nam",
        languageCode: "vi_VN",
      },
    };
    try {
      const res = await axios({
        url: "http://192.168.1.3:8090/auth/token",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data,
      });
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (error) {
      console.error("error");
    }
  };
  return (
    <div className="mt-3">
      <Button onClick={() => fetchData()} type="primary">
        OK
      </Button>
    </div>
  );
};

export default Home;
