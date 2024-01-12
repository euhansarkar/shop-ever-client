"use client";
import CheckoutCart from "@/components/cart/CheckoutCart";
import BillingAddrss from "@/components/checkout/BillingAddrss";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import ShippingAddrss from "@/components/checkout/ShippingAddrss";
import ShippingMethod from "@/components/checkout/ShippingMethod";
import StepperForm from "@/components/stepper/FormStepper";
import SEBreadCrumb from "@/components/ui/SEBreadCrumb";
import { dummyShippingMethodOptions } from "@/constants/global";
import { CHECKOUT_STEPPER_PERSIST_KEY } from "@/constants/storageKey";
import { useAppSelector } from "@/redux/hook";
import { Col, Divider, Row } from "antd";

const CheckOutPage = () => {
  const stepData = useAppSelector((state) => state.checkout);

  let getShippingMethod: any = {};

  if (
    //@ts-ignore
    stepData?.shippingMethod?.name
  ) {
    //@ts-ignore
    getShippingMethod = dummyShippingMethodOptions?.find(
      //@ts-ignore
      (method) => method?.value === stepData?.shippingMethod?.name
    );
  }

  const { products, total } = useAppSelector((state) => state.cart);

  const steps = [
    {
      title: "Shipping Info",
      content: <ShippingAddrss />,
    },
    {
      title: "Shipping Method",
      content: <ShippingMethod />,
    },
    {
      title: "Billing Address",
      content: <BillingAddrss />,
    },
    {
      title: "Payment",
      content: <PaymentMethod />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    console.log(`get values`, values);
    // const obj = { ...values };
    // const file = obj["file"];
    // delete obj["file"];
    // const data = JSON.stringify(obj);
    // const formData = new FormData();
    // formData.append("file", file as Blob);
    // formData.append("data", data);
    // message.loading("Creating...");
    try {
      // const res = await addStudentWithFormData(formData);
      // if (!!res) {
      //   message.success("Student created successfully!");
      // }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
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
                label: `Checkout`,
                link: `/checkout`,
              },
            ]}
          />

          <StepperForm
            persistKey={CHECKOUT_STEPPER_PERSIST_KEY}
            submitHandler={(value) => {
              handleStudentSubmit(value);
            }}
            steps={steps}
          />
        </div>
      </Col>

      {/* second col */}
      <Col span={12} style={{ margin: "10px 0" }}>
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
              Products
            </p>
            <CheckoutCart products={products} />
            <div style={{ paddingLeft: "10px", paddingRight: "20px" }}>
              <div
                style={{
                  marginTop: "10px",
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
                  marginTop: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span>Discount</span>
                <span>{total ? 0 : 0}</span>
              </div>

              {
                //@ts-ignore
                stepData?.shippingMethod?.name && (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>Shipping</span>
                    <span>{getShippingMethod?.cost}</span>
                  </div>
                )
              }

              <Divider />
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
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CheckOutPage;
