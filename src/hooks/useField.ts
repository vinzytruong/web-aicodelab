import { useEffect, useState } from "react";
import { createField, deleteFieldById, getAllField, updateField } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { Field } from "../types/document";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { FIELDS_GET_ALL } from "../store/field/action";

function useField() {
    const { fields } = useAppSelector(state => state.field)
    const { keycloak } = useKeycloak();
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllField();
            dispatch(FIELDS_GET_ALL({ fields: response.data?.data }));
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
            toast.success("Tạo thành công")
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi tạo lĩnh vực")
            toast.error("Lỗi khi xóa")
        } finally {
            setLoading(false)
        }
    }
    const editField = async (updateId: string, doc: Field) => {
        try {
            setLoading(true)
            await updateField(updateId, doc)
            await fetchData()
            toast.success("Sửa thành công")
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi khi sửa")
            toast.error("Lỗi khi sửa")
        } finally {
            setLoading(false)
        }
    }

    const deleteField = async (fieldId: string) => {
        try {
            setLoading(true)
            await deleteFieldById(fieldId)
            await fetchData()
            toast.success("Xóa thành công")
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi khi xóa")
            toast.error("Lỗi khi xóa")
        } finally {
            setLoading(false)
        }
    }
    return { fields, isLoadingField: loading, error, createNewField, fetchDataField: fetchData, deleteField, editField };
}

export default useField;