import { useEffect, useState } from "react";

import "../../../assets/styles/form.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import monthYears, {
  accountTypes,
  getFile,
  initialValues,
  today,
  transactionTypes,
} from "../../../utils/constants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch, useSelector } from "react-redux";
import {
  addTransaction,
  editTransaction,
} from "../../../redux/ducks/transaction_slice";
import { transactionValidationSchema } from "../../../validations/schema";
import { FormField } from "../../../components/FormFields/FormField";

export const AddTransaction = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(transactionValidationSchema),
    mode: "all",
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const [values, setValues] = useState(initialValues);
  const [submit, setSubmit] = useState(false);

  const transactions = useSelector((state) => {
    return state.transactions;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (id !== undefined && id !== "" && id !== null) {
      let data = transactions.filter(
        (item) => parseInt(item.id) === parseInt(id)
      );

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
        if (id !== null && id !== undefined && id !== "") {
          dispatch(editTransaction({ edit: allvalues, id: id }));
        } else {
          dispatch(addTransaction(allvalues));
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

  const dynamicForm = {
    tdate: {
      name: "tdate",
      label: "Transaction date",
      type: "date",
      max: today.toISOString().split("T")[0],
    },
    notes: {
      name: "notes",
      label: "Notes",
      type: "textarea",
    },
    amount: {
      name: "amount",
      label: "Amount",
      type: "number",
    },
    FromAc: {
      name: "FromAc",
      label: "From A/c",
      type: "select",
      options: accountTypes,
    },
    ToAc: {
      name: "ToAc",
      label: "To A/c",
      type: "select",
      options: accountTypes,
    },
    ttype: {
      name: "ttype",
      label: "Transaction type",
      type: "select",
      options: transactionTypes,
    },
    monthyear: {
      name: "monthyear",
      label: "Month year",
      type: "select",
      options: monthYears,
    },
    receipt: {
      name: "receipt",
      label: "Receipt",
      type: "file",
      otherType: "image",
      operations: {
        getFile: getFile,
        removeFile: removeFile,
        setValues: setValues,
      },
    },
  };

  return (
    <div className="container">
      <div className="formdiv">
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {Object.keys(dynamicForm).map((input) => (
            <FormField
              key={input}
              formValues={values}
              errors={errors}
              register={register}
              {...dynamicForm[input]}
            />
          ))}

          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>
        </form>
      </div>
      <Link to={`/transactions`}>See Data..!</Link>
    </div>
  );
};
