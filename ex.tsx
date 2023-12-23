"use client";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Layout,
  MenuProps,
  Row,
  Space,
} from "antd";
import {
  SearchOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { AUTH_KEY } from "@/constants/storageKey";
import Image from "next/image";
import img from "@/assets/logo.png";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { useState } from "react";
import Link from "next/link";
const { Header: AntHeader } = Layout;

const SEClientHeader = () => {
  const router = useRouter();
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const { data, isLoading } = useCategoriesQuery({ ...query });
  const categories = data?.categories;

  const logOut = () => {
    removeUserInfo(AUTH_KEY);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Link href={`/user/profile`}>
          <Button type="text">Profile</Button>
        </Link>
      ),
    },
    {
      key: "1",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  const { role } = getUserInfo() as any;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        {/* first part */}
        <Col>
          <Space wrap size={16}>
            <Link href={`/home`}>
              <Image src={img} height={50} width={50} alt="logo" />
            </Link>
          </Space>
        </Col>

        {/* second part */}
        <Col style={{ display: "flex", gap: "10px" }}>
          {categories?.map((category) => (
            <Link key={category?.id} href={`/categories/${category?.name}`}>
              <Button type="text">{category?.name}</Button>
            </Link>
          ))}
        </Col>

        {/* third part */}
        <Col
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            gap: "14px",
          }}
        >
          
            <Space wrap size={10}>
              <Avatar size="large" icon={<SearchOutlined />} />
            </Space>
          

          <Space wrap size={10}>
            <Link href={`/cart`}>
              <Avatar size="large" icon={<ShoppingOutlined />} />
            </Link>
          </Space>

          <Dropdown menu={{ items }}>
            <Space wrap size={10}>
              <Avatar size="large" icon={<UserOutlined />} />
            </Space>
          </Dropdown>
        </Col>
      </Row>
    </AntHeader>
  );
};

export default SEClientHeader;
