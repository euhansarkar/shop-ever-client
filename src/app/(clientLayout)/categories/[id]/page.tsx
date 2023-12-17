"use client";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Button, Card, Col, Layout, Menu, Row, theme } from "antd";
import { useCategoryQuery } from "@/redux/api/categoryApi";
import { useProductsQuery } from "@/redux/api/productApi";
import { useDebounced } from "@/redux/hooks";
import Link from "next/link";
import Meta from "antd/es/card/Meta";

const { Header, Content, Sider } = Layout;

const CategoriesPage = ({ params }: any) => {
  const { id } = params;

  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  useEffect(() => {
    setCategoryId(id);
  }, [id]);

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["category_id"] = categoryId;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  // get category
  const { data: categoryData, isLoading: categoryLoading } =
    useCategoryQuery(id);

  // get products
  const { data: productsData, isLoading: productsLoading } = useProductsQuery({
    ...query,
  });

  const products = productsData?.products;

  console.log(`products`, products);

  const items1: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

  const items2: MenuProps["items"] = [
    UserOutlined,
    LaptopOutlined,
    NotificationOutlined,
  ].map((icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Layout>
          <Sider
            // collapsible
            // collapsed={collapsed}
            // onCollapse={(value) => setCollapsed(value)}
            width={280}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "sticky",
              left: 0,
              top: 0,
              bottom: 0,
            }}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%", borderRight: 0 }}
              items={items2}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <div style={{ margin: "10px 0" }}>
              <SEBreadCrumb
                items={[
                  {
                    label: `Home`,
                    link: `/home`,
                  },
                  {
                    label: categoryData?.name,
                    link: `/categories/${id}`,
                  },
                ]}
              />
            </div>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              Content
              <Row justify="center" align="middle">
                {products?.map((product) => (
                  <Col
                    style={{ margin: "12px" }}
                    key={product.id}
                    xs={24}
                    sm={12}
                    md={8}
                    lg={6}
                  >
                    <Card
                      hoverable
                      style={{ width: "100%", padding: "20px" }}
                      // cover={
                      //   category.images[0] &&
                      //   typeof category.images[0].image_url === "string" ? (
                      //     <img
                      //       alt="example"
                      //       src={category.images[0].image_url}
                      //       height={340}
                      //     />
                      //   ) : (
                      //     <div>No Image</div>
                      //   )
                      // }
                    >
                      <Meta
                        title={product.name}
                        description={product.description}
                      />
                      {/* <Link href={`/categories/${category.name}`}>
                        <Button style={{ margin: "10px 0" }} type="primary">
                          Shop {category?.name}
                        </Button>
                      </Link> */}
                    </Card>
                  </Col>
                ))}
              </Row>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default CategoriesPage;
