const InputComponent = ({name, id, value, placeholder, type, icon}) => {
  return(
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        id={id}
        className="input-box" />
      <i class={"fi " + icon + " input-icon"}></i>
    </div>
  )
}

export default InputComponent;