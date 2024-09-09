export default (
  success: boolean,
  statusCode: number,
  message: string,
  data: any
) => {
  return {
    success,
    statusCode,
    message,
    [success === true ? "data" : "errors"]: data,
  };
};
