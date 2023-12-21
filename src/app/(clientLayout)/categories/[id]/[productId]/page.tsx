"use client";

import AddToCart from "@/components/cart/AddToCart";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { useProductQuery } from "@/redux/api/productApi";
import { useVarientQuery } from "@/redux/api/varientApi";
import { ICartProduct, IVarientOption } from "@/types";
import {
  Button,
  Col,
  Image,
  Layout,
  Radio,
  RadioChangeEvent,
  Row,
  theme,
} from "antd";
import { useState } from "react";

const ProductPage = ({ params }: any) => {
  const [value, setValue] = useState<string>("");

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const { productId } = params;
  const { Content } = Layout;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // get product
  const { data: productData, isLoading: productLoading } =
    useProductQuery(productId);

  // get all varients
  const varients: any = productData?.varients;

  // get all varient options
  const allVarientOptions = varients?.flatMap(
    (item: any) => item.varient_options
  );

  // group all varient options
  const groupedByAttributeNames = allVarientOptions?.reduce(
    (acc: any, obj: any) => {
      const key = obj?.attribute_name;
      acc[key] = acc[key] || [];
      acc[key]?.push(obj);
      return acc;
    },
    {}
  );

  // get selected option
  const getSelectedOption = allVarientOptions?.find(
    (option: any) => option.id === value
  );

  // get varient data

  const { data: varientData, isLoading: varientLoading } = useVarientQuery(
    getSelectedOption?.varient_id
  );


  const cartProduct: ICartProduct = {
    id: varientData?.product?.id,
    name: varientData?.product?.name,
    sku: varientData?.product?.sku,
    meta_SEO_id: varientData?.product?.sku,
    attribute_group_id: varientData?.product?.attribute_group_id,
    category_id: varientData?.product?.category_id,
    varient: varientData,
  };


  const handleAddToCart = (product: any) => {
    console.log(product);
  };

  // first product varient
  const getFirstVarient = productData?.varients[0];

  return (
    <>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <SEBreadCrumb
            items={[
              {
                label: `Home`,
                link: `/home`,
              },
              {
                label: productData?.category?.name,
                link: `/categories/${productData?.category?.id}`,
              },
              {
                label: productData?.name,
                link: `/categories/${productData?.category?.id}/${productData?.id}`,
              },
            ]}
          />

          <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
            {/* first part */}
            <Col span={12} style={{ margin: "10px 0" }}>
              {getFirstVarient?.images[0] &&
              typeof getFirstVarient?.images[0].image_url === "string" ? (
                <Image
                  width="100%"
                  alt="image"
                  height={400}
                  src={getFirstVarient?.images[0]?.image_url}
                />
              ) : (
                <div>No Image</div>
              )}
            </Col>

            {/* second part */}
            <Col span={12} style={{ margin: "10px 0" }}>
              <h1 style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {productData?.name}
              </h1>
              <h2>${getFirstVarient?.price}</h2>
              <p style={{ color: "#656769" }}>sku: {getFirstVarient?.sku}</p>
              {groupedByAttributeNames &&
                Object.keys(groupedByAttributeNames).map((attributeName) => (
                  <div key={attributeName}>
                    <h3>{attributeName}</h3>

                    <Radio.Group onChange={onChange} value={value}>
                      {groupedByAttributeNames[attributeName].map(
                        (variantOption: any) => (
                          <Radio
                            key={variantOption.id}
                            value={variantOption.id}
                          >
                            {variantOption?.options?.option_text}
                          </Radio>
                        )
                      )}
                    </Radio.Group>
                  </div>
                ))}

              <div>{productData?.description}</div>
              {/* {value === "" ? (
                <Button type="primary" block disabled>
                  Add To Cart
                </Button>
              ) : (
                <Button onClick={() => handleAddToCart("sldklsksl")} type="primary" block>
                  Add To Cart
                </Button>
              )} */}
              <AddToCart value={value} product={cartProduct} />
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default ProductPage;
