<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMsgThreadMessageParticipantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('msg_thread_message_participants', function (Blueprint $table) {
            $table->id();
            $table->integer('msg_thread_id')->unsigned();
            $table->integer('user_id')->unsigned();
            $table->timestamp('last_read')->nullable();
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
        Schema::dropIfExists('msg_thread_message_participants');
    }
}
