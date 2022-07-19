import { Request, Response } from 'express';

import { findAllAreas, createArea, findAreaById } from '@/services/area';
import { createProject } from '@/services/project';

export const getAllAreasHandler = async (req: Request, res: Response) => {
  try {
    const areas = await findAllAreas();

    return res.status(200).json(areas);
  } catch (error) {
    res.status(404).json({ message: 'Area not found' });
  }
};

export const createAreaHandler = async (req: Request, res: Response) => {
  try {
    const area = await createArea(req.body);

    return res.status(200).json(area);
  } catch (error) {
    res.status(404).json({ message: 'Area not created' });
  }
};

export const createProjectInAreaHandler = async (req: Request, res: Response) => {
  try {
    const { areaId, projectTitle } = req.body;

    const area = await findAreaById(areaId);
    const project = await createProject({ title: projectTitle });

    area?.projects?.push({
      id: project.id,
      title: project.title,
    });

    await area?.save();

    return res.status(200).json({ message: 'Project created in Area' });
  } catch (error: any) {
    console.log(error.message);
  }
};
