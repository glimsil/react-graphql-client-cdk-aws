import React, { useEffect, useState } from 'react';
import Observable from 'zen-observable-ts';
import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql';
import logo from './logo.svg';
import './App.css';
import Amplify from 'aws-amplify';

Amplify.configure({
  aws_appsync_region: "us-west-2", // Stack region
  aws_appsync_graphqlEndpoint:  "<ENDPOINT>", // AWS AppSync endpoint
  aws_appsync_authenticationType: "API_KEY", //Primary AWS AppSync authentication type
  aws_appsync_apiKey: "<APP_KEY>" // AppSync API Key
});

type Note = {
  id: string;
  name: string;
  completed: boolean;
}

const query = `
  query listNotes {
    listNotes {
      id name completed
    }
  }
`

const subscription = `
  subscription onCreateNote {
    onCreateNote {
      id name completed
    }
  }
`

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  
  useEffect(() => {
    const response: Promise<GraphQLResult<any>> = API.graphql({ query })
    response.then((data: GraphQLResult<any>) => setNotes(data.data?.listNotes as Note[]))

    const sub: Observable<object> = API.graphql({
      query: subscription
    }) as Observable<object>

    sub.subscribe({
      next: noteData => {
        const response: Promise<GraphQLResult<any>> = API.graphql({ query })
        response.then((data: GraphQLResult<any>) => setNotes(data.data?.listNotes as Note[]))
      }
    })
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Notes:
        </p>
        {notes.map((data,id)=>{
          return <div key={id}>
            <h2>{data.id} {data.name}</h2>
            <p>{data.completed}</p>
          </div>
        })}
      </header>
      
    </div>
  );
}

export default App;
