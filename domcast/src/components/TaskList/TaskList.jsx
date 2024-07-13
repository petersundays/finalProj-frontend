import React, { useEffect, useState } from 'react';
import TaskListMobile from './TaskListMobile/TaskListMobile';
import TaskListGantt from './TaskListGantt/TaskListGantt';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useParams } from 'react-router-dom';

function TaskList () {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 992);
        };

        handleResize(); // Check initial screen size
        window.addEventListener('resize', handleResize); // Listen for resize events

        return () => {
            window.removeEventListener('resize', handleResize); // Clean up the event listener
        };
    }, [id]);

    return isMobile ? <TaskListMobile id={id} /> : <TaskListGantt id={id} />;
};

export default TaskList;