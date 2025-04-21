import { useEffect, useState } from "react";
import { getAllDocument } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";

function useDocument() {
    const [document, setDocument] = useState()
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);
    console.log(keycloak.token);

    useEffect(() => {
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

        fetchData();

    }, []);

    return { document, loading, error };
}

export default useDocument;