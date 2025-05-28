// components/ProjectList.jsx
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getProjects } from "@/actions/organizations";
import DeleteProject from "./delete-project";

export default async function ProjectList({ orgId }) {
  const projects = await getProjects(orgId);

  if (projects.length === 0) {
    return (
      <p className="text-gray-400 text-center">
        No projects found.{" "}
        <Link
          className="underline underline-offset-4 text-purple-400 hover:text-purple-300 transition-colors"
          href="/project/create"
        >
          Create New.
        </Link>
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <Card
          key={project.id}
          className="bg-[#1b1b2f] hover:bg-[#232340] transition-colors duration-300 border border-purple-800/40 shadow-md hover:shadow-purple-900/30 rounded-xl"
        >
          <CardHeader>
            <CardTitle className="flex justify-between items-start text-lg text-white">
              <span className="truncate w-[85%]">{project.name}</span>
              <DeleteProject projectId={project.id} />
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-400 mb-4 line-clamp-3">
              {project.description}
            </p>
            <Link
              href={`/project/${project.id}`}
              className="inline-block text-purple-400 hover:text-purple-300 hover:underline transition-all text-sm font-medium"
            >
              View Project →
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
