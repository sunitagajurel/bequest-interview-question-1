import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";

function App() {
  const [data, setData] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await fetch(API_URL);
    const { data } = await response.json();
    setData(data);
  };

  const updateData = async () => {
    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ data }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    await getData();
  };

  const verifyData = async () => {
    try {
      const res = await fetch(`${API_URL}/verify`, {
        method: "POST",
        body: JSON.stringify({ data }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200){
          setMessage("your  data is safe , it was not tampered ")
      }
      else{
        setMessage("OOPs! your data seems to be breached")
        setError(true)
      }
    }
    catch (err){
      console.log(err)
    }
  };

  const recoverData = async () => {
    const res = await fetch(`${API_URL}/recover`)
    const data = await res.json()
    setData(data);
    setError(false);
    setMessage("your data has been successfully recoverd")
  };

  const textStyle = {
    color: error ?'red' : 'green',
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        position: "absolute",
        padding: 0,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div>Saved Data</div>
      <input
        style={{ fontSize: "30px" }}
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button style={{ fontSize: "20px" }} onClick={updateData}>
          Update Data
        </button>
        <button style={{ fontSize: "20px" }} onClick={verifyData}>
          Verify Data
        </button>
      </div>
      <p style= {textStyle}> {message}</p>
      { error? (<button onClick = {recoverData}> RecoverData </button>) : ""}
    </div>
  );
}

export default App;
