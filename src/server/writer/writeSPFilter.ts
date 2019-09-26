import { XMLDocumentCB } from 'xmlbuilder';
import { SendPort } from '../../shared/model';

const writeSPFilter = (
  feed: XMLDocumentCB,
  sp: SendPort,
  appName: string,
): void => {
  feed.ele('Filter').up();
};

export default writeSPFilter;

/*
&lt;Filter xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"&gt;
  &lt;Group&gt;
    &lt;Statement Property="BTS.ReceivePortName" Operator="0" Value="BILLING.2CS.DX.WC.R.837I.5010.OUT" /&gt;
  &lt;/Group&gt;
&lt;/Filter&gt;
*/
