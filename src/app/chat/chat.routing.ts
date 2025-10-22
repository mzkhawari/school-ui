import { Route } from '@angular/router';
import { ChatChatResolver, ChatChatsResolver, ChatContactsResolver, ChatProfileResolver } from 'app/chat/chat.resolvers';
import { ChatComponent } from 'app/chat/chat.component';
import { ChatsComponent } from 'app/chat/chats/chats.component';
import { ConversationComponent } from 'app/chat/conversation/conversation.component';

export const chatRoutes: Route[] = [
    {
        path     : '',
        component: ChatComponent,
        resolve  : {
            chats   : ChatChatsResolver,
            contacts: ChatContactsResolver,
            profile : ChatProfileResolver
        },
        children : [
            {
                path     : '',
                component: ChatsComponent,
                children : [
                    {
                        path     : '',
                        component: ConversationComponent,
                        children : [
                            {
                                path   : ':id',
                                resolve: {
                                    conversation: ChatChatResolver
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
