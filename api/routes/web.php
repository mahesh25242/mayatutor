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


    $router->group(['prefix' => 'teacher'], function () use ($router) {
        $router->get('getaTeacher/{url}','TeacherController@teacher');
        $router->get('topRatedTeacher','TeacherController@topRatedTeacher');
        $router->get('plans','PlanController@plans');
        $router->get('search[/{q}]','TeacherController@search');
        $router->group(['prefix' => 'teacherCourses'], function () use ($router) {
            $router->post('/','CourseController@listTeacherCourses');
        });
    });

    $router->group(['middleware' => 'auth'], function () use ($router) {


        $router->group(['prefix' => 'admin', 'middleware' =>  'admin'], function () use ($router) {
            $router->group(['prefix' => 'courses'], function () use ($router) {
                $router->post('/','CourseController@listAllCourses');
            });

            $router->group(['prefix' => 'teacher'], function () use ($router) {
                $router->get('fetchAll','UsersController@fetchAllTeacher');
                $router->get('fetch/{id}','UsersController@fetchTeacher');
                $router->post('toggleStatus','UsersController@toggleStatus');
                $router->post('delete','UsersController@delete');
                $router->post('toggleAutoApproval','TeacherController@toggleAutoApproval');
            });

            $router->group(['prefix' => 'student'], function () use ($router) {
                $router->get('fetchAll','UsersController@fetchAllStudent');
                $router->get('fetch/{id}','UsersController@fetchStudent');
                $router->post('toggleStatus','UsersController@toggleStatus');
                $router->post('delete','UsersController@delete');
            });

        });


        $router->group(['prefix' => 'student', 'middleware' =>  'teacher'], function () use ($router) {
            $router->get('fetchAll','StudentController@myStudents');
            $router->get('fetchAllStudent','UsersController@fetchAllStudent');
            $router->get('fetch/{id}','UsersController@fetchStudent');
            $router->post('toggleStatus','StudentController@studenttoggleStatus');
            $router->post('delete','UsersController@delete');

            $router->post('addStudent','TeacherController@addStudent');
            $router->post('deleteStudent','StudentController@deleteStudent');

            $router->group(['prefix' => 'course'], function () use ($router) {
                $router->post('/','StudentCourseController@studentCourse');
                $router->post('toggleStatus','StudentCourseController@toggleCourse');
            });
        });

        $router->post('updateAvatar','UsersController@updateAvatar');

        $router->get('authUser','UsersController@authUser');
        $router->post('setUserLogin','UsersController@setUserLogin');
        $router->get('signOut','UsersController@signOut');

        $router->group(['prefix' => 'student'], function () use ($router) {
            $router->post('updateProfile','UsersController@updateProfile');
        });

        $router->group(['prefix' => 'teacher',  'middleware' =>  'teacher'], function () use ($router) {


            $router->post('changeBanner','TeacherController@changeBanner');
            $router->post('updatePaymentQRCode','TeacherController@updatePaymentQRCode');
            $router->group(['prefix' => 'courses'], function () use ($router) {
                $router->post('/','CourseController@listTeacherCourses');
            });
        });



        $router->group(['prefix' => 'course'], function () use ($router) {

            $router->post('createCourse','CourseController@createCourse');
            $router->post('deleteCourse','CourseController@deleteCourse');
            $router->get('{courseId}','CourseController@course');

            $router->group(['prefix' => '{courseId}/module'], function () use ($router) {
                $router->post('modules','CourseModuleController@listModules');
                $router->post('createModule','CourseModuleController@createCourseModule');
                $router->post('deleteModule','CourseModuleController@deleteCourseModule');
                $router->post('orderCourseModule','CourseModuleController@orderCourseModule');
            });
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



