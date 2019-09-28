const artificialDelayDuration = 1000;

// Fake database to record the name
const memoryDb = {
  name: 'Temporary Name',
};

const mockNetworkInterface = (url: { match: any }, method: string, { body }: any) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return {
    abort() {
      if (timeoutId) {
        // reset
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
    execute(callback:any){
      if (url.match(/^\/api\/name/)) {
        // Endpoint for getting the current name
        if (method.toUpperCase() === "GET") {
          timeoutId = setTimeout(() => {
            callback(null, 200, {
              name: memoryDb.name
            });
          }, artificialDelayDuration);
        } else {
          callback(null, 405);
        }
      }
      else if (url.match(/^\/api\/change-name/)) {
        // Endpoint for changing the name

        // Validate HTTP method
        if (method !== "POST") {
          callback(null, 405);
          return;
        }
        // Validate empty input
        if (!body.name) {
          timeoutId = setTimeout(() => {
            callback(null, 400, null, "Username cannot be empty");
          }, artificialDelayDuration);
          return;
        }
        // Validate input
        if (
          body.name.trim() !== body.name ||
          !body.name.match(/^[a-zA-Z0-9]+$/)
        ) {
          timeoutId = setTimeout(() => {
            callback(
              null,
              400,
              null,
              "A valid username must only contain alphanumerics with no leading or trailing spaces"
            );
          }, artificialDelayDuration);
          return;
        }

        //Add name to the database
        memoryDb.name = body.name;

        timeoutId = setTimeout(() => {
          const responseBody = {
            name: memoryDb.name
          };
          callback(null, 200, responseBody, JSON.stringify(responseBody));
        }, artificialDelayDuration);
      } else {
        callback(null, 404);
      }

    }

  };
};

export default mockNetworkInterface;
