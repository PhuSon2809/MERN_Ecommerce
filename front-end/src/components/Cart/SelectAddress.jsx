import React from "react";
import { FormInput, IconWrapper, InputWrapper } from "./CartStyle";

function SelectAddress({
  label,
  options,
  value,
  setValue,
  type,
  reset,
  name,
  icon,
}) {
  return (
    <FormInput sx={{ mb: 3, width: "60%" }}>
      <label style={{ fontWeight: "600" }}>{label}</label>
      <InputWrapper>
        <IconWrapper>{icon}</IconWrapper>
        <select
          required
          value={reset ? "" : value}
          onChange={(e) =>
            !name
              ? setValue(e.target.value)
              : setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
        >
          <option value="">{`--Choose ${label}--`}</option>
          {options?.map((item) => {
            return (
              <option
                key={
                  type === "province"
                    ? item?.province_id
                    : type === "district"
                    ? item?.district_id
                    : item?.code
                }
                value={
                  type === "province"
                    ? item?.province_id
                    : type === "district"
                    ? item?.district_id
                    : item?.code
                }
              >
                {type === "province"
                  ? item?.province_name
                  : type === "district"
                  ? item?.district_name
                  : item?.value}
              </option>
            );
          })}
        </select>
      </InputWrapper>
    </FormInput>
  );
}

export default SelectAddress;
