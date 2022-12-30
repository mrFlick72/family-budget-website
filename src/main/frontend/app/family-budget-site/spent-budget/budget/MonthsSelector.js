import React from "react";
import FormSelect from "../../../component/form/FormSelect";

export default ({monthRegistry, month, year, action}) => {

    let valueLabel
    let options = monthRegistry.map(item => {
        if(Number(item.monthValue) === Number(month)){
            valueLabel = item.monthLabel
        }
        return {
            value: item.monthValue,
            label: item.monthLabel
        }
    });

    return <FormSelect id="monthsSelector"
                       value={{value: month, label: valueLabel}}
                       label=""
                       multi={false}
                       options={options}
                       onChangeHandler={(event) => {
                           window.location.href = `${action}?choicedMonth=${event.value}&year=${year}`;
                       }}/>
}