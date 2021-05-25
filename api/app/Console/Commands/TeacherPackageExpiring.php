<?php

namespace App\Console\Commands;

use Helpers;
use Illuminate\Console\Command;
use App\Mail\PackageExpiringNotification;

class TeacherPackageExpiring extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'TeacherPackageExpiring:expiring-package';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cron for expiring teacher package';

    public static $process_busy = false;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle(){
        if (self::$process_busy == false) {
            self::$process_busy = true;
            try{
                Mail::to($toEMail)->send(new PackageExpiringNotification($user));
                self::$process_busy = false;
            }catch (\Swift_TransportException $e) {
                self::$process_busy = false;
              //  echo 'Caught exception: ',  $e->getMessage(), "\n";
            }


            return true;
        } else {
            // if ($debug_mode) {
            //     error_log("Process busy!", 0);
            // }
            return false;
        }


    }
}
