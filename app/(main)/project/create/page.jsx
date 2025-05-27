"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/use-fetch";
import { projectSchema } from "@/app/lib/validators";
import { createProject } from "@/actions/projects";
import { BarLoader } from "react-spinners";
import OrgSwitcher from "@/components/org-switcher";

export default function CreateProjectPage() {
  const router = useRouter();
  const { isLoaded: isOrgLoaded, membership } = useOrganization();
  const { isLoaded: isUserLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(projectSchema),
  });

  useEffect(() => {
    if (isOrgLoaded && isUserLoaded && membership) {
      setIsAdmin(membership.role === "org:admin");
    }
  }, [isOrgLoaded, isUserLoaded, membership]);

  const {
    loading,
    error,
    data: project,
    fn: createProjectFn,
  } = useFetch(createProject);

  const onSubmit = async (data) => {
    if (!isAdmin) {
      alert("Only organization admins can create projects");
      return;
    }
    createProjectFn(data);
  };

  useEffect(() => {
    if (project) router.push(`/project/${project.id}`);
  }, [loading]);

  if (!isOrgLoaded || !isUserLoaded) return null;

  if (!isAdmin) {
    return (
      <div className="flex flex-col gap-4 items-center justify-center min-h-[60vh] text-center">
        <span className="text-2xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
          Oops! Only Admins can create projects.
        </span>
        <OrgSwitcher />
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-12 px-6 rounded-xl bg-[#121220] shadow-2xl border border-slate-800 mt-16">
      <h1 className="text-3xl font-bold text-center mb-10 bg-gradient-to-r from-purple-500 via-purple-200 to-purple-500 text-transparent bg-clip-text">
        Create New Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-6">
        <div>
          <Input
            id="name"
            {...register("name")}
            className="bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-slate-600"
            placeholder="Project Name"
          />
          {errors.name && (
            <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            id="key"
            {...register("key")}
            className="bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-slate-600"
            placeholder="Project Key (Ex: RCYT)"
          />
          {errors.key && (
            <p className="text-red-400 text-sm mt-1">{errors.key.message}</p>
          )}
        </div>

        <div>
          <Textarea
            id="description"
            {...register("description")}
            className="bg-slate-800 border border-slate-700 h-32 resize-none focus:ring-2 focus:ring-slate-600"
            placeholder="Project Description"
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {loading && (
          <BarLoader className="mb-4" width={"100%"} color="#a3a3a3" />
        )}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="bg-purple-700 hover:bg-purple-600 text-white transition-all"
        >
          {loading ? "Creating..." : "Create Project"}
        </Button>

        {error && (
          <p className="text-red-400 mt-2 text-center">{error.message}</p>
        )}
      </form>
    </div>
  );
}
