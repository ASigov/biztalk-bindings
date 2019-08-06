import ParserState from '../parser/ParserState';
import { SendPort } from '../../shared/model';
import mapAdapterConfigSend from './mapAdapterConfigSend';

const mapSendPorts = (
  state: ParserState,
  applicationName: string,
): SendPort[] => {
  return state.sendPorts
    .filter((sp): boolean => sp.applicationName === applicationName)
    .map(
      (sp): SendPort => ({
        name: sp.name,
        address: sp.address,
        adapterName: sp.adapterName,
        adapterConfig: mapAdapterConfigSend(sp),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapSendPorts;
