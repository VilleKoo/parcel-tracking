import React from "react";
// import styled from "styled-components";
import { languages } from "../utils/constants";

export default function LanguageSelect({ handleSubmit }) {
  const lan = Object.entries(languages).map(([key, value]) => {
    return <option value={key}>{value}</option>;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Select language
          <select value={"moi"} onChange={console.log("moi")}>
            {lan}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
