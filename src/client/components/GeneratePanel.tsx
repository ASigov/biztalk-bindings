import React from 'react';

interface GeneratePanelProps {
  appName?: string;
}

const GeneratePanel = (props: GeneratePanelProps): JSX.Element => {
  const { appName: selectedAppName } = props;

  return (
    <div className="row">
      <div className="col mt-3">
        <button className="btn btn-primary btn-lg btn-block" type="button">
          {`Generate ${selectedAppName} bindings`}
        </button>
      </div>
    </div>
  );
};

export default GeneratePanel;
