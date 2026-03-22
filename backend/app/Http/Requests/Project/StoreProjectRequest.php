<?php
namespace App\Http\Requests\Project;
use Illuminate\Foundation\Http\FormRequest;
class StoreProjectRequest extends FormRequest { public function authorize(): bool { return true; } public function rules(): array { return ['name'=>['required','string','max:255'],'template_id'=>['nullable','integer'],'paper_size_id'=>['nullable','integer'],'fold_type_id'=>['nullable','integer'],'pages'=>['required','array','min:1'],'pages.*.page_number'=>['required','integer'],'pages.*.name'=>['required','string'],'pages.*.canvas_data'=>['required','array'],'meta'=>['nullable','array']]; } }
