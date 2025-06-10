import { AdminProjectDetailClient } from './AdminProjectDetailClient';
import { projectsAPI } from '@/lib/api';

export async function generateStaticParams() {
  const projects = await projectsAPI.getAll();
  
  return projects.map((project) => ({
    projectId: project.id,
  }));
}

export default function AdminProjectDetailPage({ params }: { params: { projectId: string } }) {
  return <AdminProjectDetailClient projectId={params.projectId} />;
}
