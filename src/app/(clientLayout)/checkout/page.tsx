"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import CheckoutCart from "@/components/cart/CheckoutCart";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import FormSelectCountryField from "@/components/csc/FormSelectCountryField";
import { useAppSelector } from "@/redux/hook";
import { Button, Col, Row } from "antd";
import { City, Country, State } from "country-state-city";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

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

  console.log(`selected city`, selectedCity);

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
    City.getAllCities()?.filter(
      (e) => e.countryCode === selectedCountry && e.stateCode === selectedState
    );
  const myCityOptions =
    cities?.length! > 0 &&
    cities?.map((c) => ({
      label: c?.name,
      value: c?.name,
    }));

  console.log(`options`, cities);

  const handleOnSubmit = async (data: any) => {
    try {
      data.country = selectedCountry;
      data.state = selectedState;
      data.city = selectedCity;

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
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            margin: "10px 0 10px 10px",
          }}
        >
          <Form submitHandler={handleOnSubmit}>
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
                      onSelectedValueChange={(value) => setSelectedState(value)}
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
                      name="city"
                      options={myCityOptions}
                      label="City"
                      onSelectedValueChange={(value) => setSelectedCity(value)}
                      selectedValue={selectedCity}
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
                    name="location"
                    rows={5}
                    placeholder="your location"
                    label="Location"
                  />
                </div>

                <div style={{ margin: "10px 0px" }}>
                  <Button type="primary" htmlType="submit">
                    submit
                  </Button>
                </div>
              </div>
            </div>
          </Form>
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
              General
            </p>
            <Elements stripe={stripePromise}>
              <CheckoutForm price={total} />
            </Elements>
          </div>
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
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CheckOutPage;
