import checkboxFilterStyles from "./checkboxFilter.module.css"
const CheckboxFilter = ({values, selected, onChange}) => {
  return (
    <div className={checkboxFilterStyles.checkboxFilterContainer}>
      {values.map((value)=>{
        return (
          <div className={checkboxFilterStyles.checkboxFilterInnerContainer}>
            <label className={checkboxFilterStyles.label} htmlFor={value}>{value}</label>
            <input
              id={value}
              type="checkbox"
              value={value}
              onChange={onChange}
              checked={selected.includes(value)}
              className={checkboxFilterStyles.checkboxFilter}
            />          
          </div>
        )
        })
      }
    </div>
  )
}
export default CheckboxFilter;