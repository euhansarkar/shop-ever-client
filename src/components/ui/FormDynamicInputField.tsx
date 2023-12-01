import { Button, Empty, Switch } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "../Forms/FormInput";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useUpdateAttributeOptionMutation } from "@/redux/api/attributeOptionApi";

const FormDynamicFields = () => {
  const { control, setValue, getValues } = useFormContext();
  const [updateAttributeOption] = useUpdateAttributeOptionMutation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attribute_options",
    keyName: "customId",
  });

  const handleSwitchToggle = (index: number, isChecked: boolean) => {
    const currentOptions = getValues("attribute_options");
    currentOptions[index].is_deleted = isChecked;
    setValue("attribute_options", currentOptions);
    // console.log(getValues);
  };

  return (
    <>
      <div>
        <p
          style={{
            fontSize: "14px",
            marginBottom: "10px",
          }}
        >
          Attribute Options
        </p>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginTop: "10px",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <FormInput
                  type="text"
                  name={`attribute_options.${index}.option_text`}
                  size="middle"
                  placeholder={`Attribute Option: ${index}`}
                />

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                  size="middle"
                >
                  Delete
                </Button>

                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  //@ts-ignore
                  defaultChecked={fields[index].is_deleted === true}
                  onChange={(isChecked) => handleSwitchToggle(index, isChecked)}
                />
              </div>
            );
          })
        ) : (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>Attribute Options Not Found</span>}
          />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button
          style={{ marginTop: "10px" }}
          type="primary"
          onClick={() =>
            append({
              option_text: "", // You can set other default values here
              is_deleted: false, // Set is_deleted to false by default
            })
          }
        >
          Add New Option
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
