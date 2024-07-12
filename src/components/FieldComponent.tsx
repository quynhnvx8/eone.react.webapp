/** @format */

import { fs } from "@/firebase/firebaseConfig";
import { CategoryModel } from "@/models/CategoryModel";
import { Avatar } from "antd";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

type Props = {
  id?: string;
  tableName?: string;
};

const FieldComponent = (props: Props) => {
  const { id, tableName } = props;
  const [data, setData] = useState<any>();

  useEffect(() => {
    id && getTableName();
  }, [id]);

  const getTableName = async () => {
    const api = `${`${tableName}`}/${id}`;
    try {
      const snap: any = await getDoc(doc(fs, api));
      if (snap.exists()) {
        setData({
          id: snap.id,
          ...snap.data(),
        });
      } else {
        console.log(`file not found`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return data ? data.title : "";
};

export default FieldComponent;
