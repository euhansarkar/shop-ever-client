import { Divider, Radio, RadioChangeEvent, Space } from "antd";
import { ReactNode } from "react";
import { useFormContext, Controller } from "react-hook-form";

export type RadioOptions = {
  label: ReactNode | string;
  value: string | boolean | number;
  disabled?: boolean;
};

type RadioFieldProps = {
  name: string;
  options: RadioOptions[];
  size?: "large" | "middle" | "small";
  label?: string;
  handleChange?: (el: RadioChangeEvent) => void;
};

const FormRadioField = ({
  name,
  size,
  options,
  label,
  handleChange,
}: RadioFieldProps) => {
  const { control } = useFormContext();

  return (
    <>
      {label && <div>{label}</div>}
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Radio.Group
            onChange={handleChange ? handleChange : onChange}
            size={size}
            style={{ width: "100%" }}
            value={value}
          >
            <Space direction="vertical">
              {options.map((option, i) => (
                <Radio
                  key={i}
                  style={{ margin: "4px 1px" }}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        )}
      />
        <Divider style={{width: "100%"}} orientationMargin={3} />
    </>
  );
};

export default FormRadioField;
