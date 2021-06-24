<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<style>
	.text-left {
		text-align: left;
	}
	.bg {
		border-bottom:5px solid #0380DB;
		font-family:'Arial'
	}
	.margin-top-30 {
		margin-top:30px;

	}
	.border {
		border: 1px solid #ddd;
	}
	.border td, .border th {
		padding:8px 15px;
		border: 1px solid #ddd;
	}

	.border-2 {
		border: 1px solid #ddd;
	}
	.border-2 td, .border-2 th {
		padding:8px 15px;
		border-left: 1px solid #ddd;
		border-right: 1px solid #ddd;
	}

</style>
<table class="text-left" width="100%" border="0" cellspacing="0" cellpadding="0" >
  <tbody>
<tr>
      <td class="bg">
		<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="padding-bottom: 20px;">

		  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td width="45"><img src="https://mayatutors.com/maya-logo.21a6d58ee3d97e31f84a.svg" width="50px"></td>
      <td><h1 style="font: 'arial'; margin:0; padding: 0; color: dodgerblue;">Maya Tutors &nbsp;&nbsp;</h1>
		<h4 style="margin: 0; padding: 0; color: dodgerblue;">Tutor's Web Portal</h4>
		</td>
    </tr>
  </tbody>
</table>


		  </td>
      <td style="text-align: right; padding-bottom: 20px;">
		  <h2 style="margin: 0; padding: 0;">INVOICE </h2>
		  <span style="color: red; margin-top:5px; display: block;">Invoice Number: <?php  echo ($userPlan->planPurchase) ? $userPlan->planPurchase->id: '';?></span>
		</td>
    </tr>
  </tbody>
</table>


		</td>
    </tr>
<tr>
      <td style="padding-bottom:20px;">

		  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="padding-bottom:10px;">
  <tbody>
    <tr>
		<td>
		<p>Invoice To</p>
		  <p>
<h3><?php echo $userPlan->user->fname." ".$userPlan->user->lname;?></h3>
<?php echo $userPlan->user->email;?><br/>
<?php echo $userPlan->user->phone;?><br/>
<?php echo $userPlan->user->address;?><br/>
<?php echo $userPlan->user->country->name;?>,
<?php echo $userPlan->user->state->name;?>,
<?php echo $userPlan->user->city->name;?>,
<?php echo $userPlan->user->pin;?>
		  </p>
		</td>
		<td style="text-align: right; padding-top: 20px;" valign="top">
      		<span style="">Order Date: <?php echo $userPlan->created_at->format("d M, Y");?></span>
		</td>

    </tr>
  </tbody>
</table>


		  </td>
    </tr>
<tr>
<td style="border-top:1px solid #0380DB; padding-top:5px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0" style="border-bottom-width: 3px;" class="margin-top-30 border-2">
  <tbody>
    <tr>
      <td style="color: #949292;">Plan Details</td>
      <td style="color: #949292;">Validity</td>
      <td style="color: #949292;">Plan Start</td>
      <td style="color: #949292;">Plan Expiry</td>
    </tr>
	  <tr>
      <td><h4 style="margin: 0; padding: 0;"><?php echo $userPlan->plan->name;?></h4></td>
      <td><?php echo $userPlan->plan->days;?> days</td>
      <td><?php echo \Carbon\Carbon::parse($userPlan->start_date)->format('d M, Y');?></td>
      <td><?php echo \Carbon\Carbon::parse($userPlan->end_date)->format('d M, Y');?></td>
    </tr>
  </tbody>
</table>



	</td>
</tr>
<tr>
      <td style="padding-top:20px; padding-bottom:30px;">
		  <h3>Invoive Details:</h3>


		  <table width="100%" border="0" style="border-bottom-width: 3px" class="border" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <th style="text-align: left; background: #000; color: #fff;">Plan Name</th>
      <th style="text-align: right; background: #000;  color: #fff;" width="100">Price</th>
    </tr>
	  <tr>
      <td style="text-align: left"><?php echo $userPlan->plan->name;?></td>
      <td style="text-align: right"><?php echo $userPlan->plan->price;?></td>
    </tr>
    <?php
    if($userPlan->planPurchase){
        $amount = $userPlan->planPurchase->amount - $userPlan->planPurchase->tax;
        $amount = ($amount > 0) ? $amount : 0;
        $percentage = 0;
        if($amount){
            $percentage = ( (double) $userPlan->planPurchase->tax / $amount);
            $percentage = $percentage * 100;
            $percentage = round($percentage, 2);
        }

    ?>
        <tr>
        <td style="text-align: right"><h6 style="margin: 0; padding: 0;">GST/TAX</h6></td>
        <td style="text-align: right"> ( <?php echo $percentage;?>% ) <?php echo  $userPlan->planPurchase->tax;?></td>
        </tr>
    <?php
    }
    ?>
	  <tr>
      <td style="padding-top: 20px; padding-bottom: 20px"><h4 style="margin: 0; padding: 0">USD (For <?php echo $userPlan->plan->billed_text;?>): $<?php echo $userPlan->plan->usd_amount;?>  <span style="float: right;margin: 0; padding: 0">TOTAL AMOUNT <span style="color: dodgerblue;">(INR)</span></span></h4></td>
      <td style="padding-top: 20px; padding-bottom: 20px"><h2 style="margin: 0;  padding: 0; float: right;"><?php echo ( $userPlan->planPurchase && $userPlan->planPurchase->amount) ? $userPlan->planPurchase->amount :  $userPlan->plan->price;?></h2></td>
    </tr>
  </tbody>
</table>


		  </td>
    </tr>
<tr>
	<td>
	<p style="color: #767676; margin-bottom:0px; padding: 0;">
Computer generated invoice Issued by www.mayatutors.com</p>
	</td>
	</tr>
<tr>
<td style="padding-top: 20px;">
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td style="border: 1px solid #ddd; padding: 15px;">
		  <table width="100%" border="0" cellspacing="0" cellpadding="0">
  <tbody>
    <tr>
      <td width="45"><img src="https://mayatutors.com/maya-logo.21a6d58ee3d97e31f84a.svg" width="50px"></td>
      <td><h5 style="margin:0; padding:0; color:#767676;">Head Office:</h5>
	<p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">
<b>MAYA ACCOUNTING ONLINE TRAINING</b><br>
PMC 17/ 418, MAYA TAX ACCOUNTING TRG. CENTER<br>
MATTAMANA BLDG, 2nd FLOOR, OPP. MUNI. OFFICE<br>
PERUMBAVOOR PO, ERNAKULAM, KERALA - 683542<br>
INDIA.</p></td>
    </tr>
  </tbody>
</table>



		</td>
      <td style="text-align: center" align="center">
		  <img src="https://api.mayatutors.com/public/assets/sign.png" width="130px">
		  <h3 style="margin: 0; padding: 0; color: #767676;">Signature</h3>
		</td>
    </tr>
  </tbody>
</table>
	</td>

	<td>


	</td>
</tr>
<tr>
<td style="border-bottom: 1px solid #767676; padding-top: 50px; padding-bottom: 10px">
	<p style="color: #767676; margin-bottom:0px; padding: 0; font-size:12px;">Must read and download terms & condition on <span style="font-weight:bold;">https://mayatutors.com/privacy-policy</span>.</p>
	</td>
</tr>
<tr>
<td style="padding-top:5px;">
	<p style="color: #767676; margin-bottom: 0px; font-size:12px;">
        <?php echo (isset($request) && $request) ? $request->ip().'/'.$request->header('User-Agent') : '';?>
    </p>
	</td>
</tr>

  </tbody>
</table>

