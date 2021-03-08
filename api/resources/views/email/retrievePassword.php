<p>Hello  <?php echo $user->fname ;?>,</p>
<p>Your Email / Mobile: <?php echo $user->email.' / '.$user->phone ;?></p>
<a href="<?php echo rtrim($siteAddress, '/');?>/set-new-password/<?php echo $user->userActivationKey->first()->key;?>">Click Here to Change password</a>
