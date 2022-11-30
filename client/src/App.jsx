import Landing from "./components/Landing"
import Main from "./components/Main"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"
import ProjectDet from "./components/ProjectDet";
import LearnMore from "./components/LearnMore";
function App() {
  const client = new ApolloClient({
    uri: "https://ProjectWala.varunsingh23.repl.co",
    cache: new InMemoryCache(),
  });
  return (
    <>
      <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<Main />} />
          <Route path="/project/:id" element={<ProjectDet />} />
          <Route path="/LearnMore" element={<LearnMore />} />
        </Routes>
      </BrowserRouter>
      </ApolloProvider>
    </>
  )
}

export default App
