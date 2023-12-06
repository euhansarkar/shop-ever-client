"use client";

import ProductInfo from "@/components/productForm/ProductInfo";
import ProductSetting from "@/components/productForm/productSetting";
import ProductVarient from "@/components/productForm/productVarient";
import StepperForm from "@/components/stepper/FormStepper";

import ActionBar from "@/components/ui/ActionBar";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import {
  useAddAttributeMutation,
  useAttributesQuery,
} from "@/redux/api/attributeApi";
import { useAttributeGroupsQuery } from "@/redux/api/attributeGroupApi";
import { Button, Col, Row, Select, Space, message } from "antd";
import { Option } from "antd/es/mentions";

const ProductCreationPage = () => {
  const [addAttribute] = useAddAttributeMutation();

  const { data, isLoading } = useAttributesQuery({ page: 1, limit: 100 });

  const steps = [
    {
      title: "Product Information",
      content: <ProductInfo />,
    },
    {
      title: "Product Varient",
      content: <ProductVarient />,
    },
    {
      title: "Product Settings",
      content: <ProductSetting />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    console.log(values);
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      console.log(values);
      // const res = await addStudentWithFormData(formData);
      // if (!!res) {
      //   message.success("Student created successfully!");
      // }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const defaultValues = {
    product_attributes: data?.attributes || "",
  };

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
          {
            label: "create",
            link: `/admin/catalog/product/create`,
          },
        ]}
      />
      <ActionBar title="attribute creation" />
      <StepperForm
        defaultValues={defaultValues}
        persistKey="student-create-form"
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </>
  );
};

export default ProductCreationPage;
