import React from 'react';
import { Application } from '../../shared/model';
import Dropdown from './Dropdown';

interface ApplicationPanelProps {
  apps?: Application[];
  selectedApp?: Application;
  onSelectedAppChange: (app: Application) => void;
}

const ApplicationsPanel = (props: ApplicationPanelProps): JSX.Element => {
  const { apps, selectedApp, onSelectedAppChange } = props;

  const formatApp = (app: Application): string => app.name;

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>Application</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dropdown
            id="apps-dropdown"
            items={apps}
            selectedItem={selectedApp}
            onSelect={onSelectedAppChange}
            format={formatApp}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicationsPanel;
