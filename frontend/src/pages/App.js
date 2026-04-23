import React, { useState } from "react";
import Login from "./Login";
import Feed from "./Feed";

export default function App() {
  const [user, setUser] = useState(null);

  return user 
    ? <Feed user={user} /> 
    : <Login setUser={setUser} />;
}