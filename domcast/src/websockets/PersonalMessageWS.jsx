import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../stores/UserStore.jsx"
import { Base_url_messages } from "../functions/UsersFunctions.jsx";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const PersonalMessageWS = (receiver) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const messageWSClient = useRef(null); // Store the WebSocket client object in a ref and prevents re-renders 
    const loggedUser = userStore((state) => state.loggedUser);
    
    const clearLoggedUser = userStore((state) => state.clearLoggedUser);
    const setUserList = userStore((state) => state.setUserList);
    
    const WS_URL = `${Base_url_messages}${loggedUser.sessionToken}/${receiver}`;
    const [shouldReconnect, setShouldReconnect] = useState(true);

    useEffect(() => {
        console.log("PersonalMessageWS WS_URL 1 : ", WS_URL);
        
        const connect = () => {
            console.log("PersonalMessageWS WS_URL 2 : ", WS_URL);

            if (messageWSClient.current && messageWSClient.current.readyState === WebSocket.OPEN) {
                console.log("WebSocket is already connected");
                return;
            }
            
            const ws = new WebSocket(WS_URL);

            ws.onopen = () => {
                console.log("Connected to websocket");
                messageWSClient.current = ws; 
            };

            ws.onmessage = (event) => {
                const data = event.data;
                                        
                
            };

            ws.onerror = (error) => {
                console.error("WebSocket error: ", error);
            };

            ws.onclose = (event) => {
                console.log("Disconnected from websocket");
                messageWSClient.current = null;
                // If the WebSocket was closed for a reason other than the user logging out, try to reconnect
                if (!event.wasClean && loggedUser && loggedUser.sessionToken) {
                    //console.log("Reconnecting to websocket...");
                    setTimeout(connect, 5000);  // Try to reconnect after a delay
                }
            };
        };

        if (loggedUser.sessionToken) {
            connect();
        }

        return () => {
            if (messageWSClient.current) {
                messageWSClient.current.close(1000, "User logged out");  // Close the WebSocket connection when the user logs out
                messageWSClient.current = null;
            }
            setShouldReconnect(false);
        };
    },  [loggedUser.sessionToken]);  // Depend on the user's login status

    return { ws: messageWSClient.current };
};