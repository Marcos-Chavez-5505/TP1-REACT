import inputSearchStyles from "./inputSearch.module.css"
const InputSearch = ({value, onChange, placeholder}) => {
	return (
    <div className={inputSearchStyles.inputSearchBarContainer}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputSearchStyles.inputSearchBar}
      />
    </div>
  )
}
export default InputSearch;