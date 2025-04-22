import { useEffect, useState } from "react";
import { createDocument, getAllDocument } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { DocumentType } from "../types/document";

function useDocument() {
    const [document, setDocument] = useState<DocumentType[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);
    console.log(keycloak.token);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllDocument();

            setDocument(response.data);

        } catch (err: any) {

            setError(err.message || 'Lỗi khi gọi API');

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createNewDocument = async (doc: DocumentType) => {
        try {
            setLoading(true)
            await createDocument(doc)
            fetchData()
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
            setError("Lỗi tạo trang trại")
        } finally {
            setLoading(false)
        }
    }

    return { document, isLoadingDocument: loading, error, createNewDocument };
}

export default useDocument;