import { User } from "src/user/model/user.entity";
import { Entity, Column, ObjectId, ObjectIdColumn, JoinColumn, ManyToOne } from "typeorm";

@Entity()
export class Event {
    @ObjectIdColumn()
    idEvent: ObjectId;

    @Column()
    description: string;

    @Column()
    dayOfWeek: string;

    // @ManyToOne(() => User) // Define o relacionamento
    // @JoinColumn({ name: 'idUSer' }) // Nome da coluna referente ao ID do usuário na tabela de Eventos
    // user: User; // Propriedade que vai armazenar o usuário associado ao evento

};
