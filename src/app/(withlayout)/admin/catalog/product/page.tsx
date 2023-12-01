import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const ProductPage = () => {
  return (
    <>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "product",
            link: `/admin/catalog/product`,
          },
        ]}
      />
      <ActionBar title="product list">
        <Link href="/admin/cataglog/product/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </>
  );
};

export default ProductPage;
