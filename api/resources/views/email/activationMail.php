<p>Hello  <?php echo $user->fname;?>,</p>
<p>Your Username: <?php echo $user->email ;?></p>
<p>Activation Key: <?php echo $user->userActivationKey->first()->key;?></p>
