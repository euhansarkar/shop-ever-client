"use client";
import { Layout } from "antd";
import SEBreadCrumb from "./SEBreadCrumb";
import SEHeader from "./SEHeader";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  const base = "admin";
  return (
    <Content
      style={{
        minHeight: "100vh",
        color: "black",
      }}
    >
      <SEHeader />
      <SEBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: "student",
            link: `/${base}/student`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
