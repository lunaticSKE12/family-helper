import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import 'semantic-ui-css/semantic.min.css';
import React, { useEffect, useState } from 'react';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/List/Lists';
import { Button, Container, Icon } from 'semantic-ui-react';

Amplify.configure(awsConfig);

function App() {
  const [lists, setLists] = useState([]);

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <Button className="floatingButton">
        <Icon name="plus" className="floatingButton_icon" />
      </Button>
      <Container>
        <div className="App">
          <MainHeader />
          <Lists lists={lists} />
        </div>
      </Container>
    </AmplifyAuthenticator>
  );
}

export default App;
