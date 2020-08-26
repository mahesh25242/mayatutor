import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, NegateAuthGuard } from '../../lib/guard';
import { InboxComponent } from './inbox/inbox.component';
import { SentItemComponent } from './sent-item/sent-item.component';
import { ComposeComponent } from './compose/compose.component';
import { ReadMailComponent } from './read-mail/read-mail.component';
import { MailComponent } from './mail/mail.component';


const routes: Routes = [
  {
    path: '',
    component: MailComponent,
    children:[
      {
        path: '',
        component: InboxComponent,
      },
      {
        path: 'sent-item',
        component: SentItemComponent,
      },
      {
        path: 'compose',
        component: ComposeComponent,
      },
      {
        path: 'read/:id',
        component: ReadMailComponent,
        data:{
          type:'inbox'
        }
      },
      {
        path: 'sent-item/read/:id',
        component: ReadMailComponent,
        data:{
          type:'sent'
        }
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailRoutingModule { }
