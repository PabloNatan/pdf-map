import React, { useState } from "react";
import { useDocument } from "../../contexts/document";
import dynamic from "next/dynamic";
const DocumentContainer = dynamic(() => import("../documentContainer"), {
  ssr: false,
});
const MapContainer = dynamic(() => import("../mapContainer"), {
  ssr: false,
});

const PDFHighlighter = ({ hidehighlighter }) => {
  const { pagesHandler } = useDocument();

  const [mapContainerConfig, setMapContainerConfig] = useState({
    width: 0,
    height: 550,
  });

  console.log(mapContainerConfig);

  return (
    <div>
      {pagesHandler && (
        <div style={styles.headerContainer}>
          <h3 style={styles.header}>
            Página: {pagesHandler?.currentPage} de {pagesHandler.totalPages}.
          </h3>
        </div>
      )}
      <div
        style={{
          ...styles.scrollbarContainer,
          overflowX: `${mapContainerConfig.width > 800 ? "scroll" : "hidden"}`,
        }}
      >
        <div
          style={{
            ...styles.pdfViewer,
            width: mapContainerConfig?.width + 32,
            height: mapContainerConfig?.height + 32,
          }}
        >
          <DocumentContainer setDocumentSize={setMapContainerConfig} />
          {!hidehighlighter && <MapContainer config={mapContainerConfig} />}
        </div>
      </div>
    </div>
  );
};

export default PDFHighlighter;

const styles = {
  scrollbarContainer: {
    backgroundColor: "#cecece",
    display: "block",
    marginBottom: "20px",
    padding: 3,
    marginRight: 50,
    maxWidth: 900,
    borderRadius: 15,
    marginLeft: 250,
    boxShadow: "0 0 0.4rem 0.2rem black",
  },
  pdfViewer: {
    backgroundColor: "#2a2b2c",
    display: "flex",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    // boxShadow: "0 0.5rem 1rem black",
    borderRadius: "10px",
  },
  header: {
    color: "black",
    fontSize: "20px",
    marginTop: "40px",
    backgroundColor: "transparent",
    height: "35px",
    borderRadius: "5px",
    textAlign: "center",
    minWidth: "180px",
    boxShadow: "0 0rem 0.2rem gray",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "transparent",
    marginLeft: "200px",
    maxWidth: "970px",
    marginBottom: "10px",
  },
};
