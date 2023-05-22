export const FormField = (props) => {
  const { name, errors = {} } = props;

  let errorBlock = <></>;

  if (errors[name]) {
    errorBlock = <p style={{ color: "red" }}>{errors[name]?.message}</p>;
  }

  return (
    <div className="inputDiv">
      <Field {...props} />
      {errorBlock}
    </div>
  );
};

const Field = ({
  name,
  type,
  otherType,
  options,
  max,
  label,
  formValues,
  register,
  operations,
}) => {
  let fieldBlock = <></>;

  switch (type) {
    case "select":
      fieldBlock = (
        <select
          className="forminputs"
          name={name}
          id={name}
          {...(register ? register(name) : null)}
        >
          <option value={""}>Select {label}</option>
          {options.map((item, index) => (
            <option key={item + index} value={item}>
              {item}
            </option>
          ))}
        </select>
      );
      break;
    case "number":
      fieldBlock = (
        <input
          className="forminputs"
          type="number"
          id={name}
          name={name}
          {...(register ? register(name) : null)}
        />
      );
      break;
    case "date":
      fieldBlock = (
        <input
          className="forminputs"
          type="date"
          id={name}
          name={name}
          max={max}
          {...(register ? register(name) : null)}
        />
      );
      break;
    case "textarea":
      fieldBlock = (
        <textarea
          className="forminputs"
          id={name}
          name={name}
          {...(register ? register(name) : null)}
        />
      );
      break;
    case "file":
      switch (otherType) {
        case "image":
          fieldBlock = (
            <>
              {formValues[name] === "" ? (
                <input
                  className="forminputs"
                  type="file"
                  {...(register
                    ? register(name, {
                        onChange: async (e) => {
                          let file = await operations.getFile(
                            e.target.files[0]
                          );

                          operations.setValues({
                            ...formValues,
                            receipt: file,
                          });
                        },
                      })
                    : null)}
                />
              ) : (
                <>
                  <div
                    className="cross"
                    onClick={() => operations.removeFile()}
                  >
                    X
                  </div>
                  <img
                    width={80}
                    height={60}
                    src={`${formValues[name]}`}
                    alt="alt"
                  />
                </>
              )}
            </>
          );
          break;

        default:
          fieldBlock = (
            <>
              <input
                className="forminputs"
                type="file"
                {...(register
                  ? register(name, {
                      onChange: async (e) => {
                        let file = await operations.getFile(e.target.files[0]);

                        operations.setValues({
                          ...formValues,
                          receipt: file,
                        });
                      },
                    })
                  : null)}
              />
            </>
          );
          break;
      }
      break;
    default:
      fieldBlock = (
        <input
          className="forminputs"
          type="text"
          id={name}
          name={name}
          {...(register ? register(name) : null)}
        />
      );
      break;
  }
  return (
    <label htmlFor={name}>
      {label}
      {fieldBlock}
    </label>
  );
};
