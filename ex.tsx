"use client";

import { Button, Empty, Switch } from "antd";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormInput from "../Forms/FormInput";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useUpdateAttributeOptionMutation } from "@/redux/api/attributeOptionApi";
import { IAttributeOption } from "@/types";

const FormDynamicFields = () => {
  const { control } = useFormContext();
  const [updateAttributeOption] = useUpdateAttributeOptionMutation();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attribute_options",
    keyName: "customId",
  });

  interface AttributeOptionType extends IAttributeOption {
    customId: string;
  }

  const handleIsDeleted = async (checked: boolean, index: number) => {
    //  অ্যাট্রিবিউট ক্রিয়েশনের সময় এখানে দেখতে হবে যে, এটি আগে থেকেই ডেটাবেজে আছে কীনা। যদি থাকে তবে সেক্ষেত্রে তাকে আপডেট করতে হবে। যদি না থাকে তবে নতুন একটি ক্রিয়েট করতে হবে।
    try {
      const obj: AttributeOptionType = {
        id: "",
        option_text: "",
        attribute_id: "",
        is_deleted: null,
        created_at: "",
        updated_at: "",
        ...fields[index],
      };

      const res = await updateAttributeOption({
        id: obj?.id,
        body: { is_deleted: checked },
      }).unwrap();

      console.log(res);

      // Your logic for handling the switch state goes here
    } catch (error) {
      console.error(error);
    }
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
          General
        </p>
        {fields.length > 0 ? (
          fields.map((item, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", marginTop: "10px", gap: "10px" }}
              >
                <FormInput
                  type="text"
                  name={`attribute_options.${index}.option_text`}
                  size="small"
                  placeholder={`Attribute Option: ${index}`}
                />

                <Button
                  type="primary"
                  onClick={() => remove(index)}
                  danger
                  style={{ margin: "5px 0px" }}
                  size="large"
                >
                  Delete
                </Button>

                <Switch
                  onChange={(checked) => handleIsDeleted(checked, index)}
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                  //@ts-ignore
                  defaultChecked={fields[index].is_deleted === true}
                />
              </div>
            );
          })
        ) : (
          <Empty description="No class schedule found" />
        )}
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <Button type="primary" onClick={() => append(undefined)}>
          Add Schedule
        </Button>
      </div>
    </>
  );
};

export default FormDynamicFields;
