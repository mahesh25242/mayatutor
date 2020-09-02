<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/key', function() {
    return \Illuminate\Support\Str::random(32);
});

$router->get('/', function () use ($router) {
    return $router->app->version();
});

//$router->get('/{sitemap}','SiteMapController@index');

$router->group(['prefix' => 'v1'], function () use ($router) {

    $router->get('countries','CountryController@countries');
    $router->get('states','StateController@states');
    $router->get('cities','CityController@cities');

    $router->post('signUp','UsersController@signUp');

    $router->post('sentContact','ContactUsController@sentContact');


    $router->group(['middleware' => 'auth'], function () use ($router) {
        $router->post('updateAvatar','UsersController@updateAvatar');

        $router->get('authUser','UsersController@authUser');
        $router->post('setUserLogin','UsersController@setUserLogin');
        $router->get('signOut','UsersController@signOut');

        $router->group(['prefix' => 'student'], function () use ($router) {
            $router->post('updateProfile','UsersController@updateProfile');
        });

        $router->group(['prefix' => 'education'], function () use ($router) {
            $router->get('getAllEducation','EducationController@getAllEducation');
        });

        $router->group(['prefix' => 'subject'], function () use ($router) {
            $router->get('getAllSubjects','SubjectController@getAllSubjects');
        });


        $router->group(['prefix' => 'messages'], function () use ($router) {
            $router->get('/', 'MessagesController@index');
            $router->get('/unread', 'MessagesController@unread'); // ajax + Pusher
            $router->post('/', 'MessagesController@store');
            $router->get('{id}', 'MessagesController@show');
            $router->post('update', 'MessagesController@update');
            $router->get('{id}/read', 'MessagesController@read'); // ajax + Pusher
            $router->post('removeParticipant', 'MessagesController@removeParticipant'); // ajax + Pusher
            $router->post('sentItem', 'MessagesController@sentItem'); // ajax + Pusher
        });



    });
});



