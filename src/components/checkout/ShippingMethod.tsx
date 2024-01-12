"use client";
import { useState } from "react";
import FormRadioField from "../Forms/FormRadioField";
import { dummyShippingMethodOptions } from "@/constants/global";
import { useShippingMethodsQuery } from "@/redux/api/shippingMethodApi";
import { useDebounced } from "@/redux/hook";

const ShippingMethod = () => {
  const query: Record<string, any> = {};

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data, isLoading } = useShippingMethodsQuery({});

  const shippingMethodOptions = data?.shippingMethods?.map((method) => ({
    label: method?.method_name,
    value: method?.method_code,
    cost: method?.cost,
  }));

  console.log(`new`, shippingMethodOptions);

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
            Shipping Method
          </p>
          <div>
            <div style={{ margin: "10px 0px" }}>
              {shippingMethodOptions !== undefined &&
                shippingMethodOptions?.length > 0 && (
                  <FormRadioField
                    size="large"
                    name="shippingMethod.name"
                    options={shippingMethodOptions}
                    label=""
                    onValueChange={(value) => setIsRequiredType(value)}
                  />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingMethod;
