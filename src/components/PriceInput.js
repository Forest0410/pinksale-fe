import React, { useEffect } from 'react';

export const PriceInputErrors = {
  MAX_INPUT_EXCEEDED: 'Max input value exceeded',
};

const PriceInput = ({
  value,
  decimals = 0,
  onChange,
  onInputError = err => console.log(err),
  max = 99999999999999999999999999999,
  ...rest
}) => {
  useEffect(() => {
    onChange(checkDecimals(value));
  }, [decimals]);

  useEffect(() => {
    if (parseInt(value) > parseInt(max)) {
      onInputError(PriceInputErrors.MAX_INPUT_EXCEEDED);
    } else {
      onInputError(null);
    }
  }, [value]);

  const handleKeyDown = e => {
    const key = e.keyCode;
    if (
      (key >= '0'.charCodeAt(0) && key <= '9'.charCodeAt(0)) ||
      (e.keyCode >= 96 && e.keyCode <= 105)
    ) {
      if (value === '0' && key === '0'.charCodeAt(0)) e.preventDefault();
    } else if (key === 190 || key === 110) {
      if (value.length === 0 || value.includes('.') || decimals === 0)
        e.preventDefault();
    } else if (key !== 8) {
      e.preventDefault();
    }
  };

  const checkDecimals = val => {
    if (!val) return '';
    if (val.indexOf('.') > -1 && val.length - val.indexOf('.') - 1 > decimals) {
      const ret = Math.floor(+val * 10 ** decimals) / 10 ** decimals;
      return ret.toString();
    }
    return val;
  };

  const handleChange = e => {
    onChange(checkDecimals(e.target.value));
  };

  return (
    <input
      value={value}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      {...rest}
    />
  );
};

export default PriceInput;
