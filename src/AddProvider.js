import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

import getDoctorsApi from './api/getDoctorsApi';
import getTasksByDoctorIdApi from './api/getTasksByDoctorIdApi';

export default class AddProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: '',
      showModal: false,
      providerResults: [],
    };
  }

  searchProviders = (event) => {
    const { value } = event.target;
    this.setState({ providerResults: [], inputValue: value });

    if (!value || !value.length) {
      return;
    }

    getDoctorsApi().then((providers) => {
      // mock results by filtering providers by the input value since API isn't clearly defined with params
      const filteredProviders = providers.filter((provider) => {
        const nameToSearch =  `${provider.first_name} ${provider.last_name}`.toLowerCase();
        return nameToSearch.indexOf(value.toLowerCase()) > -1;
      });
      this.setState({ providerResults: filteredProviders });
    });
  };

  selectProvider = (provider) => {
    const { addProviderWithTasks } = this.props;

    getTasksByDoctorIdApi(provider).then((tasks) => {
      const tasksSortedByPriority = tasks.sort((task1, task2) => {
        // assume "highest" priority means the greater the number the higher priority
        if ( task1.priority > task2.priority ) {
          return -1;
        } else if( task1.priority < task2.priority ) {
          return 1;
        }
        return 0;
      });

      addProviderWithTasks(provider, tasksSortedByPriority);
      this.setState({ showModal: false });
    });
  };

  renderProviderResults = (data) => {
    const { inputValue, providerResults } = this.state;

    if (!inputValue) {
      return null;
    }

    if (!providerResults || !providerResults.length) {
      return (
        <div>No Results</div>
      )
    }

    return providerResults.map((provider) => (
      <div className="result" onClick={() => this.selectProvider(provider)} key={provider.doctor_id}>
        {provider.first_name} {provider.last_name}
      </div>
    ));
  };

  renderProvidersModal() {
    const providersModal = (
      <div className="modal-background">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Search Providers</h2>
            <span onClick={() => this.setState({ showModal: false})}>X</span>
          </div>
            <input 
              type="text" 
              value={this.state.value} 
              onChange={this.searchProviders} 
              placeholder="John Smith">
            </input>
          
          <div>
            {this.renderProviderResults()}
          </div>
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      providersModal,
      document.getElementById('modal-root'),
    );
  }

  render() {
    return (
      <div>
        {this.state.showModal && this.renderProvidersModal()}
        <button onClick={() =>this.setState({ showModal: true })}>
          Add Provider
        </button>
      </div>
    )
  }
}
