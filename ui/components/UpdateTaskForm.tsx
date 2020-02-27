import React, { useState, useEffect } from "react";
import { useUpdateTaskMutation, Task } from "../generated/graphql";
import { useRouter } from "next/router";

interface Values {
  id: number;
  title: string;
  status: string;
}

interface Props {
  initialValues: Values;
}

const UpdateTaskForm: React.FC<Props> = ({ initialValues }) => {
  const [values, setValues] = useState<Values>(initialValues);
  const [updateTask, { loading, error, data }] = useUpdateTaskMutation();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValues(values => ({ ...values, title: name }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loading) {
      updateTask({
        variables: {
          input: {
            id: values.id,
            title: values.title
          }
        }
      });
    }
  };

  useEffect(() => {
    if (data && data.updateTask) {
      router.push("/");
    }
  }, [data]);

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="alert-error">Error Occured!</p>}
      <label htmlFor="title" className="field-label">
        Title
      </label>
      <input
        type="text"
        name="title"
        className="text-input"
        value={values.title}
        onChange={handleChange}
      />
      <p />
      <button type="submit" className="button" disabled={loading}>
        {loading ? "Loading..." : "Save"}
      </button>
    </form>
  );
};

export default UpdateTaskForm;
