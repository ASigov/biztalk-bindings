import convert from 'xml-js';

const parseAdapterConfig = (
  text: string,
  includeAttributes: boolean = false,
): any => {
  const options = {
    compact: true,
    ignoreAttributes: !includeAttributes,
    attributesKey: 'attr',
    textKey: 'text',
  };
  const customProps: any = convert.xml2js(text, options);
  const config: any = convert.xml2js(
    customProps.CustomProps.AdapterConfig.text,
    options,
  );
  return config;
};

export default parseAdapterConfig;
