import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import "antd/dist/antd.css";
import { useDocument } from "../contexts/document";
import SideMenu from "../components/sideMenu";
import { ElementProvider } from "../hooks/ElementContext";

const PDFHighlighter = dynamic(() => import("../components/PDFHighlighter"));
const MenuOfElements = dynamic(() => import("../components/MenuOfElements"));
const ActionsButtons = dynamic(() => import("../components/ActionsButtons"));

export default function Home() {
  const { url } = useDocument();
  return (
    <main style={styles.main}>
      <ElementProvider>
        {url && <PDFHighlighter />}

        <SideMenu />

        <div style={styles.actions}>
          <ActionsButtons />
          <MenuOfElements />
        </div>
      </ElementProvider>
    </main>
  );
}

const styles = {
  main: {
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    right: "0px",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  actions: {
    backgroundColor: "black",
    display: "flex",
    // minHeight: "2000px",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    flexDirection: "column",
    right: 0,
    // position: "fixed",
  },
};
