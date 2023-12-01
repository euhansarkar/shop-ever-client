import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Button } from "antd";
import Link from "next/link";
import React from "react";

const PermissionPage = () => {
  return (
    <div>
      <SEBreadCrumb
        items={[
          {
            label: `super admin`,
            link: `/super_admin`,
          },
          {
            label: "permission",
            link: `/super_admin/permission`,
          },
        ]}
      />
      <ActionBar title="permission list">
        <Link href="/super_admin/permission/create">
          <Button type="primary">create new</Button>
        </Link>
      </ActionBar>
      <h1>this is permission page</h1>
    </div>
  );
};

export default PermissionPage;
