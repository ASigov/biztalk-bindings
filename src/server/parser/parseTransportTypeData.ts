import parser from 'fast-xml-parser';
import unescape from 'unescape';

interface TransportTypeData {
  CustomProps: CustomProps;
}

interface CustomProps {
  AdapterConfig: string;
}

const parseTransportTypeData = <T>(text: string): T => {
  const customProps = parser.parse(text) as TransportTypeData;
  return parser.parse(unescape(customProps.CustomProps.AdapterConfig), {
    ignoreAttributes: false,
    ignoreNameSpace: true,
  }) as T;
};

export default parseTransportTypeData;
