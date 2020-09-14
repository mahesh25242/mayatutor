<?php

use Illuminate\Database\Seeder;

class PlansTableSeeder extends Seeder
{
/**
* Run the database seeds.
*
* @return void
*/
public function run()
{
	DB::table('plans')->truncate();
	$plans = array(
            array(
                'name' => 'FREE',
                'description' => 'Free Plan',
                'features' => json_encode(array(
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    "Donec sed felis volutpat dolor suscipit congue a nec ex."  ,
                    "Nunc at nulla in diam mollis volutpat.",
                    "Donec ut velit sit amet mauris fermentum venenatis.",
                    "Integer suscipit velit a felis congue, eu viverra ligula rutrum"
                )),
                "price" => 0,
                "sortorder" => 1,
                "basic" => 1,
                "days" => 30
            ),
            array(
                'name' => 'PRO',
                'description' => 'PRO Plan',
                'features' => json_encode(array(
                    "Donec at ex efficitur, efficitur leo eget, varius est.",
                    "Ut volutpat lacus ac nibh cursus condimentum."  ,
                    "Quisque euismod lectus et orci elementum, eget scelerisque ligula rutrum.",
                    "Nullam et nibh quis nibh facilisis ornare ac quis ligula.",
                    "Vivamus pellentesque nisl quis nisl varius, dictum facilisis dolor bibendum",
                    "Pellentesque malesuada lacus ac lectus laoreet, sed imperdiet nulla blandit.",
                    "Aliquam maximus magna eget lorem rhoncus, sit amet pulvinar orci mattis.",
                    "Aliquam hendrerit mauris vestibulum leo pharetra pellentesque."
                )),
                "price" => 900,
                "sortorder" => 2,
                "basic" => 0,
                "days" => 365
            ),
		);
		DB::table('plans')->insert($plans);
	}
}
