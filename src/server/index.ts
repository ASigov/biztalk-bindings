import express from 'express';
import multer from 'multer';
import debug from 'debug';
import { Bindings } from '../shared/bindings';

const model: Bindings = {
  applications: [
    {
      name: 'OCCM.EDI.Billing.In',
      sendPorts: [
        {
          name: 'Billing.In.ArchiveSP.BILLING.WCEDI.WC.R.837I.5010.IN',
        },
        {
          name: 'Billing.In.ArchiveSP.BILLING.WCEDI.WC.R.837P.5010.IN',
        },
      ],
      receiveLocations: [
        {
          name: 'Billing.In.InboundRL.BILLING.WCEDI.WC.R.837I.5010.IN',
        },
        {
          name: 'Billing.In.InboundRL.BILLING.WCEDI.WC.R.837P.5010.IN',
        },
      ],
    },
    {
      name: 'OCCM.EDI.Billing.Out',
      sendPorts: [
        {
          name: 'Billing.Out.ScheduleRL.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.BISHOP.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.INTEGRA.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.OutboundSP.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
      ],
      receiveLocations: [
        {
          name: 'Billing.Out.ScheduleRL.BILLING.AMERISYS.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.BISHOP.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.INTEGRA.PT.WC.P.837I.5010.OUT',
        },
        {
          name: 'Billing.Out.ScheduleRL.BILLING.JOPARI.PT.WC.P.837I.5010.OUT',
        },
      ],
    },
    {
      name: 'OCCM.EDI.Router',
      sendPorts: [
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.IN',
        },
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.BILL.TRP.WC.R.OUT',
        },
        {
          name: 'EDI.Router.SP.ROUTER.WCEDI.TIN.TRP.WC.R.OUT',
        },
      ],
      receiveLocations: [
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.IN',
        },
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.BILL.TRP.WC.R.OUT',
        },
        {
          name: 'EDI.Router.RL.ROUTER.WCEDI.TIN.TRP.WC.R.OUT',
        },
      ],
    },
  ],
};

const app = express();
const upload = multer();
const log = debug('biztalk-bindings:server');

app.use(express.static('public'));
app.use(express.static('dist/client'));
app.use(express.static('node_modules/react/umd'));
app.use(express.static('node_modules/react-dom/umd'));
app.use(express.static('node_modules/bootstrap/dist/css'));
app.use(express.static('node_modules/bootstrap/dist/js'));
app.use(express.static('node_modules/jquery/dist'));
app.use(express.static('node_modules/bs-custom-file-input/dist'));

app.post('/upload', (req, res): void => {
  res.json(model);
});

app.listen(3000, (): void => log('Listening on port 3000...'));
