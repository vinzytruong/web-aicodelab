import { DocumentType } from "../types/document";
import { aiAssistantApi } from "./global-config-service";

export const getAllDocument = () => aiAssistantApi.get('/documents/')

export const createDocument = (doc: DocumentType) => aiAssistantApi.post('/documents/', doc)
