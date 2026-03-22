<?php
namespace Database\Seeders;
use App\Models\AppSetting;
use App\Models\FoldType;
use App\Models\PaperSize;
use App\Models\Template;
use App\Models\TemplateCategory;
use App\Models\User;
use Illuminate\Database\Seeder;
class DatabaseSeeder extends Seeder {
 public function run(): void {
  User::updateOrCreate(['email'=>'admin@printfold.test'],['name'=>'Super Admin','password'=>'Password123!','is_admin'=>true,'has_free_hd_downloads'=>true]);
  foreach ([['A4','a4',210,297],['A5','a5',148,210],['Letter','letter',216,279],['Legal','legal',216,356]] as [$name,$slug,$w,$h]) { PaperSize::updateOrCreate(['slug'=>$slug],['name'=>$name,'width_mm'=>$w,'height_mm'=>$h,'is_custom'=>false]); }
  foreach ([['No Fold','none',[]],['Bi-Fold','bi-fold',[['axis'=>'x','position_ratio'=>0.5]]],['Tri-Fold','tri-fold',[['axis'=>'x','position_ratio'=>0.333],['axis'=>'x','position_ratio'=>0.666]]]] as [$name,$slug,$guides]) { FoldType::updateOrCreate(['slug'=>$slug],['name'=>$name,'guides'=>$guides]); }
  $category = TemplateCategory::updateOrCreate(['slug'=>'brochures'],['name'=>'Brochures','description'=>'Brochures and folded print marketing assets']);
  Template::updateOrCreate(['slug'=>'modern-memorial-bifold'],['name'=>'Modern Memorial Bifold','category_id'=>$category->id,'paper_size_id'=>PaperSize::where('slug','letter')->value('id'),'fold_type_id'=>FoldType::where('slug','bi-fold')->value('id'),'orientation'=>'landscape','excerpt'=>'Elegant folded memorial service program','canvas_schema'=>['version'=>1,'pages'=>[['name'=>'Front','page_number'=>1],['name'=>'Inside','page_number'=>2]]],'is_featured'=>true,'is_published'=>true]);
  AppSetting::updateOrCreate(['group'=>'exports','key'=>'watermark'],['value'=>['text'=>'PREVIEW','opacity'=>0.14]]);
  AppSetting::updateOrCreate(['group'=>'pricing','key'=>'hd_export_price'],['value'=>['amount'=>9.99,'currency'=>'USD']]);
 }
}
