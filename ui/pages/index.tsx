import React from "react";
import { NextPage } from "next";
import { withApollo } from "../lib/apollo";
import { useTasksQuery, TaskStatus } from "../generated/graphql";
import TaskList from "../components/TaskList";
import CreateTaskForm from "../components/CreateTaskForm";

interface InitialProps {}

interface Props extends InitialProps {}

const IndexPage: NextPage<Props, InitialProps> = props => {
  const { loading, error, data, refetch } = useTasksQuery({
    variables: { status: TaskStatus.Active }
  });
  const tasks = data?.tasks;

  if (loading) {
    return <p>Loading...</p>;
  } else if (error) {
    return <p>Error Occured!</p>;
  }

  return (
    <>
      <CreateTaskForm onTaskCreated={refetch} />
      {tasks && <TaskList tasks={tasks} />}
    </>
  );
};

const IndexPageWithApollo = withApollo(IndexPage);

export default IndexPageWithApollo;
