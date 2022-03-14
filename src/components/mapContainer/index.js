import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Stage, Layer } from "react-konva";
import Element from "../Element";
import {
  ElementContext,
  ElementDispatchContext,
} from "../../hooks/ElementContext";

const CONTAINER_STYLE = {
  position: "absolute",
  border: "3px solid #ff1f1f",
  display: "flex",
  zIndex: 0,
  position: "absolute",
};

function MapContainer({ config }) {
  const { elements, elementSelectedId } = useContext(ElementContext);
  const { removeElementSelected, updateElement, setElementSelected } =
    useContext(ElementDispatchContext);

  const checkDeselect = (event) => {
    const clickedOnEmpty = event.target === event.target.getStage();
    if (clickedOnEmpty) removeElementSelected();
  };

  return (
    <div style={CONTAINER_STYLE}>
      <Stage
        width={config.width}
        height={config.height}
        onClick={checkDeselect}
      >
        <Layer>
          {elements.map(({ id, ...elementProps }) => (
            <Element
              key={id}
              id={id}
              updateElement={updateElement}
              setElementSelected={setElementSelected}
              isSelected={id === elementSelectedId}
              elementProps={elementProps}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}

MapContainer.propTypes = {
  config: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
    opacity: 0.2,
  }).isRequired,
  mutableElements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
      width: PropTypes.number,
      height: PropTypes.number,
    })
  ).isRequired,
  setMutableElements: PropTypes.func.isRequired,
};

export default MapContainer;
