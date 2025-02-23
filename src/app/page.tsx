"use client"
import type { NextPage } from 'next';
import UploadVideo from '../Componenets/uploadVideo';
import { useState } from 'react';

const Home: NextPage = () => {
  const [src,setSrc] = useState("");
  

  return (
    <div className="container mx-auto p-4 flex flex-col gap-10">
      <h1 className="text-3xl font-bold mb-6">My Video Upload & Player</h1>
      <UploadVideo setSrc = {setSrc} />
      {src && <video controls src={src}/>}
    </div>
  );
};

export default Home;
