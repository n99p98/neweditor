<?php
namespace App\Providers;
use App\Models\Export;
use App\Models\Project;
use App\Policies\ExportPolicy;
use App\Policies\ProjectPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
class AuthServiceProvider extends ServiceProvider {
 protected $policies = [Project::class => ProjectPolicy::class, Export::class => ExportPolicy::class];
 public function boot(): void { Gate::define('access-admin', fn ($user) => $user->is_admin); }
}
