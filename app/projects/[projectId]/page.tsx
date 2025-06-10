import { ProjectDetailClient } from './ProjectDetailClient';
import { projectsAPI } from '@/lib/api';

export async function generateStaticParams() {
  const projects = await projectsAPI.getAll();
  
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  return <ProjectDetailClient projectId={params.projectId} />;
}