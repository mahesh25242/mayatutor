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

$router->get('test','UsersController@test');

$router->group(['prefix' => 'v1'], function () use ($router) {

    $router->post('login','UsersController@login');
    $router->post('reterievePassword','UsersController@reterievePassword');
    $router->post('setNewPassword','UsersController@setNewPassword');
    $router->post('activateUser','UsersController@activateUser');
    $router->get('countries','CountryController@countries');
    $router->get('states','StateController@states');
    $router->get('cities','CityController@cities');
    $router->post('signUp','UsersController@signUp');
    $router->post('sentContact','ContactUsController@sentContact');

    $router->get('banners','BannerController@banners');
    $router->get('videos','HomeVideoController@videos');

    $router->post('paymentSuccess[/{notification}]','PlanController@paymentSuccess');

    $router->group(['prefix' => 'teacher'], function () use ($router) {
        $router->get('getaTeacher/{url}','TeacherController@teacher');
        $router->get('topRatedTeacher','TeacherController@topRatedTeacher');
        $router->get('plans','PlanController@plans');
        $router->get('plan/{id}','PlanController@plan');
        $router->get('search[/{q}]','TeacherController@search');
        $router->group(['prefix' => 'teacherCourses'], function () use ($router) {
            $router->post('/','CourseController@listTeacherCourses');
        });

        $router->get('course/{courseId}','CourseController@course');
        $router->post('reportAbuse','TeacherController@reportAbuse');
    });


    $router->group(['prefix' => 'coupons'], function () use ($router) {
        $router->post('/validateCoupon', 'CouponsController@validateCoupon');

    });


    $router->group(['middleware' => 'auth'], function () use ($router) {

        $router->group(['prefix' => 'admin', 'middleware' =>  'admin'], function () use ($router) {
            $router->get('/stats','AdminController@index');
            $router->group(['prefix' => 'course'], function () use ($router) {
                $router->post('/','CourseController@listAllCourses');
                $router->post('approveCourse','CourseController@approveCourse');
            });

            $router->group(['prefix' => 'teacher'], function () use ($router) {
                $router->get('fetchAll','UsersController@fetchAllTeacher');
                $router->get('fetch/{id}','UsersController@fetchTeacher');
                $router->post('toggleStatus','UsersController@toggleStatus');
                $router->post('delete','UsersController@delete');
                $router->post('toggleAutoApproval','TeacherController@toggleAutoApproval');
                $router->get('purchases','PlanController@purchases');
            });

            $router->group(['prefix' => 'student'], function () use ($router) {
                $router->get('fetchAll','UsersController@fetchAllStudent');
                $router->get('fetch/{id}','UsersController@fetchStudent');
                $router->post('toggleStatus','UsersController@toggleStatus');
                $router->post('delete','UsersController@delete');

            });

            $router->group(['prefix' => 'settings'], function () use ($router) {
                $router->get('/','SettingsController@settings');
                $router->post('saveSetting','SettingsController@saveSetting');
            });

            $router->group(['prefix' => 'banners'], function () use ($router) {
                $router->post('save','BannerController@save');
                $router->post('delete','BannerController@delete');
            });

            $router->group(['prefix' => 'videos'], function () use ($router) {
                $router->post('save','HomeVideoController@save');
                $router->post('delete','HomeVideoController@delete');
            });


        });


        $router->group(['middleware' =>  'teacherOrAdmin'], function () use ($router) {
            $router->get('getLoginLogs/{userId}','UsersController@getLoginLogs');

            $router->group(['prefix' => 'student'], function () use ($router) {
                $router->get('fetchAll','StudentController@myStudents');
                $router->get('fetchAllStudent','UsersController@fetchAllStudent');
                $router->get('fetch/{id}','UsersController@fetchStudent');
                $router->post('toggleStatus','StudentController@studenttoggleStatus');
                $router->post('delete','UsersController@delete');

                $router->post('addStudent','TeacherController@addStudent');
                $router->post('deleteStudent','StudentController@deleteStudent');

                $router->group(['prefix' => 'course'], function () use ($router) {
                    $router->post('/','StudentCourseController@studentTeacherCourse');


                    $router->post('toggleStatus','StudentCourseController@toggleCourse');
                    $router->post('deleteCourse','StudentCourseController@deleteCourse');

                    $router->group(['prefix' => 'payment'], function () use ($router) {
                        $router->post('/','UserPaymentController@studentPaymentByCourse');
                        $router->post('create','UserPaymentController@createStudentPaymentByCourse');
                    });

                });
            });

            $router->group(['prefix' => 'admin'], function () use ($router) {
                $router->group(['prefix' => 'teacher'], function () use ($router) {
                    $router->get('downloadInvoice/{invId}','TeacherController@downloadInvoice');
                    $router->post('deletePurchase/{invId}','TeacherController@deletePurchase');
                });
            });

            $router->group(['prefix' => 'teacher'], function () use ($router) {
                $router->post('changeBanner','TeacherController@changeBanner');
                $router->post('updatePaymentQRCode','TeacherController@updatePaymentQRCode');
                $router->get('invoices/{userId}','TeacherController@invoices');
                $router->get('payment/{id}','PlanController@payment');
                $router->post('plan/{id}/purchase','PlanController@planPurchase');
                $router->group(['prefix' => 'course'], function () use ($router) {

                    $router->post('createCourse','CourseController@createCourse');
                    $router->post('deleteCourse','CourseController@deleteCourse');



                    $router->group(['prefix' => '{courseId}/module'], function () use ($router) {
                        $router->post('modules','CourseModuleController@listModules');
                        $router->post('createModule','CourseModuleController@createCourseModule');
                        $router->post('deleteModule','CourseModuleController@deleteCourseModule');
                        $router->post('orderCourseModule','CourseModuleController@orderCourseModule');

                    });

                    $router->post('/','CourseController@listTeacherCourses');
                });
            });

            $router->post('resentActivationMail','UsersController@resentActivationMail');




        });


        $router->post('updateAvatar','UsersController@updateAvatar');
        $router->get('authUser','UsersController@authUser');
        $router->post('setUserLogin','UsersController@setUserLogin');
        $router->get('signOut','UsersController@signOut');
        $router->post('updateProfile','UsersController@updateProfile');




        $router->group(['prefix' => 'student'], function () use ($router) {
            $router->group(['prefix' => 'course'], function () use ($router) {
                $router->post('myCourseStatistics','StudentCourseController@myCourseStatistics');
                $router->post('launchModule','StudentCourseTrackController@launchModule');
                $router->post('markAsFinished','StudentCourseTrackController@markAsFinished');
                $router->post('fetchNextModule','StudentCourseTrackController@fetchNextModule');
                $router->post('allMyCourses','StudentCourseController@allMyCourses');
                $router->get('{id}/module/{moduleId}/isLaunchable','CourseModuleController@isLaunchable');
            });
            $router->post('setRating','UsersController@setRating');
        });

        $router->group(['prefix' => 'teacher'], function () use ($router) {
            $router->group(['prefix' => 'course'], function () use ($router) {
                $router->group(['prefix' => '{courseId}/module'], function () use ($router) {
                    $router->get('aModule/{id}','CourseModuleController@getAModule');




                });


            });
        });


        $router->group(['prefix' => 'education'], function () use ($router) {
            $router->get('getAllEducation','EducationController@getAllEducation');
        });

        $router->group(['prefix' => 'subject'], function () use ($router) {
            $router->get('getAllSubjects','SubjectController@getAllSubjects');
        });


        $router->group(['prefix' => 'messages'], function () use ($router) {
            $router->get('/toUser', 'UsersController@toUser');
            $router->get('/', 'MessagesController@index');
            $router->get('/unread', 'MessagesController@unread'); // ajax + Pusher
            $router->post('/', 'MessagesController@store');
            $router->get('{id}', 'MessagesController@show');
            $router->post('update', 'MessagesController@update');
            $router->get('{id}/read', 'MessagesController@read'); // ajax + Pusher
            $router->post('removeParticipant', 'MessagesController@removeParticipant'); // ajax + Pusher
            $router->post('sentItem', 'MessagesController@sentItem'); // ajax + Pusher
        });


        $router->group(['prefix' => 'coupons'], function () use ($router) {

            $router->post('/', 'CouponsController@index');
            $router->post('/store', 'CouponsController@store');
            $router->get('/coupon/{id}', 'CouponsController@getCoupon');

        });



    });
});



