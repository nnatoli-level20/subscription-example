import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { gql, useMutation, useSubscription } from "@apollo/client";

const POST_CREATED = gql`
  subscription PostCreated {
    postCreated {
      author
      comment
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($author: String!, $comment: String!) {
    createPost(author: $author, comment: $comment) {
      success
    }
  }
`;

function App() {
  const { data, loading } = useSubscription(POST_CREATED);
  const [createPost] = useMutation(CREATE_POST);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (loading) return;

    console.log(data);
    setCount(count + 1);
  }, [data, loading, setCount]);

  const onClick = () => {
    createPost({
      variables: {
        author: "Nick Natoli",
        comment: "Hi",
      },
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}
        <button onClick={onClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
