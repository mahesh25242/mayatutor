<?php

use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	DB::table('roles')->truncate();
	$countries = array(
            array('name' => 'Admin','status' => 1),
            array('name' => 'Teacher','value' => 1),
            array('name' => 'Student','value' => 1),
		);
		DB::table('roles')->insert($countries);
	}
}
