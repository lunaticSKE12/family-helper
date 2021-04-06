import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import 'Semantic-UI-CSS/semantic.min.css';
import React, { useEffect, useState } from 'react';
import MainHeader from './components/headers/MainHeader';
import Lists from './components/List/Lists';

Amplify.configure(awsConfig);

function App() {
  const [lists, setLists] = useState([]);

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setLists(data.listLists.items);
    console.log(data);
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <AmplifyAuthenticator>
      <AmplifySignOut />
      <div className="App">
        <MainHeader />
        <Lists lists={lists} />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
