import { Request, Response } from 'express';

import { findAllProjects, createProject } from '@/services/project';

export const getAllProjectsHandler = async (req: Request, res: Response) => {
  try {
    const projects = await findAllProjects();

    return res.status(200).json(projects);
  } catch (error) {
    res.status(404).json({ message: 'Projects not found' });
  }
};

export const createProjectHandler = async (req: Request, res: Response) => {
  try {
    const project = await createProject(req.body);

    return res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ message: 'Project not created' });
  }
};
