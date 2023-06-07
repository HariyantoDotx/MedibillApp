export const responseHandler = async (result: any) => {
   console.log('result', result)
  if (result?.error) {
     console.log('result', result?.error);
  }
};
