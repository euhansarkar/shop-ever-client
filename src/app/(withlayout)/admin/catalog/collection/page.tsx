import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const CollectionPage = () => {
  return (
    <>
      <SEBreadCrumb
        items={[
          {
            label: `admin`,
            link: `/admin`,
          },
          {
            label: "collection",
            link: `/admin/catalog/collection`,
          },
        ]}
      />
      <ActionBar title="collection list">
        <Link href="/admin/cataglog/collection/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
    </>
  );
};

export default CollectionPage;
