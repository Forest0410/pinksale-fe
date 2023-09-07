import { Decimal } from "decimal.js";

const defaultDecimal = 18;

const add = (value, decimals) => {
    if(Number(value) === 0) return '0';
    let strValue = String(value).split(".");
    let dec_val = decimals ? decimals : defaultDecimal;
    if(strValue.length > 1) {
        let params = new Decimal(value).times(new Decimal(10).pow(strValue[1].length < dec_val? strValue[1].length: dec_val ));
        if(strValue[1].length >= dec_val) return String(params);
        else return String(params) + '0'.repeat(dec_val - strValue[1].length);
    }
    return String(value) + '0'.repeat(dec_val);
}

const remove = (value, decimals) => {
    decimals = Number(decimals);
    if(Number(value) === 0 ) return 0;
    if(String(value).length >= Number(decimals)){
        return Number(new Decimal(value)
            .dividedBy(new Decimal(10).pow(
                decimals ? decimals : defaultDecimal
            ))).toString();
    }else {
        return Number(new Decimal(value)
        .dividedBy(new Decimal(10).pow(
            decimals ? decimals : defaultDecimal
        ))).toFixed(decimals + 1 - String(value).length);
    }
}

export const precision = {
    add,
    remove,
};
