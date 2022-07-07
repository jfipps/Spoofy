import { useEffect } from "react";

function GetCode() {
  const test = new URLSearchParams(window.location.search).get("code");
  return test;
}

export const testThing = GetCode();
