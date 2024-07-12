/** @format */

import { FieldComponent, HeadComponent } from "@/components";
import { appInfo } from "@/constants/appInfos";
import { fs } from "@/firebase/firebaseConfig";
import { adFields } from "@/pages/generalscreen/adField";
import { Button, Space, Table, Tag, Tooltip } from "antd";
import { ColumnProps } from "antd/es/table";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const GeneralScreen = () => {
  const [data, setData] = useState<any[]>([]);

  const router = useRouter();
  const tableName = appInfo.TABLE_NAME;

  useEffect(() => {
    onSnapshot(collection(fs, `${tableName}`), (snap) => {
      if (snap.empty) {
        console.log("Data not found!");
      } else {
        const items: any[] = [];

        snap.forEach((item: any) => {
          items.push({
            id: item.id,
            ...item.data(),
          });
        });
        setData(items);
      }
    });
  }, []);

  const column: ColumnProps<any>[] = adFields.map((field) => ({
    key: field.name,
    dataIndex: field.name,
    title: field.label,
    render:
      field.type == "table"
        ? (id: string) =>
            id &&
            id.length > 0 && (
              <FieldComponent tableName={field.tblReference} id={id} key={id} />
            )
        : field.type == "multitable"
        ? (ids: string[]) =>
            ids &&
            ids.length > 0 && (
              <Space>
                {ids.map((id) => (
                  <Tag>
                    <FieldComponent
                      tableName={field.tblReference}
                      id={id}
                      key={id}
                    />
                  </Tag>
                ))}
              </Space>
            )
        : (value: any, record: any) => value,
  }));
  const columns: any[] = [];
  columns.push(
    {
      title: "Edit",
      align: "left",
      dataIndex: "",
      render: (item: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              icon={<FaEdit color="#676767" size={20} />}
              onClick={() =>
                router.push(`/generalscreen/add-new?id=${item.id}`)
              }
            />
          </Tooltip>
        </Space>
      ),
    },
    ...column
  );

  return (
    <div>
      <HeadComponent
        title="General Screen"
        pageTitle="General Screen"
        extra={
          <Button
            type="primary"
            onClick={() => router.push("/generalscreen/add-new")}
          >
            Add new
          </Button>
        }
      />
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default GeneralScreen;
