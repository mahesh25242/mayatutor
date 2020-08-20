<?php

use Illuminate\Database\Seeder;

class SettingsTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	DB::table('settings')->truncate();
	$countries = array(
            array('name' => 'site name','value' => 'MayaTutor'),
            array('name' => 'email','value' => 'info@mayatutor.com'),
            array('name' => 'teacher trial period','value' => '90'),
		);
		DB::table('settings')->insert($countries);
	}
}
