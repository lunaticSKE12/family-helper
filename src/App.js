import './App.css';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsConfig from './aws-exports';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listLists } from './graphql/queries';
import 'Semantic-UI-CSS/semantic.min.css';
import React, { useEffect, useState } from 'react';
import MainHeader from './components/headers/MainHeader';

Amplify.configure(awsConfig);

function App() {
  const [list, setList] = useState([]);

  async function fetchList() {
    const { data } = await API.graphql(graphqlOperation(listLists));
    setList(data.listLists.items);
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
        <ul>
          {list.map((item) => (
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>
      </div>
    </AmplifyAuthenticator>
  );
}

export default App;
