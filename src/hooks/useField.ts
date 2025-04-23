import { useEffect, useState } from "react";
import { createField, deleteFieldById, getAllField } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { Field } from "../types/document";

function useField() {
    const [fields, setField] = useState<Field[]>([])
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
            const response = await getAllField();

            setField(response.data?.data);

        } catch (err: any) {

            setError(err.message || 'Lỗi khi gọi API');

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const createNewField = async (doc: Field) => {
        try {
            setLoading(true)
            await createField(doc)
            await fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi tạo lĩnh vực")
        } finally {
            setLoading(false)
        }
    }
    const deleteField = async (fieldId: string) => {
        try {
            setLoading(true)
            await deleteFieldById(fieldId)
            await fetchData()
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi khi xóa")
        } finally {
            setLoading(false)
        }
    }
    return { fields, isLoadingField: loading, error, createNewField, fetchDataField: fetchData, deleteField };
}

export default useField;