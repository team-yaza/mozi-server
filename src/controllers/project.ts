import { Request, Response } from 'express';

import { findAllProjects, createProject, findProjectById } from '@/services/project';
import { createHeader } from '@/services/header';

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

export const createProjectHeaderHandler = async (req: Request, res: Response) => {
  try {
    const { title: headerTitle, projectId, index } = req.body;

    const header = await createHeader({ title: headerTitle, index });
    const project = await findProjectById(projectId);

    project?.headers?.push({
      headerId: header.id,
      title: header.title,
      index: header.index,
    }); // TODO mongoose Model Type 정의 후 refactor

    await project?.save();

    return res.status(201).json({ message: 'Header created in Project' });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({ message: 'Header not created' });
  }
};
