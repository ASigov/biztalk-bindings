import ParserState from '../parser/ParserState';
import { SendPort } from '../../shared/model';
import mapAdapterConfigSend from './mapAdapterConfigSend';
import mapSendPortFilter from './mapSendPortFilter';

const mapSendPorts = (
  state: ParserState,
  applicationName: string,
): SendPort[] => {
  return state.sendPorts
    .filter((sp): boolean => sp.applicationName === applicationName)
    .map(
      (sp): SendPort => ({
        name: sp.name,
        profileName: '',
        address: sp.address,
        adapterName: sp.adapterName,
        adapterConfig: mapAdapterConfigSend(sp),
        filter: mapSendPortFilter(sp),
      }),
    )
    .sort((left, right): number => left.name.localeCompare(right.name));
};

export default mapSendPorts;
