import React from 'react';
import { Application } from '../../shared/model';

interface GeneratePanelProps {
  app?: Application;
  onGenerate: () => void;
}

const GeneratePanel = (props: GeneratePanelProps): JSX.Element => {
  const { app, onGenerate } = props;

  const handleClick = (): void => {
    onGenerate();
  };

  return (
    <div className="row">
      <div className="col mt-3">
        <button
          className="btn btn-primary btn-lg btn-block"
          type="button"
          onClick={handleClick}
        >
          {`Generate ${app ? app.name : ''} bindings`}
        </button>
      </div>
    </div>
  );
};

export default GeneratePanel;
