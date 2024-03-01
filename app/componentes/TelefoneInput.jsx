import React, { useState } from 'react';
import InputMask from 'react-input-mask';

const TelefoneInput = ({ className, ...props }) => {
  const [mask, setMask] = useState("(99) 9999-99999");

  return (
    <InputMask
      {...props}
      mask={mask}
      onBlur={e => {
        if (e.target.value.replace("_", "").length === 14 ) {
          setMask("(99) 9999-9999");
        }
      }}
      onFocus={e => {
        if (e.target.value.replace("_", "").length === 14) {
          setMask("(99) 9999-99999");
        }
      }}
    >
      {inputProps => <input {...inputProps} className=" p-2 w-full border " type="tel" />}
    </InputMask>
  );
};

export default TelefoneInput;