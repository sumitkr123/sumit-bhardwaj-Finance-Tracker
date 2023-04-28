import { useEffect, useState } from "react";
import "../../App.css";
import "./css/form.css";

import { Link, useNavigate } from "react-router-dom";
import { Account } from "./components/accountlist";
import { MonthYear } from "./components/monthyearlist";

const fixedLengthValue = 250;
const numRegex = /^[1-9]{1}[0-9]*$/;

const accountTypes = [
  "Personal Account",
  "Real Living",
  "My Dream Home",
  "Full Circle",
  "Core Realtors",
  "Big Block",
];

const transactionTypes = ["Home Expense", "Personal Expense", "Income"];

const today = new Date();
const currentyear = today.getFullYear();

const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const monthYears = [];

const supportedImg = ["png", "jpg", "jpeg"];

const mb1 = 1024 * 1024;

const fileReader = new FileReader();

month.map((month) => monthYears.push(`${month} ${currentyear}`));

export const AddTransaction = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    values: {
      notes: "",
      amount: "",
      FromAc: "",
      ToAc: "",
      ttype: "",
      monthyear: "",
      tdate: "",
      receipt: "",
    },
    errors: {
      notes: "",
      amount: "",
      FromAc: "",
      ToAc: "",
      ttype: "",
      monthyear: "",
      tdate: "",
      receipt: "",
      errcolor: "red",
    },
  });

  useEffect(() => {
    let allvalues = form.values;
    let allerrors = form.errors;

    let errflag = 0;

    for (let i in allvalues) {
      // if (typeof allvalues[i] === "object") {
      //   Object.keys(allvalues[i]).forEach((e) => {
      //     if (allvalues[i][e] === "") {
      //       errflag = 1;
      //       return;
      //     }
      //   });
      //   if (errflag === 1) {
      //     break;
      //   }
      // } else {
      if (allvalues[i].length === 0) {
        console.log(i, allvalues[i]);
        errflag = 1;
      }
      // }
    }

    for (let i in allerrors) {
      // if (typeof allerrors[i] === "object") {
      //   Object.keys(allerrors[i]).forEach((e) => {
      //     if (allerrors[i][e] !== "") {
      //       errflag = 1;
      //       return;
      //     }
      //   });
      //   if (errflag === 1) {
      //     break;
      //   }
      // } else {

      if (allerrors[i] !== "" && i !== "errcolor") {
        errflag = 1;
      }

      // }
    }

    if (errflag !== 1) {
      if (
        localStorage.getItem("userdata") !== null &&
        localStorage.getItem("userdata") !== undefined
      ) {
        let existingData = JSON.parse(localStorage.getItem("userdata"));
        let previd = existingData.at(existingData.length - 1).id;

        let pushData = form.values;
        pushData["id"] = previd + 1;

        existingData.push(pushData);

        localStorage.setItem("userdata", JSON.stringify(existingData));
      } else {
        let pushData = [form.values];
        pushData[0]["id"] = 1;

        localStorage.setItem("userdata", JSON.stringify(pushData));
      }

      navigate(`/view`);
    }
  }, [form]);

  const allvalidate = (e) => {
    console.log(form);

    e.preventDefault();
    let newform = e.target;

    // let allelements = document.getElementsByClassName("allvalidate");

    let allelements = [];

    for (let i = 0; i < newform.length; i++) {
      if (newform[i].className.split(" ")[0] === "allvalidate") {
        allelements.push(newform[i]);
      }
    }

    allelements.forEach((item) => {
      let validatetype = item.classList[1];

      let name = item.name;

      let value = item.value;

      let errfield = item.classList[2];

      if (validatetype === "validate-type-checkempty") {
        validateempty(name, value, errfield);
      }
      if (validatetype === "validate-type-account") {
        validateaccount(name, value, errfield);
      }
      if (validatetype === "validate-type-fixedlength") {
        validatefixedlength(name, value, errfield);
      }
      if (validatetype === "validate-type-num_gthan0") {
        validatenumgthan0(name, value, errfield);
      }

      if (validatetype === "validate-type-date") {
        validatedate(name, value, errfield);
      }
      if (validatetype === "validate-type-imgfile") {
        validateimgfile(name, value, errfield, item);
      }
    });
  };

  function validatefixedlength(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value.trim() === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (value.trim().length <= fixedLengthValue && value.trim().length !== 0) {
        newerrors[name] = "";
        newvalues[name] = value.trim();
      } else {
        newerrors[
          name
        ] = `**${errfield} length must be of ${fixedLengthValue} or lesser than it..!`;
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validatenumgthan0(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (value.match(numRegex)) {
        if (value > 0) {
          newerrors[name] = "";
          newvalues[name] = value;
        } else {
          newerrors[name] = `**${errfield} is not valid..!`;
        }
      } else {
        newerrors[name] = `**${errfield} is not valid..!`;
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateempty(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    if (value.trim() === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      newerrors[name] = "";
    }
    newvalues[name] = value;

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateaccount(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    newvalues[name] = value;

    if (newvalues.FromAc === "" || newvalues.ToAc === "") {
      if (newvalues.FromAc === "") {
        newerrors.FromAc = `**FromAc can't be empty..!`;
      } else {
        newerrors.FromAc = ``;
      }
      if (newvalues.ToAc === "") {
        newerrors.ToAc = `**ToAc can't be empty..!`;
      } else {
        newerrors.ToAc = ``;
      }
    } else {
      if (newvalues.FromAc === newvalues.ToAc) {
        newerrors.FromAc = `**FromAc and ToAc are same..!`;
        newerrors.ToAc = `**FromAc and ToAc are same..!`;
      } else {
        newerrors[name] = ``;
      }
    }

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validatedate(name, value, errfield) {
    let newerrors = form.errors;
    let newvalues = form.values;

    let datevalue = new Date(value);
    let today = new Date();

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (datevalue > today) {
        newerrors[name] = `**${errfield} is not valid..!`;
      } else {
        newerrors[name] = "";
      }
    }

    newvalues[name] = value;

    setForm({ ...form, values: newvalues, errors: newerrors });
  }

  function validateimgfile(name, value, errfield, file) {
    let newerrors = form.errors;
    let newvalues = form.values;

    let filenamelist = value.split(".");

    if (value === "") {
      newerrors[name] = `**${errfield} can't be empty..!`;
    } else {
      if (supportedImg.includes(filenamelist[filenamelist.length - 1])) {
        newerrors[name] = "";
      } else if (file.files[0].size > mb1) {
        newerrors[name] = `**${errfield} size exceeds..!`;
      } else {
        newerrors[name] = `**${errfield} format is not valid..!`;
      }

      fileReader.readAsDataURL(file.files[0]);

      fileReader.addEventListener("load", function () {
        newvalues[name] = this.result;
        setForm({ ...form, values: newvalues, errors: newerrors });
      });
    }
  }

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={(event) => allvalidate(event)}>
          <div className="fieldsrow">
            <div className="fields">
              <label>Transaction date :-</label>
              <input
                type="date"
                name="tdate"
                className="allvalidate validate-type-date Transaction-date"
              />
            </div>
            {form.errors.tdate !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.tdate}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>Notes :-</label>
              <textarea
                name="notes"
                className="allvalidate validate-type-fixedlength Notes"
              />
            </div>
            {form.errors.notes !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.notes}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>Amount :-</label>
              <input
                type="text"
                name="amount"
                className="allvalidate validate-type-num_gthan0 Amount"
              />
            </div>
            {form.errors.amount !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.amount}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>From A/c :-</label>
              <select
                type="text"
                name="FromAc"
                className="allvalidate validate-type-account FromAc"
              >
                <option value={""}>Select A/c</option>
                <Account accountTypes={accountTypes} />
              </select>
            </div>
            {form.errors.FromAc !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.FromAc}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>To A/c :-</label>
              <select
                type="text"
                name="ToAc"
                className="allvalidate validate-type-account ToAc"
              >
                <option value={""}>Select A/c</option>
                <Account accountTypes={accountTypes} />
              </select>
            </div>
            {form.errors.ToAc !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.ToAc}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>Transaction Type :-</label>
              <select
                type="text"
                name="ttype"
                className="allvalidate validate-type-checkempty Transaction-type"
              >
                <option value={""}>Select transaction type</option>
                {transactionTypes.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            {form.errors.ttype !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.ttype}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>Month-year :-</label>
              <select
                type="text"
                name="monthyear"
                className="allvalidate validate-type-checkempty Month-year"
              >
                <MonthYear monthYears={monthYears} />
              </select>
            </div>
            {form.errors.monthyear !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.monthyear}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="fields">
              <label>Receipt :-</label>
              <input
                type="file"
                name="receipt"
                className="allvalidate validate-type-imgfile Receipt"
              />
            </div>
            {form.errors.receipt !== "" && (
              <div className="fields">
                <p style={{ color: form.errors.errcolor }}>
                  {form.errors.receipt}
                </p>
              </div>
            )}
          </div>

          <div className="fieldsrow">
            <div className="actions">
              <input type="submit" name="submit" value={"Submit"} />
              <input type="reset" name="reset" value={"Reset"} />
            </div>
          </div>
        </form>
      </div>
      <Link to={`/view`}>See Data..!</Link>
    </div>
  );
};
