<?php
namespace App\Http\Requests\Export;
use Illuminate\Foundation\Http\FormRequest;
class CreateExportRequest extends FormRequest { public function authorize(): bool { return true; } public function rules(): array { return ['project_id'=>['required','integer','exists:projects,id']]; } }
