import parser from 'fast-xml-parser';
import unescape from 'unescape';

const parseTransportTypeData = (text: string): any => {
  const customProps = parser.parse(text);
  return parser.parse(unescape(customProps.CustomProps.AdapterConfig), {
    ignoreAttributes: false,
    ignoreNameSpace: true,
  });
};

export default parseTransportTypeData;
