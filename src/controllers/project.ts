import { Request, Response } from 'express';

import { findAllProjects, createProject, findProjectById } from '@/services/project';
import { createHeader } from '@/services/header';

export const getAllProjectsHandler = async (req: Request, res: Response) => {
  const projects = await findAllProjects();

  res.status(200).json(projects);
};

export const createProjectHandler = async (req: Request, res: Response) => {
  const project = await createProject(req.body);

  res.status(201).json(project);
};

export const createProjectHeaderHandler = async (req: Request, res: Response) => {
  const { title: headerTitle, projectId, index } = req.body;

  const header = await createHeader({ title: headerTitle, index });
  const project = await findProjectById(projectId);

  project?.headers?.push({
    headerId: header.id,
    title: header.title,
    index: header.index,
  }); // TODO mongoose Model Type 정의 후 refactor

  await project?.save();

  res.status(201).json({ message: 'Header created in Project' });
};
