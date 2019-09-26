import { XMLDocumentCB } from 'xmlbuilder';
import { ReceiveLocation } from '../../shared/model';

interface PipelineProps {
  Name: string;
  FullyQualifiedName: string;
}

interface PipelineLookup {
  [key: string]: PipelineProps;
}

const lookup: PipelineLookup = {
  PassThruReceive: {
    Name: 'Microsoft.BizTalk.DefaultPipelines.PassThruReceive',
    FullyQualifiedName:
      'Microsoft.BizTalk.DefaultPipelines.PassThruReceive, Microsoft.BizTalk.DefaultPipelines, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
  },
  XMLReceive: {
    Name: 'Microsoft.BizTalk.DefaultPipelines.XMLReceive',
    FullyQualifiedName:
      'Microsoft.BizTalk.DefaultPipelines.XMLReceive, Microsoft.BizTalk.DefaultPipelines, Version=3.0.1.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35',
  },
};

const writeRLReceivePipeline = (
  feed: XMLDocumentCB,
  rl: ReceiveLocation,
): void => {
  // TODO: select based on adapter
  const pipeline = lookup.PassThruReceive;
  feed
    .ele('ReceivePipeline', {
      Name: pipeline.Name,
      FullyQualifiedName: pipeline.FullyQualifiedName,
      Type: 1, // 1 - receive, 2 - send
      TrackingOption: 'None',
    })
    .up();
};

export default writeRLReceivePipeline;
