/* eslint-disable prettier/prettier */

import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column({ select: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    emailAndUserNameToLowerCase() {
        this.email = this.email.toLocaleLowerCase()
        this.username = this.username.toLocaleLowerCase()
    }

}
