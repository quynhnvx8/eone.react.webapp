/** @format */

import { fs } from "@/firebase/firebaseConfig";
import { Select } from "antd";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Props {
  tableName: string;
  mode?: "multiple" | "tags";
  onChange?: () => void;
  value?: "";
}

const FieldDropdown = (props: Props) => {
  const { tableName, mode, onChange, value } = props;
  const [tableReference, setTableReference] = useState<any[]>([]);
  useEffect(() => {
    getTableReference(tableName);
  }, []);
  const getTableReference = (tableName: string) => {
    onSnapshot(collection(fs, `${tableName}`), (snap) => {
      if (snap.empty) {
        setTableReference([]);
      } else {
        const items: any[] = [];

        snap.forEach((item: any) => {
          items.push({
            value: item.id,
            label: item.data().name,
          });
        });
        console.log(items);
        setTableReference(items);
      }
    });
  };
  return (
    <Select
      mode={mode}
      value={value}
      onChange={onChange}
      options={tableReference}
    />
  );
};

export default FieldDropdown;
