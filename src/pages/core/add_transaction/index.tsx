import { useCallback, useEffect, useState } from "react";

import "../../../assets/styles/form.css";

import { Link, useNavigate, useParams } from "react-router-dom";

import {
  dynamicTransactionForm,
  getFile,
  TransactionFormInitialValues,
} from "../../../utils/constants";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  addTransaction,
  editTransaction,
} from "../../../redux/ducks/transaction_slice";
import { transactionValidationSchema } from "../../../validations/schema";
import { FormField } from "../../../components/FormFields/FormField";
import { useAppDispatch, useAppSelector } from "../../../redux/ducks/hooks";
import { RootState } from "../../../redux/store";
import { Transaction } from "../../../models/transactionModel";

export const AddTransaction = (): JSX.Element => {
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

  const [values, setValues] = useState<Transaction>(
    TransactionFormInitialValues
  );
  const [submit, setSubmit] = useState<boolean>(false);

  const transactions = useAppSelector((state: RootState) => {
    return state.transactions;
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id !== undefined && id !== "" && id !== null) {
      let data = transactions.filter(
        (item: Transaction) => item.id === parseInt(id)
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

      Object.values(allvalues).forEach((item: Transaction) => {
        if (item === null || item === undefined) {
          errflag = 1;
          return;
        }
      });

      if (errflag !== 1) {
        if (id !== null && id !== undefined && id !== "") {
          dispatch(editTransaction({ edit: allvalues, id: parseInt(id) }));
        } else {
          dispatch(addTransaction(allvalues));
        }

        navigate(`/transactions`);
      }
    }
  }, [submit]);

  const onSubmit = useCallback(async (data: any) => {
    if (typeof data.receipt !== "string") {
      let file = await getFile(data.receipt[0]);

      if (typeof file === "string") {
        data.receipt = file;
      }
    }

    let newdata = { ...values };
    newdata = data;
    setSubmit(true);
    setValues(newdata);
  }, []);

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
          {Object.keys(dynamicTransactionForm).map((input) =>
            dynamicTransactionForm[input].type === "file" ? (
              <FormField
                key={input}
                formValues={values}
                errors={errors}
                register={register}
                {...dynamicTransactionForm[input]}
                operations={{
                  getFile: getFile,
                  removeFile: removeFile,
                  setValues: setValues,
                }}
              />
            ) : (
              <FormField
                key={input}
                formValues={values}
                errors={errors}
                register={register}
                {...dynamicTransactionForm[input]}
              />
            )
          )}

          <div className="actions">
            <input type="submit" name="submit" value={"Submit"} />
          </div>
        </form>
      </div>
      <Link to={`/transactions`}>See Data..!</Link>
    </div>
  );
};
