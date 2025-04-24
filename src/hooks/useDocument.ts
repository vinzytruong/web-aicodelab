import { useEffect, useState } from "react";
import {
    createDocument,
    deleteDocumentById,
    getAllDocument,
    updateDocument,
    searchDocumentsByName,
    createDocumentsFromExcel,
} from "../services/ai-assistant-service";
import { useKeycloak } from "@react-keycloak/web";
import { attachAuthInterceptor } from "../services/global-config-service";
import { DocumentType } from "../types/document";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../store/hook";
import { DOCUMENTS_GET_ALL } from "../store/document/action";
import useDebounce from "./useDebounce";

function useDocument() {
    const { documents: storedDocuments } = useAppSelector((state) => state.document);
    const { keycloak } = useKeycloak();
    const dispatch = useAppDispatch();

    const [searchTerm, setSearchTerm] = useState<string>("");
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);

    useEffect(() => {
        attachAuthInterceptor(() => keycloak.token);
    }, [keycloak.token]);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getAllDocument();
            const allDocs = response.data?.data || [];
            dispatch(DOCUMENTS_GET_ALL({ documents: allDocs }));
            setDocuments(allDocs); // đặt documents mặc định
        } catch (err: any) {
            setError(err.message || "Lỗi khi gọi API");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔍 Gọi API tìm kiếm nếu có từ khóa
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (!debouncedSearchTerm) {
                setDocuments(storedDocuments); // không có từ khóa => dùng toàn bộ documents
                return;
            }
            try {
                setLoading(true);
                const res = await searchDocumentsByName(debouncedSearchTerm);
                setDocuments(res.data?.data || []);
            } catch (error: any) {
                console.error("Lỗi khi tìm kiếm:", error);
                toast.error("Không tìm được tài liệu");
                setError("Lỗi khi tìm kiếm");
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [debouncedSearchTerm, storedDocuments]);

    const createNewDocument = async (doc: DocumentType) => {
        try {
            setLoading(true);
            await createDocument(doc);
            await fetchData();
            toast.success("Tạo thành công");
        } catch (error) {
            console.error("Error fetching GeoJSON data:", error);
            setError("Lỗi tạo trang trại");
            toast.error("Lỗi khi tạo");
        } finally {
            setLoading(false);
        }
    };

    const editDocument = async (updateId: string, doc: DocumentType) => {
        try {
            setLoading(true);
            await updateDocument(updateId, doc);
            await fetchData();
            toast.success("Sửa thành công");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Lỗi khi sửa");
            toast.error("Lỗi khi sửa");
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (deleteId: string) => {
        try {
            setLoading(true);
            await deleteDocumentById(deleteId);
            await fetchData();
            toast.success("Xóa thành công");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Lỗi khi xóa");
            toast.error("Lỗi khi xóa");
        } finally {
            setLoading(false);
        }
    };


    const importDocument = async (file: any) => {
        try {
            setLoading(true);
            await createDocumentsFromExcel(file);
            await fetchData();
            toast.success("Import thành công");
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Lỗi khi import");
            toast.error("Lỗi khi import");
        } finally {
            setLoading(false);
        }
    };
    return {
        documents,
        isLoadingDocument: loading,
        error,
        createNewDocument,
        editDocument,
        deleteDocument,
        searchTerm,
        setSearchTerm,
        importDocument
    };
}

export default useDocument;
