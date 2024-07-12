import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore.jsx"
import { Base_url_notifications } from "../functions/UsersFunctions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const NotificationWS = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const notificationWSClient = useRef(null); // Store the WebSocket client object in a ref and prevents re-renders 
    const loggedUser = userStore((state) => state.loggedUser);
    
    const clearLoggedUser = userStore((state) => state.clearLoggedUser);
    const setUserList = userStore((state) => state.setUserList);
    
    const WS_URL = `${Base_url_notifications}${loggedUser.sessionToken}`;
    const [shouldReconnect, setShouldReconnect] = useState(true);

    useEffect(() => {
                
        const connect = () => {

            if (notificationWSClient.current && notificationWSClient.current.readyState === WebSocket.OPEN) {
                console.log("WebSocket is already connected");
                return;
            }
            
            const ws = new WebSocket(WS_URL);

            ws.onopen = () => {
                console.log("Connected to websocket");
                notificationWSClient.current = ws; 
            };

            ws.onmessage = (event) => {
                const data = event.data;
                                        
                if (data === "logout") {
                    console.log("User logged out");
                    toast.error(t("Session expired"), { autoClose: 5000 });
                    clearLoggedUser();
                    setUserList([]);
                    navigate("/");
                    setShouldReconnect(false);
                    return;
                }
                
            };

            ws.onerror = (error) => {
                console.error("WebSocket error: ", error);
            };

            ws.onclose = (event) => {
                console.log("Disconnected from websocket");
                notificationWSClient.current = null;
                console.log("loggedUser.sessionToken : ", loggedUser);

                // If the WebSocket was closed for a reason other than the user logging out, try to reconnect
               /*  if (!event.wasClean && loggedUser && loggedUser.sessionToken && shouldReconnect) {
                    console.log("Reconnecting to websocket...");
                    setTimeout(connect, 5000);  // Try to reconnect after a delay
                } */
            };
        };

        if (loggedUser.sessionToken) {
            connect();
        }

        return () => {
            if (notificationWSClient.current) {
                notificationWSClient.current.close(1000, "User logged out");  // Close the WebSocket connection when the user logs out
                notificationWSClient.current = null;
            }
            setShouldReconnect(false);
        };
    },  [loggedUser.sessionToken]);  // Depend on the user's login status

    return { ws: notificationWSClient.current };
};