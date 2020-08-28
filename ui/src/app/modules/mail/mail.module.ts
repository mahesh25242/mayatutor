import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from '../../shared-module/shared-module.module';
import { MailRoutingModule }  from './mail-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { InboxResolver } from './inbox/inbox-resolver';
import { SentItemComponent } from './sent-item/sent-item.component';
import { ComposeComponent } from './compose/compose.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { ReadMailResolver } from './read-mail/read-mail-resolver';
import { MailComponent } from './mail/mail.component';
import { ReplyMailComponent } from './reply-mail/reply-mail.component';

@NgModule({
  declarations: [InboxComponent, SentItemComponent, ComposeComponent, ReadMailComponent, MailComponent, ReplyMailComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    MailRoutingModule
  ],
  providers:[
    InboxResolver,
    ReadMailResolver
  ]
})
export class MailModule { }
