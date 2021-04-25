<p>Hello  <?php echo $user->fname;?>,</p>
<p>Success fully purchased the plan <?php echo $user->email ;?></p>
<a href="<?php echo rtrim($siteAddress, '/');?>/user-activation/<?php echo $user->userActivationKey->first()->key;?>">Click Here to Activate your account</a>
Please find attachent
