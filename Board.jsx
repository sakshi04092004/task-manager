import Card from './Card.jsx';  // Added .jsx extension

const Board = () => {
  const cards = [
    { id: 1, title: 'Design UI', description: 'Create mockups in Figma' },
    { id: 2, title: 'Set up backend', description: 'Initialize Firebase' },
    { id: 3, title: 'Build components', description: 'Create Board and Card' }
  ];

  return (
    <div className="board">
      {cards.map((card) => (
        <Card 
          key={card.id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default Board;