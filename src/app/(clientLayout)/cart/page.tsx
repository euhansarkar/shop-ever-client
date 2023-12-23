import { Col, Row } from "antd";
import React from "react";

const CartProductPage = () => {
  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      <Col span={16} style={{ margin: "10px 0" }}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              General
            </p>
          </div>
        </div>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Search Engine Optimize
            </p>
            <div></div>
          </div>
        </div>
      </Col>
      {/* second col */}
      <Col span={8} style={{ margin: "10px 0" }}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
            marginTop: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Setting
          </p>
          <div></div>
        </div>
      </Col>
    </Row>
  );
};

export default CartProductPage;
