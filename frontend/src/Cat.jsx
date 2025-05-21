import React from "react";

export default function ({ cat }) {
  return (
    <>
      <img
        src={cat.url}
        width="300px"
        height="150px"
        alt="cat"
        style={{ objectFit: "cover" }}
      />
    </>
  );
}
