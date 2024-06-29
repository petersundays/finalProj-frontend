import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectPrivate from './ProjectPrivate/ProjectPrivate';
import ProjectPublic from './ProjectPublic/ProjectPublic';
import './ProjectView.css';

// Assume fetchProjectById is a function that fetches project details by ID

const ProjectView = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);


  useEffect(() => {
    // Fetch the project details by ID
    // This is a placeholder, replace with your actual fetch logic
    // fetchProjectById(id).then(setProject);
  }, [id]);

  if (!project) {
    return <div>Loading...</div>; // Or any other loading state
  }

  // Conditional rendering based on the project's visibility
  return project.isPrivate ? <ProjectPrivate project={project} /> : <ProjectPublic project={project} />;
};

export default ProjectView;
