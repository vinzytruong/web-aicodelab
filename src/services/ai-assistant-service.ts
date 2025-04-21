import { aiAssistantApi } from "./global-config-service";

export const getAllDocument = () => aiAssistantApi.get('/')
