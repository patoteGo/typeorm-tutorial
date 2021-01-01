import {Entity, Column} from "typeorm";
import Model from "./Model";

@Entity('posts')
export class User extends Model {

    @Column()
    title: string;

    @Column()
    body: string;

    @Column({ type: 'uuid' })
    uuid: string

}
