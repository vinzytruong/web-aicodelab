import React, { useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
// import { GraphLink, GraphNode } from "../../types/graph";
import { DocumentType, Author } from "../../types/document";

type Props = {
    documents: DocumentType[];
};
export interface GraphNode {
    id: string;
    type: string;
    name?: string; // Dùng để hiển thị tên trong tooltip
}

export interface GraphLink {
    source: string;
    target: string;
    label: string;
}
function GraphDB({ documents }: Props) {
    const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; links: GraphLink[] }>({
        nodes: [],
        links: []
    });

    useEffect(() => {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];

        documents.forEach((doc) => {
            const docId = `Tài liệu:${doc.id}`;
            const fieldId = `Lĩnh vực:${doc.field.id}`;

            // Node tài liệu
            if (!nodes.find((node) => node.id === docId)) {
                nodes.push({ id: docId, type: doc.type, name: doc.title });
            }

            // Node lĩnh vực
            if (!nodes.find((node) => node.id === fieldId)) {
                nodes.push({ id: fieldId, type: "Lĩnh vực", name: doc.field.name });
            }

            // Link: tài liệu -> lĩnh vực
            if (!links.find((link) => link.source === docId && link.target === fieldId)) {
                links.push({ source: docId, target: fieldId, label: "Thuộc lĩnh vực" });
            }

            // Tác giả
            doc.authors.forEach((author: Author) => {
                const authorId = `Tác giả:${author.id}`;

                if (!nodes.find((node) => node.id === authorId)) {
                    nodes.push({ id: authorId, type: "Tác giả", name: author.name });
                }

                if (!links.find((link) => link.source === docId && link.target === authorId)) {
                    links.push({ source: docId, target: authorId, label: "Viết bởi" });
                }
            });
        });

        // Loại bỏ trùng node
        const uniqueNodes = Array.from(new Map(nodes.map((n) => [n.id, n])).values());
        setGraphData({ nodes: uniqueNodes, links });
    }, [documents]);

    return (
        <ForceGraph2D
            graphData={graphData as any}
            nodeLabel={(node: GraphNode) => `${node.name} (${node.type})`} // Tooltip khi hover
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
