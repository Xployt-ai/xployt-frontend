// Repository model from GET /api/v1/repositories
export interface Repo {
    github_repo_id: string;
    name: string;
    private: boolean;
    is_linked?: boolean; // Only present in GET response
}

// Response from POST /api/v1/repositories (Link Repository)
export interface LinkRepoResponse {
 
        github_repo_id: string;
        name: string;
        id: string;
        user_id: string;
        repository_name: string;
        created_at: string;

}

// Request body for POST /api/v1/repositories (Link Repository)
export interface LinkRepoRequest {
    github_repo_id: string;
    name: string;
    private: boolean;
}

// Response from POST /api/v1/repositories/{repo_name}/clone (Clone Repository)
export interface CloneRepoResponse {

        message: string;
        status: string;
        repository_name: string;
}

// Response from POST /api/v1/repositories/{repo_name}/pull (Pull Repository Updates)
export interface PullRepoResponse {

        message: string;
        status: string;
        repository_name: string;

}

// GET /api/v1/repositories response
export interface GetReposResponse {
    success: boolean;
    data: Repo[];
    message: string;
    timestamp: string;
}
