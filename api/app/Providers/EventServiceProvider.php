<?php

namespace App\Providers;

use Laravel\Lumen\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        \App\Events\ExampleEvent::class => [
            \App\Listeners\ExampleListener::class,
        ],
        \App\Events\CourseModuleEvent::class => [
            \App\Listeners\CourseModuleListener::class,
        ],

        \App\Events\PlanPurchaseEvent::class => [
            \App\Listeners\PlanPurchaseListener::class,
        ],
        \App\Events\DeletePlanPurchaseEvent::class => [
            \App\Listeners\DeletePlanPurchaseListener::class,
        ],
    ];
}
