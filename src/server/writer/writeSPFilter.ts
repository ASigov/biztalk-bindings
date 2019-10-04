import xmlbuilder, { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';

const writeSPFilter = (feed: XMLDocumentCB, sp: SendPort): void => {
  if (sp.filter) {
    feed
      .ele('Filter')
      .text(
        xmlbuilder
          .create('Filter', { headless: true })
          .att('xmlns:xsi', 'http://www.w3.org/2001/XMLSchema-instance')
          .att('xmlns:xsd', 'http://www.w3.org/2001/XMLSchema')
          .ele('Group')
          .ele('Statement', {
            Property: sp.filter.property,
            Operator: 0,
            Value: sp.filter.value,
          })
          .end(),
      )
      .up();
  } else {
    feed.ele('Filter').up();
  }
};

export default writeSPFilter;
