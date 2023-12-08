import React, { useState } from "react";
import SETable from "../ui/SETable";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Button, message } from "antd";
import { useDebounced } from "@/redux/hooks";
import { useVarientsQuery } from "@/redux/api/varientApi";
import { IVarient, IVarientOption } from "../../types/common";

const VarientView = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [attributeId, setAttributeId] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useVarientsQuery({ page: 1, limit: 10 });
  const varients = data?.varients;
  console.log(varients);
  const meta = data?.meta;

//   const dynamicColumns = varients?.varient_options?.map((varient: IVarientOption) => {
//     if (varient && varient.attribute_name && varient.option_id) {
//       return { title: varient.attribute_name, dataIndex: varient.option_id };
//     } else {
//       return null;
//     }
//   });

  const columns = [
    {
      title: "SKU",
      dataIndex: "sku",
    },
    {
      title: "Quantity",
      dataIndex: "qty",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: true,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      sorter: true,
    },
  ];

  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <SETable
      loading={isLoading}
      columns={columns}
      dataSource={varients}
      pageSize={size}
      totalPages={meta?.total}
      showSizeChanger={true}
      onPaginationChange={onPaginationChange}
      onTableChange={onTableChange}
      showPagination={true}
    />
  );
};

export default VarientView;
