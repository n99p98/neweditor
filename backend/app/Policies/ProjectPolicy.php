<?php
namespace App\Policies;
use App\Models\Project;
use App\Models\User;
class ProjectPolicy {
 public function view(User $user, Project $project): bool { return $user->id === $project->user_id || $user->is_admin; }
 public function update(User $user, Project $project): bool { return $this->view($user,$project); }
 public function delete(User $user, Project $project): bool { return $this->view($user,$project); }
 public function downloadHd(User $user, Project $project): bool { return $this->view($user,$project) && ($user->has_free_hd_downloads || $user->orders()->where('project_id',$project->id)->where('status','paid')->exists()); }
}
