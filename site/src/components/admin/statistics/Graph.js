import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function Graph({ maxHeight, type, data, options }) {
  const graphRef = useRef(null);

  useEffect(() => {
    if (graphRef.current) {
      new Chart(graphRef.current.getContext("2d"), {
        type,
        data,
        options,
      });
    }
    // eslint-disable-next-line
  }, [graphRef.current, type, data, options]);

  return <canvas ref={graphRef} style={maxHeight ? { maxHeight } : null} />;
}
