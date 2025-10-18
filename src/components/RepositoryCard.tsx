import { Button } from "@/components/ui/Button.tsx";
import type { Repo } from "@/data/models/repo.ts";
import { repoEndpoints } from "@/data/network/repo.ts";
import { useNavigate } from "react-router-dom";
import { formatRepoName } from "@/lib/utils.ts";

interface RepositoryCardProps {
  repo: Repo;
  date?: string;
}

const importRepo = async (repo: Repo) => {
  try {
    const response = await repoEndpoints.linkRepo(repo)
    console.log('Repository imported successfully:', response);
    repo.is_linked = true;
  } catch (error) {
    console.error('Failed to import repository:', error);
  }
}

const RepositoryCard = ({repo, date}: RepositoryCardProps) => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    if (!repo.is_linked) return;
    navigate(`/new-scan/${formatRepoName(repo.name)}`);
  };

  return (
    <div
      className="bg-[#121212] p-4 border border-gray-800 rounded-md flex justify-between items-center w-full"
      onClick={() => handleCardClick()}
    >
      <div className="flex items-center gap-3">
        <img src="/Folder.png" alt="folder" className="w-6 h-6" />
        <div>
          <strong>{repo.name}</strong>
          {date && <div className="text-sm text-gray-500">{date}</div>}
        </div>
      </div>
      {!repo.is_linked &&
          <Button
              onClick={() => {
                importRepo(repo)
                  .then(() => {
                    console.log(`Repository ${repo.name} imported successfully.`)
                    navigate('/new-scan/' + formatRepoName(repo.name))
                  })
              }}
              className="bg-white text-black font-bold"
          >
              Import
          </Button>}

    </div>
  )
};

export default RepositoryCard;