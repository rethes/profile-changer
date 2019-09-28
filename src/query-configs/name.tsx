export const nameRequest = () => {
  return {
    url: `/api/name`,
    update: {
      name: (prev: any, next: any) => next,
    },
  };
};

export const changeNameMutation = (name: string, optimistic: any) => {
  const queryConfig = {
    url: `/api/change-name`,
    body: {
      name,
    },
    update: {
      name: (prev: any, next: any) => next,
    },
    optimisticUpdate: {}
  };

  if (optimistic) {
    queryConfig.optimisticUpdate = {
      name: () => name,
    };
  }

  return queryConfig;
};
