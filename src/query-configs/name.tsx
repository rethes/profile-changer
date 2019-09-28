// action creators and reducers
export const userRequest = () => {
  return {
    url: `/api/user`,
    update: {
      age: (prev: any, next: any) => next,
      name: (prev: any, next: any) => next,
    },
  };
};

export const changeNameMutation = (name: string, age: string, optimistic: any) => {
  const queryConfig = {
    url: `/api/change-name`,
    body: {
      name, age
    },
    update: {
      name: (prev: any, next: any) => next,
      age: (prev: any, next: any) => next,
    },
    optimisticUpdate: {}
  };

  if (optimistic) {
    queryConfig.optimisticUpdate = {
      name: () => name,
      age: () => age,
    };
  }

  return queryConfig;
};
