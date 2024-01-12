"use client";

import { City, Country, State } from "country-state-city";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import FormSelectCountryField from "../csc/FormSelectCountryField";
import { useAppSelector } from "@/redux/hook";

const ShippingAddrss = () => {
  const stepData = useAppSelector((state) => state.checkout);

  // get countries
  const countries = Country?.getAllCountries();
  const countriesOptions = countries?.map((c) => ({
    label: c?.name,
    value: c?.isoCode,
  }));

  // get states
  const states =
    //@ts-ignore
    stepData?.shippingAddr?.country &&
    State.getAllStates()?.filter(
      //@ts-ignore
      (e) => e.countryCode === stepData?.shippingAddr?.country
    );
  const myStateOptions =
    states?.length! > 0 &&
    states?.map((c) => ({
      label: c?.name,
      value: c?.isoCode,
    }));

  // get cities
  const cities =
    //@ts-ignore
    stepData?.shippingAddr?.state &&
    City.getAllCities()?.filter(
      (e) =>
        //@ts-ignore
        e.countryCode === stepData?.shippingAddr?.country &&
        //@ts-ignore
        e.stateCode === stepData?.shippingAddr?.state
    );
  const myCityOptions =
    cities?.length! > 0 &&
    cities?.map((c) => ({
      label: c?.name,
      value: c?.name,
    }));

  return (
    <>
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
            Shipping Address
          </p>
          <div>
            <div style={{ margin: "10px 0px" }}>
              <FormInput
                type="text"
                name="shippingAddr.name"
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
                  name="shippingAddr.phone_number_1"
                  size="large"
                  label="Mobile Number"
                />
              </div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <FormInput
                  type="text"
                  name="shippingAddr.phone_number_2"
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
                  name="shippingAddr.country"
                  options={countriesOptions}
                  label="Country"
                  placeholder="Select Country"
                />
              </div>
              <div style={{ margin: "10px 0px", flexBasis: "50%" }}>
                <FormSelectField
                  size="large"
                  name="shippingAddr.state"
                  options={myStateOptions}
                  label="State"
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
                  name="shippingAddr.city"
                  options={myCityOptions}
                  label="City"
                  placeholder="Select City"
                />
              </div>
            </div>

            <div style={{ margin: "10px 0px" }}>
              <FormTextArea
                name="shippingAddr.location"
                rows={5}
                placeholder="your location"
                label="Location"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddrss;
