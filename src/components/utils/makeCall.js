
export const makeCall = async (
    endpoint,
    body = {},
    headers = {},
    reqType = ""
  ) => {
  
    try {
      const requestOptions = {
        method: reqType,
        headers: headers,
      };
       console.log("gotten in here");
      // Add body only if the request type is not "GET" or "HEAD"
      if (reqType.toUpperCase() !== "GET" && reqType.toUpperCase() !== "HEAD") {
        requestOptions.body = JSON.stringify(body);
      }
  
      const response = await fetch(endpoint, requestOptions);
  
      const responseData = await response.json();
      console.log(responseData, "from inside utils");
      return responseData;
    } catch (error) {
      console.log("error");
      throw error;
    }
  };
  