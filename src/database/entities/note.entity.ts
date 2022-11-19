import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: "notes" })
export class NoteEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  content!: string;

  @Column()
  status!: boolean;

  @Column({ name: "id_user" })
  userId?: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: "id_user", referencedColumnName: "id" })
  userEntity?: UserEntity;
}
