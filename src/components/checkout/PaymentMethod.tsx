"use client";
import { useState } from "react";
import FormRadioField from "../Forms/FormRadioField";
import { paymentMethodOptions } from "@/constants/global";

const PaymentMethod = () => {
  const [isRequiredType, setIsRequiredType] = useState<string | undefined>(
    undefined
  );

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
            Payment Method
          </p>
          <div>
            <div style={{ margin: "10px 0px" }}>
              <FormRadioField
                size="large"
                name="paymentMethod.name"
                options={paymentMethodOptions}
                label=""
                onValueChange={(value) => setIsRequiredType(value)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentMethod;
