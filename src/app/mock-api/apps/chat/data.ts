/* eslint-disable */
import * as moment from 'moment';

/**
 * Attachments are common and will be filled from here
 * to keep the demo data maintainable.
 */
const _attachments = {
    media: [
        'assets/images/cards/01-320x200.jpg',
        'assets/images/cards/02-320x200.jpg',
        'assets/images/cards/03-320x200.jpg',
        'assets/images/cards/04-320x200.jpg',
        'assets/images/cards/05-320x200.jpg',
        'assets/images/cards/06-320x200.jpg',
        'assets/images/cards/07-320x200.jpg',
        'assets/images/cards/08-320x200.jpg'
    ],
    docs : [],
    links: []
};

/**
 *  If a message belongs to our user, it's marked by setting it as
 *  'me'. If it belongs to the user we are chatting with, then it
 *  left empty. We will be using this same conversation for each chat
 *  to keep things more maintainable for the demo.
 */
export const messages = [
   
];
export const chats = [
   
];
export const contacts = [
    {
        id         : '012b8219-74bf-447c-af2c-66904d90a956',
        avatar     : 'assets/images/avatars/female-02.jpg',
        name       : 'Tracy Delacruz',
        about      : 'Hi there! I\'m using FuseChat.',
        details    : {
            emails      : [
                {
                    email: 'tracydelacruz@mail.name',
                    label: 'Personal'
                },
                {
                    email: 'delacruz.tracy@shepard.me',
                    label: 'Work'
                }
            ],
            phoneNumbers: [
                {
                    country    : 'co',
                    phoneNumber: '974 428 2886',
                    label      : 'Mobile'
                }
            ],
            title       : 'Bindery Machine Operator',
            company     : 'Shepard',
            birthday    : '1963-08-10T12:00:00.000Z',
            address     : '604 Merit Court, Wyano, New Hampshire, PO1641'
        },
        attachments: _attachments
    }
];
export const profile: any = {
    id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
    name  : 'هادی رحمانی',
    email : 'h.rahmani@eba.ac',
    avatar: 'assets/images/avatars/brian-hughes.jpg',
    about : 'Hi there! I\'m using FuseChat.'
};
