import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import React, { useEffect, useState } from 'react';

Amplify.configure(awsConfig);

function App() {
  const [list, setlist] = useState([]);

  async function fetchList() {
    const result = await API.graphql(graphqlOperation(listLists));

    console.log(result);
  }

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <AmplifyAuthenticator>
      <div className="App">
        <h1>Welcome to amplify</h1>
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
        <AmplifySignOut />
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
