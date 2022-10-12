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
import { ValidateEmailWasUsedMiddleware } from "./middlewares/validateEmailWasUsed";

export default (app: Express) => {
  app.post(
    "/user",
    // new ValidateEmailWasUsedMiddleware().ValidateEmailWasUsed,
    new CreateNewUser().createNewUser
  );
  app.get("/users", new ListUsers().getAll);
  app.put("/user/:userId", new UpdateUser().update);
  app.delete("/user/:userId", new DeleteUser().delete);
  app.get("/user/:userId/notes", new ListNotes().getAll);
  app.get("/user/:userId/note/:noteId", new GetNote().getNote);
  app.post("/user/:userId/notes", new CreateNote().create);
  app.delete("/user/:userId/note/:noteId", new DeleteNote().delete);
  app.put("/user/:userId/note/:noteId", new UpdateNote().update);
};
