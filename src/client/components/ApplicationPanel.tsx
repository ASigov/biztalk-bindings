import React from 'react';
import ApplicationPicker from './ApplicationPicker';
import { Application } from '../../shared/model';

interface ApplicationPanelProps {
  apps?: Application[];
  selectedApp?: Application;
  setSelectedApp: (app: Application) => void;
}

const ApplicationPanel = (props: ApplicationPanelProps): JSX.Element => {
  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>Application</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ApplicationPicker {...props} />
        </div>
      </div>
    </>
  );
};

export default ApplicationPanel;
