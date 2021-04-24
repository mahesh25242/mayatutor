<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<?php echo $user->fname." ".$user->lname;?><br/>
<?php echo $user->email;?><br/>
<?php echo $user->phone;?><br/>
<?php echo $user->address;?><br/>
<?php echo $user->country->name;?><br/>
<?php echo $user->state->name;?><br/>
<?php echo $user->city->name;?><br/>
<?php echo $user->pin;?><br/>

Plan Name: <?php echo $plan->name;?><br/>
Plan Price: <?php echo $plan->price;?><br/>
Plan Validity: <?php echo $plan->days;?><br/>

Plan Start: <?php echo $userPlan->start_date;?><br/>
Plan Expiry: <?php echo $userPlan->end_date;?><br/>


