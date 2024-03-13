import React, { useEffect, useState } from 'react';
import { useAuth } from "../../hooks/useAuth";
import Header from "../../components/Header";


export default function Profile() {


  return (
    <>
      <Header />
      <div>
        <h1>This is a Profile page</h1>
      </div>
    </>

  );
}
