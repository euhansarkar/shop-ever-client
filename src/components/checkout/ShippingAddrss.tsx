"use client";
import { City, Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import FormSelectCountryField from "../csc/FormSelectCountryField";
import { getFromLocalStorage } from "@/utils/localStorage";
import { CHECKOUT_STEPPER_PERSIST_KEY } from "@/constants/storageKey";
import { debounce } from "lodash";

const ShippingAddrss = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>(
    undefined
  );
  const [selectedState, setSelectedState] = useState<string | undefined>(
    undefined
  );

  const [selectedCity, setSelectedCity] = useState<string | undefined>(
    undefined
  );

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
                  name="shippingAddr.city"
                  options={myCityOptions}
                  label="City"
                  onSelectedValueChange={(value) => setSelectedCity(value)}
                  selectedValue={selectedCity}
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
