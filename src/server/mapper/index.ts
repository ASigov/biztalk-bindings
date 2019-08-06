import ParserState from '../parser/ParserState';
import { Bindings } from '../../shared/model';
import mapApplications from './mapApplications';

const mapBindings = (state: ParserState): Bindings => ({
  applications: mapApplications(state),
});

export default mapBindings;
