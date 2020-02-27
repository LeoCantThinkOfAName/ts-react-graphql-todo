import React from "react";
import { NextPage } from "next";
import { withApollo } from "../../lib/apollo";
import { useRouter } from "next/router";
import { useTaskQuery } from "../../generated/graphql";
import UpdateTaskForm from "../../components/UpdateTaskForm";

const UpdatePage: NextPage = () => {
  const router = useRouter();
  const id =
    typeof router.query.id === "string" ? parseInt(router.query.id) : NaN;

  const { loading, error, data } = useTaskQuery({
    variables: {
      id
    }
  });
  const task = data?.task;

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error Occured!</p>
      ) : task ? (
        <UpdateTaskForm initialValues={task} />
      ) : (
        <p>Not Found.</p>
      )}
    </>
  );
};

export default withApollo(UpdatePage);
