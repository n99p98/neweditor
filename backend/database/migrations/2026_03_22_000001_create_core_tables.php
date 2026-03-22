<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->boolean('is_admin')->default(false)->index();
            $table->boolean('has_free_hd_downloads')->default(false)->index();
            $table->timestamps();
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        Schema::create('social_accounts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('provider');
            $table->string('provider_user_id');
            $table->string('provider_email')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->unique(['provider', 'provider_user_id']);
        });

        Schema::create('template_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('template_tags', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->timestamps();
        });

        Schema::create('paper_sizes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->decimal('width_mm', 8, 2);
            $table->decimal('height_mm', 8, 2);
            $table->boolean('is_custom')->default(false);
            $table->timestamps();
        });

        Schema::create('fold_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->json('guides')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
        });

        Schema::create('templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->nullable()->constrained('template_categories')->nullOnDelete();
            $table->foreignId('paper_size_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('fold_type_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('orientation', 20)->index();
            $table->string('excerpt')->nullable();
            $table->text('description')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->string('preview_image_path')->nullable();
            $table->json('canvas_schema');
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_published')->default(true)->index();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('template_template_tag', function (Blueprint $table) {
            $table->foreignId('template_id')->constrained()->cascadeOnDelete();
            $table->foreignId('template_tag_id')->constrained('template_tags')->cascadeOnDelete();
            $table->primary(['template_id', 'template_tag_id']);
        });

        Schema::create('template_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained()->cascadeOnDelete();
            $table->string('type');
            $table->string('path');
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('template_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('paper_size_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('fold_type_id')->nullable()->constrained()->nullOnDelete();
            $table->string('name');
            $table->string('slug')->index();
            $table->string('status')->default('draft')->index();
            $table->string('thumbnail_path')->nullable();
            $table->json('meta')->nullable();
            $table->boolean('is_favorite')->default(false)->index();
            $table->timestamp('last_opened_at')->nullable()->index();
            $table->softDeletes();
            $table->timestamps();
        });

        Schema::create('project_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->unsignedInteger('page_number');
            $table->string('name');
            $table->json('canvas_data');
            $table->timestamps();
            $table->unique(['project_id', 'page_number']);
        });

        Schema::create('project_elements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_page_id')->constrained()->cascadeOnDelete();
            $table->string('element_key')->index();
            $table->string('element_type')->index();
            $table->integer('z_index')->default(0);
            $table->json('payload');
            $table->timestamps();
        });

        Schema::create('uploads', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('disk');
            $table->string('path');
            $table->string('mime_type');
            $table->unsignedBigInteger('size');
            $table->string('kind')->index();
            $table->json('meta')->nullable();
            $table->boolean('is_private')->default(true)->index();
            $table->timestamps();
        });

        Schema::create('exports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->string('type')->index();
            $table->string('status')->default('queued')->index();
            $table->string('disk')->nullable();
            $table->string('path')->nullable();
            $table->boolean('watermarked')->default(false);
            $table->json('meta')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamps();
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_id')->nullable()->constrained()->nullOnDelete();
            $table->string('status')->default('pending')->index();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('USD');
            $table->json('meta')->nullable();
            $table->timestamps();
        });

        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('order_id')->constrained()->cascadeOnDelete();
            $table->string('provider');
            $table->string('provider_payment_id')->nullable()->index();
            $table->string('status')->index();
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3);
            $table->json('payload')->nullable();
            $table->timestamps();
        });

        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('group')->index();
            $table->string('key');
            $table->json('value')->nullable();
            $table->timestamps();
            $table->unique(['group', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('app_settings');
        Schema::dropIfExists('payments');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('exports');
        Schema::dropIfExists('uploads');
        Schema::dropIfExists('project_elements');
        Schema::dropIfExists('project_pages');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('template_assets');
        Schema::dropIfExists('template_template_tag');
        Schema::dropIfExists('templates');
        Schema::dropIfExists('fold_types');
        Schema::dropIfExists('paper_sizes');
        Schema::dropIfExists('template_tags');
        Schema::dropIfExists('template_categories');
        Schema::dropIfExists('social_accounts');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
    }
};
