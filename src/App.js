import {
  Button,
  Card,
  Form,
  FormLayout,
  Page,
  TextField,
} from "@shopify/polaris";
import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Grid1 from "./components/Grid1";
import Welocme from "./components/Welcome";

function App() {
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const getData = async (data) => {
    const url = new URL("https://fbapi.sellernext.com/user/login");
    for (let i in data) {
      url.searchParams.append(i, data[i]);
    }
    const ftch = await fetch(url, {
      headers: {
        Authorization:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
      },
    });
    return ftch.json();
  };
  const formHandler = async (event) => {
    // event.preventDefault();
    const inp = { username: username, password: password };
    const dt = await getData(inp);
    if (dt.success) {
      sessionStorage.setItem("k", dt.data.token);
      setUsername("");
      setPassword("");
      setError(false);
      nav("/welcome");
    } else {
      setError(true);
    }
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Page title="Login">
              <Card sectioned>
                {error && <h2 style={{ color: "red" }}>Invalid credentials</h2>}
                <Form onSubmit={formHandler} noValidate>
                  <FormLayout>
                    
                    <TextField
                      label="Username"
                      helpText="We will use this username to authenticate you"
                      value={username}
                      requiredIndicator
                      onChange={(event) => {
                        // console.log(event)
                        setUsername(event);
                      }}
                      placeholder="username"
                    />
                    <TextField
                      label="Password"
                      helpText="We will use this password to authenticate you"
                      value={password}
                      requiredIndicator
                      onChange={(event) => setPassword(event)}
                      placeholder="password"
                    />
                    <Button primary submit>
                      Login
                    </Button>
                  </FormLayout>
                </Form>
              </Card>
            </Page>
          </>
        }
      />
      <Route path="/welcome" element={<Welocme />} />
      <Route path="/grid" element={<Grid1 />}/>
    </Routes>
  );
}

export default App;
