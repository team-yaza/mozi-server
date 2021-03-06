import Project from '@/models/project';

export const findAllProjects = async () => {
  const projects = await Project.find();
  return projects;
};

export const createProject = async (todo: any) => {
  const project = await Project.create(todo);
  return project;
};

export const findProjectById = async (id: string) => {
  const project = await Project.findById(id);
  return project;
};
