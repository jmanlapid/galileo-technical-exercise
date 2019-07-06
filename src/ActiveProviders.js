import React from 'react';

const Tasks = ({ tasks }) => {
  if (!tasks.length) {
    return <h4>No Tasks</h4>
  }

  return tasks.map((task) => {
    return (
      <li key={task.task_id} className="task">
        {task.task_id}
      </li>
    )
  });
};

const ActiveProviders = ({ providersWithTasks }) => {
  const providersAndTasks = Object.values(providersWithTasks);

  if (!providersAndTasks.length) {
    return (
      <h2>No Active Providers</h2>
    );
  }

  return providersAndTasks.map((providerWithTasks) => {
    const { provider, tasks } = providerWithTasks;
    return(
      <div key={provider.doctor_id} className="provider-column">
        <h2 className="provider-header">
          {provider.first_name} {provider.last_name} 
        </h2>
        <ul className="tasks">
          <Tasks tasks={tasks} />
        </ul>
      </div>
    );
  });
}

export default ActiveProviders;
