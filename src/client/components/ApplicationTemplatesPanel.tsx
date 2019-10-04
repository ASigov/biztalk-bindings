import React from 'react';
import { ApplicationTemplate } from '../../shared/template';
import Dropdown from './Dropdown';

interface ApplicationTemplatesPanelProps {
  templates: ApplicationTemplate[];
  selectedTemplate: ApplicationTemplate;
  onChange: (template: ApplicationTemplate) => void;
}

const ApplicationTemplatesPanel = (
  props: ApplicationTemplatesPanelProps,
): JSX.Element => {
  const { templates, selectedTemplate, onChange } = props;

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
            onChange={onChange}
            format={(t): string => t.applicationName}
          />
        </div>
      </div>
    </>
  );
};

export default ApplicationTemplatesPanel;
