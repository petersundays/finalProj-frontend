import React, { useEffect, useState } from 'react';
import TaskListMobile from './TaskListMobile/TaskListMobile';
import TaskListGantt from './TaskListGantt/TaskListGantt';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

function TaskList () {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
    }, []);

    return isMobile ? <TaskListMobile /> : <TaskListGantt />;
};

export default TaskList;