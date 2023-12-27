"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CheckoutCart from "@/components/cart/CheckoutCart";
import FormSelectCountryField from "@/components/csc/FormSelectCountryField";
import { useAppSelector } from "@/redux/hook";
import { Col, Row } from "antd";
import { City, Country, State } from "country-state-city";
import { useState } from "react";

const CheckOutPage = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );

  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );

  const { products, total } = useAppSelector((state) => state.cart);

  // get countries
  const countries = Country?.getAllCountries();
  const countriesOptions = countries?.map((c) => ({
    label: c?.name,
    value: c?.isoCode,
  }));

  // get states
  const states =
    selectedCountry &&
    State.getAllStates()?.filter((e) => e.countryCode === selectedCountry);
  const myStateOptions =
    states?.length! > 0 &&
    states?.map((c) => ({
      label: c?.name,
      value: c?.isoCode,
    }));

  // get cities
  const cities =
    selectedState &&
    City.getAllCities()?.filter((e) => e.stateCode === selectedState);
  const myCityOptions =
    cities?.length! > 0 &&
    cities?.map((c) => ({
      label: c.name,
      value: c.isoCode,
    }));

  const handleOnSubmit = async (data: any) => {
    try {
      console.log(data);
      // const res = await addProduct(data).unwrap();
      // console.log(res);

      // if (res?.id) {
      //   message.success(`product created successfully`);
      //   router.push(`/admin/catalog/product/create/add-varient/${res?.id}`);
      // }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
      <Col span={12} style={{ margin: "10px 0" }}>
        <Form submitHandler={handleOnSubmit}>
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
              <div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="name"
                    size="large"
                    label="Full Name"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="phone_number_1"
                      size="large"
                      label="Mobile Number"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormInput
                      type="text"
                      name="phone_number_2"
                      size="large"
                      label="Alternative Mobile Number"
                    />
                  </div>
                </div>
                {/* <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="name"
                    size="large"
                    label="Product Name"
                  />
                </div>
                <div style={{ margin: "10px 0px" }}>
                  <FormInput
                    type="text"
                    name="name"
                    size="large"
                    label="Product Name"
                  />
                </div> */}

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ margin: `10px 0px`, flexBasis: "50%" }}>
                    <FormSelectCountryField
                      size="large"
                      name="country"
                      options={countriesOptions}
                      label="Country"
                      placeholder="Select Country"
                      onSelectedValueChange={(value) =>
                        setSelectedCountry(value)
                      }
                      selectedValue={selectedCountry}
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormSelectField
                      size="large"
                      name="state"
                      options={myStateOptions}
                      label="State"
                      onSelectedValueChange={(value) =>
                        setSelectedState(value)
                      }
                      selectedValue={selectedState}
                      placeholder="Select State"
                    />
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ margin: `10px 0px`, flexBasis: "50%" }}>
                    <FormSelectField
                      size="large"
                      name="country"
                      options={myCityOptions}
                      label="City"
                      placeholder="Select City"
                    />
                  </div>
                  <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                    <FormSelectField
                      size="large"
                      name="state"
                      options={countriesOptions}
                      label="State"
                      placeholder="Select State"
                    />
                  </div>
                </div>

                <div style={{ margin: "10px 0px" }}>
                  <FormTextArea
                    name="city"
                    rows={5}
                    placeholder="your city"
                    label="City"
                  />
                </div>
              </div>
            </div>
          </div>
        </Form>
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
          </div>
        </div>
        {/* <div
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
            <span>$3s98s9</span>
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
            <span>3sgdsgs98s9</span>
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
        </div> */}
      </Col>
    </Row>
  );
};

export default CheckOutPage;
