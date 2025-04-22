import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { GraphLink, GraphNode } from "../../types/graph";
import { DocumentType } from "../../types/document";

type Props = {
    documents: DocumentType[];
};

function GraphDB({ documents }: Props) {

    const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
        nodes: [],
        links: []
    });

    useEffect(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];

        documents.forEach((doc) => {
            const docId = `Book:${doc.title}`;
            const authorId = `Author:${doc.author}`;
            const fieldId = `Field:${doc.field}`;
            const publisherId = `Publisher:${doc.publisher}`;

            nodes.push({ id: docId, type: doc.type });
            nodes.push({ id: authorId, type: "Author" });
            nodes.push({ id: fieldId, type: "Field" });
            nodes.push({ id: publisherId, type: "Publisher" });

            links.push({ source: docId, target: authorId, label: "written_by" });
            links.push({ source: docId, target: fieldId, label: "in_field" });
            links.push({ source: docId, target: publisherId, label: "published_by" });
        });

        const uniqueNodes = Array.from(new Map(nodes.map((n) => [n.id, n])).values());
        setGraphData({ nodes: uniqueNodes, links });
    }, [documents]);

    return (

        <ForceGraph2D
            graphData={graphData}
            nodeLabel={(node: GraphNode) => `${node.id} (${node.type})`} // Tooltip khi hover
            linkLabel={(link: GraphLink) => link.label} // Tooltip khi hover link
            nodeAutoColorBy="type"
            linkDirectionalArrowLength={6}
            linkDirectionalArrowRelPos={1}
            backgroundColor="#f0f0f0" // Màu nền
            linkCanvasObjectMode={() => 'after'}
            linkCanvasObject={(link, ctx, globalScale) => {
                const label = link.label;
                if (!label) return;

                const start = link.source as GraphNode & { x: number; y: number };
                const end = link.target as GraphNode & { x: number; y: number };

                if (typeof start === 'object' && typeof end === 'object') {
                    const textPos = {
                        x: (start.x + end.x) / 2,
                        y: (start.y + end.y) / 2
                    };

                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    ctx.fillStyle = 'black';
                    ctx.fillText(label, textPos.x, textPos.y);
                }
            }}
            // Thiết lập chiều rộng và chiều cao cố định cho canvas
            width={1200}  // Chiều rộng theo kích thước màn hình hoặc có thể thay đổi cho phù hợp
            height={700}               // Chiều cao cố định
            minZoom={3}
        />


    );
}

export default GraphDB;