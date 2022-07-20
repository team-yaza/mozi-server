import { Request, Response } from 'express';

import { findAllAreas, createArea, findAreaById } from '@/services/area';
import { createProject } from '@/services/project';

export const getAllAreasHandler = async (req: Request, res: Response) => {
  const areas = await findAllAreas();

  res.status(200).json(areas);
};

export const createAreaHandler = async (req: Request, res: Response) => {
  const area = await createArea(req.body);

  res.status(200).json(area);
};

export const createProjectInAreaHandler = async (req: Request, res: Response) => {
  const { areaId, projectTitle } = req.body;

  const area = await findAreaById(areaId);
  const project = await createProject({ title: projectTitle });

  area?.projects?.push({
    id: project.id,
    title: project.title,
  });

  await area?.save();

  res.status(200).json({ message: 'Project created in Area' });
};
