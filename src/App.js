import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState, useReducer } from 'react';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/List/Lists';
import { Button, Container, Form, Icon, Modal } from 'semantic-ui-react';

Amplify.configure(awsConfig);

const initialState = {
  title: '',
  description: '',
};

function listReducer(state = initialState, action) {
  switch (action.type) {
    case 'DESCRIPTION_CHANGED':
      return { ...state, description: action.value };
    case 'TITLE_CHANGED':
      return { ...state, title: action.value };
    default:
      console.log('Default action for: ', action);
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(listReducer, initialState);

  const [lists, setLists] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
  }

  useEffect(() => {
    fetchList();
  }, []);
  function toggleModal(shouldOpen) {
    setIsModalOpen(shouldOpen);
  }
  return (
    <AmplifyAuthenticator>
      <Container style={{ height: '100vh' }}>
        <AmplifySignOut />
        <Button className="floatingButton" onClick={() => toggleModal(true)}>
          <Icon name="plus" className="floatingButton_icon" />
        </Button>
        <div className="App">
          <MainHeader />
          <Lists lists={lists} />
        </div>
      </Container>
      <Modal open={isModalOpen} dimmer="blurring">
        <Modal.Header>Create your list</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              error={
                true ? false : { content: 'Please add a name to your list' }
              }
              label="Title"
              placeholder="My pretty list"
              value={state.title}
              onChange={(e) =>
                dispatch({ type: 'TITLE_CHANGED', value: e.target.value })
              }
            ></Form.Input>
            <Form.TextArea
              label="Description"
              placeholder="Things that my pretty list is about"
              value={state.description}
              onChange={(e) =>
                dispatch({ type: 'DESCRIPTION_CHANGED', value: e.target.value })
              }
            ></Form.TextArea>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => toggleModal(false)}>
            Cancel
          </Button>
          <Button positive onClick={() => toggleModal(false)}>
            Save
          </Button>
        </Modal.Actions>
      </Modal>
    </AmplifyAuthenticator>
  );
}

export default App;
