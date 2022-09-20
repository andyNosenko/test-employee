import {roles} from "./roles";

export const employees = [
    { id: 1, name: 'Andy', company: 'IBM', project: 'Chat Bot', roles: {connect: {id: roles[0].id}}},
    { id: 2, name: 'Priya', company: 'HP', project: 'VR Gaming', roles: {connect: {id: roles[1].id}}},
    { id: 3, name: 'Asha', company: 'Microsoft', project: 'Payroll', roles: {connect: {id: roles[2].id}}},
    { id: 4, name: 'Nandini', company: 'HP', project: 'Payroll', roles: {connect: {id: roles[3].id}}},
    { id: 5, name: 'Piyush', company: 'Microsoft', project: 'Payroll', roles: {connect: {id: roles[4].id}}},
    { id: 6, name: 'Ankur', company: 'HP', project: 'Chat Bot', roles: {connect: {id: roles[0].id}}},
    { id: 7, name: 'Ankur', company: 'HP', project: 'Chat Bot', roles: {connect: {id: roles[1].id}}},
    { id: 8, name: 'Priya', company: 'IBM', project: 'Payroll', roles: {connect: {id: roles[2].id}}},
    { id: 9, name: 'Asha', company: 'HP', project: 'Chat Bot', roles: {connect: {id: roles[3].id}}},
    { id: 10, name: 'Nandini', company: 'IBM', project: 'VR Gaming', roles: {connect: {id: roles[4].id}}},
    { id: 11, name: 'Piyush', company: 'Microsoft', project: 'Chat Bot', roles: {connect: {id: roles[0].id}}},
];
