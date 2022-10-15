import { Express } from "express";
import { CreateNote } from "./controllers/note/createNote";
import { DeleteNote } from "./controllers/note/deleteNote";
import { GetNote } from "./controllers/note/getNote";
import { ListNotes } from "./controllers/note/listNotes";
import { UpdateNote } from "./controllers/note/updateNote";
import { CreateNewUser } from "./controllers/user/createUser";
import { DeleteUser } from "./controllers/user/deleteUser";
import { ListUsers } from "./controllers/user/listUsers";
import { UpdateUser } from "./controllers/user/updateUser";
import { ValidateDataNoteMiddleware } from "./middlewares/note/validateDataNote";
import { ValidateDataToCreateUserMiddleware } from "./middlewares/user/validateDataToCreateUser";
import { ValidateEmailWasUsedMiddleware } from "./middlewares/user/validateEmailWasUsed";

export default (app: Express) => {
  app.post(
    "/user",
    new ValidateDataToCreateUserMiddleware().ValidateData,
    new ValidateEmailWasUsedMiddleware().ValidateEmailWasUsed,
    new CreateNewUser().createNewUser
  );
  app.get("/users", new ListUsers().getAll);
  app.get("/user/:userId/notes", new ListNotes().getAll);
  app.get("/user/:userId/note/:noteId", new GetNote().getNote);
  app.post(
    "/user/:userId/notes",
    new ValidateDataNoteMiddleware().ValidateData,
    new CreateNote().create
  );
  app.delete("/user/:userId/note/:noteId", new DeleteNote().delete);
  app.put(
    "/user/:userId/note/:noteId",
    new ValidateDataNoteMiddleware().ValidateData,
    new UpdateNote().update
  );
};
