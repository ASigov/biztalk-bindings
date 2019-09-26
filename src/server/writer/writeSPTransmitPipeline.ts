import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';

interface PipelineProps {
  Name: string;
  FullyQualifiedName: string;
}

interface PipelineLookup {
  [key: string]: PipelineProps;
}

const lookup: PipelineLookup = {
  PassThruTransmit: {
    Name: 'Microsoft.BizTalk.DefaultPipelines.PassThruTransmit',
    FullyQualifiedName:
      'Microsoft.BizTalk.DefaultPipelines.PassThruTransmit, Microsoft.BizTalk.DefaultPipelines, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
  },
  XMLTransmit: {
    Name: 'Microsoft.BizTalk.DefaultPipelines.XMLTransmit',
    FullyQualifiedName:
      'Microsoft.BizTalk.DefaultPipelines.XMLTransmit, Microsoft.BizTalk.DefaultPipelines, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
  },
};

const writeSPTransmitPipeline = (feed: XMLDocumentCB, sp: SendPort): void => {
  // TODO: check for archive
  const pipeline = lookup.PassThruTransmit;
  feed
    .ele('TransmitPipeline', {
      Name: pipeline.Name,
      FullyQualifiedName: pipeline.FullyQualifiedName,
      Type: 2, // 1 - receive, 2 - send
      TrackingOption: 'None',
    })
    .up();
};

export default writeSPTransmitPipeline;
