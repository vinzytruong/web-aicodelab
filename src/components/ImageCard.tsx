import { Paper } from "@mui/material";
import { useConfig } from "../hooks/useConfig";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ImageCardProps {
    id: number | string,
    photo: string,
    aspectRatio: string,
    title?: string,
    description?: string,
    limitDescription?: number,
    href?: string,
    isEffect?: boolean
    objectFit?: "contain" | "fill",
    isBorderRadius?: boolean,
}
export const ImageCard = ({ aspectRatio, photo, isBorderRadius, id, description, href, isEffect, limitDescription, objectFit, title }: ImageCardProps) => {
    const { borderRadius } = useConfig()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleImageLoaded = () => {
        setLoading(false);
    };
    const openImageViewer = useCallback(() => {
        if (href) navigate(href);
    }, [href, navigate]);

    return (
        <Paper sx={{
            aspectRatio: aspectRatio,
            overflow: 'hidden',
            position: 'relative',
            cursor: "pointer",
            borderRadius: `${!isBorderRadius ? 0 : borderRadius}px`,
            // background:"red",
            transition: "transform 0.3s, box-shadow 0.3s",
            ':hover': {
                transform: isEffect ? "scale(1.02)" : "none",
            }

        }}
        >
            {loading && <div className="placeholder">
                Loading...
            </div>}
            
                <img
                    src={photo}
                    alt="Example"
                    onClick={() => openImageViewer()}
                    onLoad={handleImageLoaded}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: objectFit,
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        borderRadius: `${!isBorderRadius ? 0 : borderRadius}px`
                    }}
                />
            
        </Paper>
    )
}