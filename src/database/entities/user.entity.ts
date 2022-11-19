import {
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { NoteEntity } from "./note.entity";

@Entity({ name: "users" })
// export class GrowdeverEntity extends BaseEntity { // active record
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @Column({ name: "updated_at" })
  updatedAt!: Date;

  @BeforeUpdate()
  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
  @OneToMany(() => NoteEntity, (entity) => entity.userEntity)
  notesEntities?: NoteEntity[];
}
