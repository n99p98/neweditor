<?php
namespace Tests\Feature;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
class ProjectApiTest extends TestCase {
 use RefreshDatabase;
 public function test_authenticated_user_can_create_project(): void {
  $user = User::factory()->create();
  $response = $this->actingAs($user)->postJson('/api/projects', ['name'=>'Tri Fold Flyer','pages'=>[['page_number'=>1,'name'=>'Front','canvas_data'=>['version'=>1,'elements'=>[]]]]]);
  $response->assertCreated();
 }
}
