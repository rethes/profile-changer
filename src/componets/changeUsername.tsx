import * as React from "react";
import { useSelector } from "react-redux";
import { useRequest, useMutation } from "redux-query-react";

import * as nameQueryConfigs from "../query-configs/name";
import * as nameSelectors from "../selectors/name";

const ChangeUsername = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [error, setError] = React.useState(null);

  const username = useSelector(nameSelectors.getName);

  useRequest(nameQueryConfigs.nameRequest());

  const [queryState, changeName] = useMutation((optimistic: any) =>
    nameQueryConfigs.changeNameMutation(inputValue, optimistic)
  );

  const submit = React.useCallback(
    optimistic => {
      changeName(optimistic).then((result: any) => {
        if (result !== 200) {
          setError(result.text);
        }

        setStatus(result.status);
      });
    },
    [changeName]
  );

  const isPending = queryState.isPending;

  return (
    <div>
      <h2>Current username</h2>
      <p>{username || <em>(no username set)</em>}</p>
      <h2>Change username</h2>
      <form
        onSubmit={e => {
          // Prevent default form behavior.
          e.preventDefault();
        }}
      >
        <input
          type="text"
          value={inputValue}
          placeholder="Enter a new username"
          disabled={isPending}
          onChange={e => {
            setInputValue(e.target.value);
          }}
        />
        <input
          type="submit"
          value="Submit"
          onClick={() => submit(false)}
          disabled={isPending}
        />
        <input
          type="submit"
          value="I'm Feeling Optimistic"
          onClick={() => submit(true)}
          disabled={isPending}
        />
        {isPending ? (
          <p>Loading…</p>
        ) : (
          typeof status === "number" && (
            <>
              {status === 200 ? (
                <p>Success!</p>
              ) : (
                <p>
                  {error}
                </p>
              )}
            </>
          )
        )}
      </form>
    </div>
  );
};

export default ChangeUsername;
