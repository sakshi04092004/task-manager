import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch
} from "firebase/firestore";
import { db } from "../backend/firebase.js";
import Card from "../src/Card.jsx";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";


const Board = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // 🔹 Real-time listener, ordered by `order`
    const unsubscribe = onSnapshot(collection(db, "cards"), (snapshot) => {
      const fetchedCards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCards(fetchedCards.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
    });

    return () => unsubscribe();
  }, []);

  // 🔹 CRUD functions
  const addCard = async () => {
    await addDoc(collection(db, "cards"), {
      title: "New Task",
      description: "Task description",
      order: cards.length // place at the end
    });
  };

  const updateCard = async (id, updatedData) => {
    await updateDoc(doc(db, "cards", id), updatedData);
  };

  const deleteCard = async (id) => {
    await deleteDoc(doc(db, "cards", id));
  };

  // 🔹 Handle drag & drop reordering
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const reordered = Array.from(cards);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);

    // Update local state immediately
    setCards(reordered);

    // Batch update Firestore with new order
    const batch = writeBatch(db);
    reordered.forEach((card, index) => {
      const ref = doc(db, "cards", card.id);
      batch.update(ref, { order: index });
    });
    await batch.commit();
  };

  return (
    <div className="board">
      <button onClick={addCard}>➕ Add Card</button>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="cards" direction="vertical">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={card.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        title={card.title}
                        description={card.description}
                        onUpdate={(data) => updateCard(card.id, data)}
                        onDelete={() => deleteCard(card.id)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
