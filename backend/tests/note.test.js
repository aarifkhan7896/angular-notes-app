const mongoose = require("mongoose");
const request = require("supertest");
const Note = require("../model/user-notes");
const app = require("../index");

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect("mongodb://localhost:27017/userNotes");
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("NoteTests", () => {
  describe("GET /api/notes", () => {
    it("should return all notes", async () => {
      const notes = [{ title: "title 1", description: "description 1" }];

      // Mock the Note.find() method to resolve with the 'notes' array
      jest.spyOn(Note, "find").mockResolvedValue(notes);

      const res = await request(app).get("/api/notes");

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: "Notes fetched Successfully",
        notes: notes,
      });
    });

    it("should return error message", async () => {
      const errorMessage = "Error fetching notes";

      jest.spyOn(Note, "find").mockRejectedValue(new Error(errorMessage));
      const res = await request(app).get("/api/notes");

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        message: errorMessage,
        error: expect.any(Object),
      });
    });
  });

  describe("POST /api/notes", () => {
    it("should add new note", async () => {
      const note = {
        title: "title 1",
        description: "description 1",
      };
      const res = await request(app).post("/api/notes").send(note);

      // Mock the Note.save() method to resolve with the new note
      jest.spyOn(Note.prototype, "save").mockResolvedValue(note);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: "Note Added Successfully!",
        notes: expect.objectContaining(note),
      });
    });

    it("should return error message", async () => {
      const errorMessage = "Error adding note";

      // Mock the Note.save() method to reject with an error
      jest
        .spyOn(Note.prototype, "save")
        .mockRejectedValue(new Error(errorMessage));

      const res = await request(app).post("/api/notes").send({
        title: "Invalid Title",
        description: "Invalid Description",
      });

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        message: errorMessage,
        error: expect.any(Object), // Check if 'error' is present, regardless of its value
      });
    });
  });

  describe("DELETE /api/notes/:id", () => {
    it("should delete a note successfully", async () => {
      const id = "65abc3b43d76db72c45e0307";
      jest.spyOn(Note, "deleteOne").mockResolvedValue({ deleteCount: 1 });
      const res = await request(app).delete(`/api/notes/${id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: "Note Deleted Successfully",
        notes: { deleteCount: 1 },
      });
    });

    it("should return error message", async () => {
      const errorMessage = "Error deleting note";
      const id = "65abc3b43d76db72c45e0307";
      jest.spyOn(Note, "deleteOne").mockRejectedValue(new Error(errorMessage));
      const res = await request(app).delete(`/api/notes/${id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        message: errorMessage,
        error: expect.any(Object),
      });
    });
  });

  describe("UPDATE /api/notes/:id", () => {
    it("should update a note successfully", async () => {
      const id = "65abc3b43d76db72c45e0307";
      jest.spyOn(Note, "updateOne").mockResolvedValue({ nModified: 1 });
      const res = await request(app).patch(`/api/notes/${id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual({
        message: "Note Updated Successfully",
        notes: { nModified: 1 },
      });
    });

    it("should return error message", async () => {
      const errorMessage = "Error updating note";
      const id = "65abc3b43d76db72c45e0307";
      jest.spyOn(Note, "updateOne").mockRejectedValue(new Error(errorMessage));
      const res = await request(app).patch(`/api/notes/${id}`);

      expect(res.statusCode).toBe(500);
      expect(res.body).toEqual({
        message: errorMessage,
        error: expect.any(Object),
      });
    });
  });
});
