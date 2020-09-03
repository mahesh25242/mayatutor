<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->default(0);
            $table->string('name')->nullable();
            $table->double('price', 8, 2)->nullable();
            $table->string('demo_video_url')->nullable();
            $table->string('image')->nullable();
            $table->text('description')->nullable();
            $table->boolean('status')->default(0);
            $table->boolean('live_class')->default(1);
            $table->string('live_class_url')->nullable();
            $table->text('news')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
