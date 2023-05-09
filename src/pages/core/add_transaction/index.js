import { useEffect, useState } from "react";

import "../../../assets/styles/form.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import { Account } from "./components/accountlist";
import { MonthYear } from "./components/monthyearlist";
import monthYears, {
  accountTypes,
  getFile,
  initialValues,
  today,
  transactionTypes,
  validationSchema,
} from "../../../utils/constants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTransactions } from "../../../providers/transaction_provider";
import { getSingleTransaction, saveData } from "../../../requests/requests";

export const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [submit, setSubmit] = useState(false);

  const { transactions, setTransactions } = useTransactions();

  useEffect(() => {
    if (id !== undefined && id !== "" && id !== null) {
      let newdata = [...transactions];

      let data = getSingleTransaction(newdata, id);

      if (data.length !== 0) {
        let newvalues = { ...values };
        for (let i in data[0]) {
          newvalues[i] = data[0][i];

          setValue(i, data[0][i]);
        }
        setValues(newvalues);
      } else {
        navigate("/*");
      }
    }
  }, [id]);

  useEffect(() => {
    if (submit === true) {
      let allvalues = { ...values };

      let errflag = 0;

      Object.values(allvalues).forEach((item) => {
        if (item === "" || item === null || item === undefined) {
          errflag = 1;
          return;
        }
      });

      if (errflag !== 1) {
        if (transactions.length === 0 || transactions.length === undefined) {
          saveData(transactions, setTransactions, "first", allvalues);
        } else {
          let newdata = [...transactions];

          saveData(newdata, setTransactions, "create-edit", allvalues, id);
        }
        navigate(`/transactions`);
      }
    }
  }, [submit]);

  const onSubmit = async (data) => {
    if (typeof data.receipt !== "string") {
      let file = await getFile(data.receipt[0]);

      data.receipt = file;
    }

    let newdata = { ...values };
    newdata = data;
    setSubmit(true);
    setValues(newdata);
  };

  const removeFile = () => {
    let newvalues = { ...values };

    newvalues.receipt = "";

    setValues(newvalues);
    setValue("receipt", "");
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <label>Transaction date :-</label>

          <input
            type="date"
            className="forminputs"
            max={today.toISOString().split("T")[0]}
            {...register("tdate")}
          />
          {errors.tdate && (
            <p style={{ color: "red" }}>{errors.tdate?.message}</p>
          )}

          <br />
          <br />

          <label>Notes :-</label>
          <textarea {...register("notes")} className="forminputs" />
          {errors.notes && (
            <p style={{ color: "red" }}>{errors.notes?.message}</p>
          )}

          <br />
          <br />

          <label>Amount :-</label>
          <input type="number" className="forminputs" {...register("amount")} />
          {errors.amount && (
            <p style={{ color: "red" }}>{errors.amount?.message}</p>
          )}
          <br />
          <br />

          <label>From A/c :-</label>
          <select {...register("FromAc")} className="forminputs">
            <option value={""}>Select FromAc</option>
            <Account accountTypes={accountTypes} />
          </select>
          {errors.FromAc && (
            <p style={{ color: "red" }}>{errors.FromAc?.message}</p>
          )}
          <br />
          <br />

          <label>To A/c :-</label>
          <select {...register("ToAc")} className="forminputs">
            <option value={""}>Select ToAc</option>
            <Account accountTypes={accountTypes} />
          </select>
          {errors.ToAc && (
            <p style={{ color: "red" }}>{errors.ToAc?.message}</p>
          )}
          <br />
          <br />

          <label>Transaction type :-</label>
          <select {...register("ttype")} className="forminputs">
            <option value={""}>Select transaction type</option>
            {transactionTypes.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.ttype && (
            <p style={{ color: "red" }}>{errors.ttype?.message}</p>
          )}
          <br />
          <br />

          <label>Month Year :-</label>
          <select {...register("monthyear")} className="forminputs">
            <MonthYear monthYears={monthYears} />
          </select>
          {errors.monthyear && (
            <p style={{ color: "red" }}>{errors.monthyear?.message}</p>
          )}
          <br />
          <br />

          <label>Receipt :-</label>

          {values.receipt === "" ? (
            <input
              type="file"
              className="forminputs"
              {...register("receipt", {
                onChange: async (e) => {
                  let file = await getFile(e.target.files[0]);

                  setValues({ ...values, receipt: file });
                },
              })}
            />
          ) : (
            <div>
              <div className="cross" onClick={() => removeFile()}>
                X
              </div>
              <img width={80} height={60} src={`${values.receipt}`} alt="alt" />
            </div>
          )}
          {errors.receipt && (
            <p style={{ color: "red" }}>{errors.receipt?.message}</p>
          )}
          <br />
          <br />

          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>
        </form>
      </div>
      <Link to={`/transactions`}>See Data..!</Link>
    </div>
  );
};
