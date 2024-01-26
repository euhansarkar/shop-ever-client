"use client";

import CartItem from "@/components/checkout/CartItem";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";

const CheckOutSuccessPage = ({ params }: any) => {
  const { id } = params;

  return (
    <div style={{ width: "100%", height: "80vh" }}>
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={12} style={{ margin: "10px 0" }}>
          <div>
            <SEBreadCrumb
              items={[
                {
                  label: `Home`,
                  link: `/home`,
                },
                {
                  label: `Checkout Success`,
                  link: `/checkout/success/${id}`,
                },
              ]}
            />

            <h2>this is payment successful page </h2>
            <h2>order id {id}</h2>
          </div>
        </Col>

        {/* second col */}
        <Col span={12} style={{ margin: "10px 0" }}>
          <CartItem />
        </Col>
      </Row>
    </div>
  );
};

export default dynamic(() => Promise.resolve(CheckOutSuccessPage), {
  ssr: false,
});
