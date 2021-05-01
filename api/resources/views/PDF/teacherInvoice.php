<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<?php echo $userPlan->user->fname." ".$userPlan->user->lname;?><br/>
<?php echo $userPlan->user->email;?><br/>
<?php echo $userPlan->user->phone;?><br/>
<?php echo $userPlan->user->address;?><br/>
<?php echo $userPlan->user->country->name;?><br/>
<?php echo $userPlan->user->state->name;?><br/>
<?php echo $userPlan->user->city->name;?><br/>
<?php echo $userPlan->user->pin;?><br/>

Plan Name: <?php echo $userPlan->plan->name;?><br/>
Plan Price: <?php echo $userPlan->plan->price;?><br/>
Plan Validity: <?php echo $userPlan->plan->days;?><br/>

Plan Start: <?php echo $userPlan->start_date;?><br/>
Plan Expiry: <?php echo $userPlan->end_date;?><br/>


