<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
    if(DB::table('user_roles')->where('role_id', '1')->doesntExist()){

        $input = [
            'fname' => 'Admin',
            'lname' => 'User',
            'status' => 1,
            'email' => 'admin@mayatutor.com',
            'password' => '$2y$10$5f3dYiEC.hnKaFXeXuNrLeU5kQVrTMuqPwEqIgOfGrV5kM9NX9eNK',
            'phone' => '123456',
            "address" => 'India',
            "country_id" => 101,
            "state_id" => 19,
            "city_id" => 1996,
            "pin" => 656565
        ];
        $user = \App\User::create($input);

        $user->createToken('MayaTutorial')->accessToken;
        \App\UserRole::updateOrCreate(
            [
                "role_id" => 1,
                "user_id" => $user->id
            ],
            [
                "role_id" => 1,
                "user_id" => $user->id
            ]
        );

    }

	}
}
