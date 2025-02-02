import { ErrorStatus, isErrorStatus } from "../types/ErrorStatus";
import { createPath, createQuery, createRequest } from "./request";

type SessionData = { guest_session_id: string; expires_at: string };

const loadSessionId = async (): Promise<SessionData | ErrorStatus> => {
  const path = createPath(import.meta.env.API_GUEST_SESSION);
  const query = createQuery();
  const response = await createRequest<SessionData>(path, query);

  return isErrorStatus(response as ErrorStatus)
    ? (response as ErrorStatus)
    : (response as SessionData);
};

export const getSessionId = async () => {
  const sessionName = "session";

  const json = localStorage.getItem(sessionName);

  const saved = !!json && (JSON.parse(json) as SessionData);
  const update = !(saved && new Date(saved.expires_at) > new Date());

  const result = update ? await loadSessionId() : (saved as SessionData);
  const error = isErrorStatus(result as ErrorStatus);

  if (!error && update) {
    localStorage.removeItem(sessionName);
    localStorage.setItem(sessionName, JSON.stringify(result));
  }

  return error ? (result as ErrorStatus) : (result as SessionData).guest_session_id;
};
