"use client";
import CartItem from "@/components/cart/CartItem";
import { useAppSelector } from "@/redux/hook";
import { Button, Col, Input, Row } from "antd";
import Link from "next/link";

const CartProductPage = () => {
  const { products, total } = useAppSelector((state) => state.cart);

  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      <Col span={16} style={{ margin: "10px 0" }}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            // marginBottom: "10px",
            // marginTop: "10px",
            margin: "10px 0 10px 10px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Products
            </p>

            <CartItem products={products} />
          </div>
        </div>

        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            margin: "10px 0 10px 10px",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Coupon Code ?
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "20px",
              }}
            >
              <Input
                color="#000"
                width="80%"
                defaultValue={"put your discount code"}
              ></Input>
              <Button danger style={{ width: "20%" }}>
                Apply
              </Button>
            </div>
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
            margin: "10px 0 10px 10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            Total Summery
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>sub total</span>
            <span>{total ? total : 0}</span>
          </div>

          <div
            style={{
              marginTop: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>total</span>
            <span>{total ? total : 0}</span>
          </div>
          <div
            style={{
              marginTop: "22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Link href={`/checkout`}>
              <Button type="primary">Checkout</Button>
            </Link>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CartProductPage;
