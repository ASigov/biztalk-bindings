import React from 'react';
import { ApplicationTemplate } from '../../shared/template';
import Dropdown from './Dropdown';

interface ApplicationTemplatesPanelProps {
  templates?: ApplicationTemplate[];
  selectedTemplate?: ApplicationTemplate;
  onSelect: (app: ApplicationTemplate) => void;
}

const ApplicationTemplatesPanel = (
  props: ApplicationTemplatesPanelProps,
): JSX.Element => {
  const { templates, selectedTemplate, onSelect } = props;

  const formatter = (app: ApplicationTemplate): string => app.name;

  return (
    <>
      <div className="row">
        <div className="col mt-3">
          <h4>Application templates</h4>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <Dropdown
            id="apps-dropdown"
            items={templates}
            selectedItem={selectedTemplate}
            onSelect={onSelect}
            format={formatter}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicationTemplatesPanel;
