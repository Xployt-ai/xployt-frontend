interface Repo {
  name: string;
  date: string;
}

const ProjectDetails = ({ repositories }: { repositories: Repo[] }) => (
  <div className="text-left space-y-4">
    <h2 className="text-xl font-semibold">📁 Project Details</h2>
    {repositories.map((repo, i) => (
      <div
        key={i}
        className="bg-[#121212] p-4 rounded-lg border border-gray-700 space-y-3"
      >
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Repository</span>
          <span>{repo.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Last Commit</span>
          <span>{repo.date}</span>
        </div>
      </div>
    ))}
  </div>
);

export default ProjectDetails;
