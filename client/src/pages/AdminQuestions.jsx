import React, { useState, useEffect } from "react";
import "../css/AdminQuestions.css"; // Imported CSS file

const AdminQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");

  // Fetch questions from the backend
  const fetchQuestions = async () => {
    try {
      const response = await fetch("/api/questions");
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Add a new question
  const addQuestion = async () => {
    if (!newQuestion || !newAnswer) {
      alert("Both question and answer are required!");
      return;
    }
    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: newQuestion,
          options: ["Answer"],
          correctAnswer: newAnswer,
        }),
      });
      const addedQuestion = await response.json();
      setQuestions([...questions, addedQuestion]);
      setNewQuestion("");
      setNewAnswer("");
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Delete a question
  const deleteQuestion = async (id) => {
    try {
      await fetch(`/api/questions/${id}`, { method: "DELETE" });
      setQuestions(questions.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  // Enter edit mode for a specific question
  const startEditing = (question) => {
    setEditMode(question._id);
    setEditQuestion(question.question);
    setEditAnswer(question.correctAnswer);
  };

  // Save the edited question
  const saveEdit = async (id) => {
    if (!editQuestion || !editAnswer) {
      alert("Both question and answer are required!");
      return;
    }
    try {
      const response = await fetch(`/api/questions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: editQuestion,
          correctAnswer: editAnswer,
        }),
      });
      const updatedQuestion = await response.json();
      setQuestions(
        questions.map((q) => (q._id === id ? { ...q, ...updatedQuestion } : q))
      );
      setEditMode(null);
      setEditQuestion("");
      setEditAnswer("");
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditMode(null);
    setEditQuestion("");
    setEditAnswer("");
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="container">
      <h2 className="header">Admin - Manage Trivia Questions</h2>
      <div className="input-group">
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Enter new question"
        />
        <input
          type="text"
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          placeholder="Enter correct answer"
        />
        <button className="button" onClick={addQuestion}>
          Add Question
        </button>
        <button className="button" onClick={fetchQuestions}>
          View All Questions
        </button>
      </div>
      <ul className="question-list">
        {questions.map((q) => (
          <li key={q._id} className="question-item">
            {editMode === q._id ? (
              <div className="edit-group">
                <input
                  type="text"
                  value={editQuestion}
                  onChange={(e) => setEditQuestion(e.target.value)}
                  placeholder="Edit question"
                />
                <input
                  type="text"
                  value={editAnswer}
                  onChange={(e) => setEditAnswer(e.target.value)}
                  placeholder="Edit answer"
                />
                <button className="button" onClick={() => saveEdit(q._id)}>
                  Save
                </button>
                <button className="button" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <strong>{q.question}</strong> - {q.correctAnswer}
                </div>
                <div className ="edit-delete-buttons">
                  <button className="button" onClick={() => startEditing(q)}>
                    Edit
                  </button>
                  <button
                    className="button"
                    onClick={() => deleteQuestion(q._id)}
                  >
                    Delete
                  </button>
              </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminQuestions;
