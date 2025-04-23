import { useEffect, useState } from "react";
import { createAuthor, deleteAuthorById, getAllAuthor } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { Author } from "../types/document";

function useAuthor() {
    const [authors, setAuthor] = useState<Author[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);


    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllAuthor();

            setAuthor(response.data?.data);

        } catch (err: any) {

            setError(err.message || 'Lỗi khi gọi API');

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createNewAuthor = async (doc: Author) => {
        try {
            setLoading(true)
            await createAuthor(doc)
            await fetchData()
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
            setError("Lỗi tạo trang trại")
        } finally {
            setLoading(false)
        }
    }
    const deleteAuthor = async (authorId: string) => {
        try {
            setLoading(true)
            await deleteAuthorById(authorId)
            await fetchData()
        } catch (error) {
            console.error('Error fetching GeoJSON data:', error);
            setError("Lỗi tạo trang trại")
        } finally {
            setLoading(false)
        }
    }
    return { authors, isLoadingAuthor: loading, error, createNewAuthor, fetchDataAuthor: fetchData, deleteAuthor };
}

export default useAuthor;