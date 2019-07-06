import React from 'react';

import './Providers.css';
import AddProvider from './AddProvider';
import ActiveProviders from './ActiveProviders';

class Providers extends React.Component {
  state = {
    providersWithTasks: {},
  };

  addProviderWithTasks = (provider, tasks) => {
    const { providersWithTasks } = this.state;

    providersWithTasks[provider.doctor_id] = {
      provider,
      tasks
    };

    this.setState({ providersWithTasks });
  };

  render() {
    return (
      <main>
        <div id="modal-root" />
        <header>
          <h1>Providers</h1> 
        </header>
        <div className="flex">
          <div className="active-providers">
            <ActiveProviders providersWithTasks={this.state.providersWithTasks} />
          </div>
          <div className="sidebar">
            <AddProvider addProviderWithTasks={this.addProviderWithTasks} />
          </div>
        </div>
      </main>
    );
  }
}

export default Providers;
