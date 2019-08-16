import React from 'react';
import { Application } from '../../shared/model';

interface ApplicationPickerProps {
  apps?: Application[];
  selectedApp?: Application;
  setSelectedApp: (item: Application) => void;
}

const ApplicationPicker = (props: ApplicationPickerProps): JSX.Element => {
  const { apps, selectedApp, setSelectedApp } = props;

  return (
    <div className="dropdown">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {selectedApp ? selectedApp.name : 'Select ...'}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {apps &&
          apps.map(
            (app): JSX.Element => (
              <button
                className="dropdown-item"
                type="button"
                key={app.name}
                onClick={(): void => setSelectedApp(app)}
              >
                {app.name}
              </button>
            ),
          )}
      </div>
    </div>
  );
};

export default ApplicationPicker;
