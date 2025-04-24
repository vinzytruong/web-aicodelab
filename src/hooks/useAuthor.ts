import { useEffect, useState } from "react";
import { createAuthor, deleteAuthorById, getAllAuthor, updateAuthor } from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { Author } from "../types/document";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { AUTHORS_GET_ALL } from "../store/author/action";

function useAuthor() {
    const { authors } = useAppSelector(state => state.author)
    const { keycloak } = useKeycloak();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllAuthor();
            dispatch(AUTHORS_GET_ALL({ authors: response.data?.data }));
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
            toast.success("Tạo thành công")
        } catch (error) {
            console.error('Error fetching data:', error);
            setError("Lỗi khi tạo")
            toast.error("Lỗi khi tạo")
        } finally {
            setLoading(false)
        }
    }
    const editAuthor = async (updateId: string, doc: Author) => {
        try {
            setLoading(true)
            await updateAuthor(updateId, doc)
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
    const deleteAuthor = async (authorId: string) => {
        try {
            setLoading(true)
            await deleteAuthorById(authorId)
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
    return { authors, isLoadingAuthor: loading, error, createNewAuthor, fetchDataAuthor: fetchData, deleteAuthor, editAuthor };
}

export default useAuthor;