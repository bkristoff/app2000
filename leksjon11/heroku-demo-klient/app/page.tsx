"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {

  const url = `https://heroku-demo-tjener-c9da92cfa440.herokuapp.com/`;
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const hentData = async () => {
      try {
        const { data:response } = await axios.get(url);
        setMsg(response);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
        } else {
          console.error('An unknown error occurred');
        }
      }
    };
    hentData();
  }, [url]);

  return (
    <div>
      <h1>Demo</h1>
      <h1>{msg}</h1>
    </div>
  );
}
