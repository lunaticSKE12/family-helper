import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/List/Lists';
import { Button, Container, Form, Icon, Modal } from 'semantic-ui-react';

Amplify.configure(awsConfig);

function App() {
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
            ></Form.Input>
            <Form.TextArea
              label="Description"
              placeholder="Things that my pretty list is about"
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
