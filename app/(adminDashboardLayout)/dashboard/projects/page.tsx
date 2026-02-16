// page.tsx
import { IProject } from '@/lib/types';
import { ProjectHeader } from './_components/ProjectHeader';
import { ProjectCard } from './_components/ProjectCard';

const allProjects: IProject[] = [
  { id: '1', title: 'Marina Bay Hotel', projectCode: 'PRJ-2026-0001', clientName: 'Marina Bay Hotel & Restaurant', location: 'Dubai, Marina', itemCount: 6, rfqCount: 9, totalAmount: 850000, status: 'active' },
  { id: '2', title: 'Palm Jumeirah Resort', projectCode: 'PRJ-2026-0002', clientName: 'Palm Hospitality Group', location: 'Dubai, Palm Jumeirah', itemCount: 12, rfqCount: 15, totalAmount: 1200000, status: 'draft' }
];

async function getProjects(query: string, status: string): Promise<IProject[]> {
  return allProjects.filter(project => {
    const matchesQuery = !query ||
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.projectCode.toLowerCase().includes(query.toLowerCase());

    const matchesStatus = status === 'all' || project.status === status;

    return matchesQuery && matchesStatus;
  });
}

export default async function ProjectPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const status = params.status || 'all';

  const projects = await getProjects(query, status);

  return (
    <div className="min-h-screen">
      <div>
        <ProjectHeader />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-10">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
              No projects found for &quot;{query}&quot; with status &quot;{status}&quot;
            </div>
          )}
        </section>
      </div>
    </div>
  );
}