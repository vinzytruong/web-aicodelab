import React from "react";
import ForceGraph2D from "react-force-graph-2d";

const graphData = {
    nodes: [
        { id: "Alice" },
        { id: "Bob" },
        { id: "Charlie" },
        { id: "David" },
        { id: "Emma" },
    ],
    links: [
        { source: "Alice", target: "Bob" },
        { source: "Alice", target: "Charlie" },
        { source: "Bob", target: "David" },
        { source: "Charlie", target: "Emma" },

        // Gợi ý kết bạn: Alice <-> David, Alice <-> Emma
        { source: "Alice", target: "David", color: "red", dashed: true },
        { source: "Alice", target: "Emma", color: "red", dashed: true },
    ],
};

function GraphDB() {
    return (
        <ForceGraph2D
            graphData={graphData}
            linkColor={(link) => link.color || "gray"}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkLineDash={(link) => (link.dashed ? [5, 5] : [])}
            nodeLabel="id"
            nodeAutoColorBy="id"
        />
    );
}

export default GraphDB;