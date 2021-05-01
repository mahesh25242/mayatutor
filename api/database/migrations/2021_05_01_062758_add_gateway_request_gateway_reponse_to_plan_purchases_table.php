<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddGatewayRequestGatewayReponseToPlanPurchasesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('plan_purchases', function (Blueprint $table) {
            $table->json('gateway_request')->nullable();;
            $table->json('gateway_response')->nullable();;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('plan_purchases', function (Blueprint $table) {
            $table->dropColumn('gateway_request');
            $table->dropColumn('gateway_response');
        });
    }
}
