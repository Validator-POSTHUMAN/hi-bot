const parseCallbackParams = (paramData: string): { [p: string]: string } | null => {
  const [_, params] = paramData.split('?');
  if (params) {
    const result: { [p: string]: string } = {};
    params.split('&').forEach((param) => {
      const [paramName, paramValue] = param.split('=');
      result[paramName] = paramValue;
    });

    return result;
  }

  return null;
};

export default parseCallbackParams;
