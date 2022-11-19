import { Express } from "express";
import { NoteController } from "./controllers/note.controller";
import { UserController } from "./controllers/user.controller";
import { ValidateDataNoteMiddleware } from "./middlewares/note/validateDataNote";
import { ValidateDataToCreateUserMiddleware } from "./middlewares/user/validateDataToCreateUser";
import { ValidateEmailWasUsedMiddleware } from "./middlewares/user/validateEmailWasUsed";

export default (app: Express) => {
  const userController = new UserController();
  const noteController = new NoteController();

  app.post(
    "/user",
    new ValidateDataToCreateUserMiddleware().validateData,
    new ValidateEmailWasUsedMiddleware().validateEmailWasUsed,
    userController.create
  );
  app.post("/users/login", userController.findUserByEmailAndPassword);
  app.get("/users", userController.getAll);
  app.get("/user/:userId/notes", noteController.findAllNotesByUser);
  app.post(
    "/user/:userId/notes",
    new ValidateDataNoteMiddleware().validateData,
    noteController.saveNote
  );

  app.delete("/note/:noteId", noteController.deleteNote);
  app.put("/note/:noteId", noteController.updateNote);
};
