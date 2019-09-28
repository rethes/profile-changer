// react libraries
import * as React from 'react';

// third party libraries
import {useSelector} from 'react-redux';
import {useRequest, useMutation} from 'redux-query-react';

//data
import * as nameQueryConfigs from '../query-configs/name';
import * as userSelectors from '../selectors/user';

// css
import '../styles/css/changeUsername.css';
import {Card, Button, Form, InputGroup, FormControl, Alert, Spinner} from 'react-bootstrap';

const ChangeUsername = () => {
  //declare state React hooks
  const [inputValue, setInputValue] = React.useState("");
  const [inputAge, setAge] = React.useState("");
  const [status, setStatus] = React.useState(null);
  const [error, setError] = React.useState(null);

  // get the name and assign it
  const username = useSelector(userSelectors.getName);
  // get the name and assign it
  const age = useSelector(userSelectors.getAge);

  useRequest(nameQueryConfigs.userRequest());
  useRequest(nameQueryConfigs.userRequest());

  // useMutation takes a single parameter – a function that itself returns a query config
  const [queryState, changeName] = useMutation((optimistic: any) =>
    // call the update query config, with the 3 params
    nameQueryConfigs.changeNameMutation(inputValue, inputAge, optimistic)
  );

  const submit = React.useCallback(
    optimistic => {
      changeName(optimistic).then((result: any) => {
        if (result.status !== 200) {
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
      <h1>Your Profile</h1>
      <div className="card-container">
        <Card>
          <Card.Img
            className="card-image"
            variant="top"
            src="https://res.cloudinary.com/do8ik6qe5/image/upload/v1569705555/carlos-vaz-4CcXW0hMlUs-unsplash.jpg"/>
          <Card.Body>
            <Card.Title
              className="user-details"
            >{username || <em>(no username set)</em>}, {age || <em>(no age set)</em>}</Card.Title>
          </Card.Body>
          <Card.Footer className="card-footer">
            <Form
              onSubmit={(e: { preventDefault: () => void; }) => {
                // Prevent default form behavior.
                e.preventDefault();
              }}>
              <div className="input-section">
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    className={"input-fields"}
                    type="text"
                    value={inputValue}
                    placeholder="Enter a new username"
                    disabled={isPending}
                    onChange={(e: any) => {
                      setInputValue(e.target.value);
                    }}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <FormControl
                    aria-label="age"
                    aria-describedby="basic-addon1"
                    className={"input-fields"}
                    type="number"
                    value={inputAge}
                    placeholder="Enter a new age"
                    disabled={isPending}
                    onChange={(e: any) => {
                      setAge(e.target.value);
                    }}
                  />
                </InputGroup>
              </div>
              <div className="button-section">
                <Button
                  type="submit"
                  onClick={() => submit(false)}
                  disabled={isPending}
                  variant="outline-primary">
                  Submit
                </Button>
                <Button
                  type="submit"
                  onClick={() => submit(true)}
                  disabled={isPending}
                  variant="outline-primary">
                  I'm Feeling Optimistic
                </Button>
              </div>
              {isPending ? (
                <Button variant="dark" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Loading...
                </Button>

              ) : (
                typeof status === "number" && (
                  <>
                    {status === 200 ? (
                      <Alert className="alert-message" variant="success" dismissible>
                        <Alert.Heading> Updates Successfully</Alert.Heading>
                      </Alert>
                    ) : (
                      <Alert className="alert-message" variant="danger" dismissible>
                        <Alert.Heading>{error} </Alert.Heading>
                      </Alert>
                    )}
                  </>
                )
              )}
            </Form>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
};

export default ChangeUsername;
