import React, { useState } from "react";
import { Note } from "../types";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, Stack } from "react-bootstrap";
import { motion } from "framer-motion";

type Props = {
  note: Note;
};

interface RotateState {
  x: number;
  y: number;
}

const CustomCard = ({ note }: Props) => {
  const [rotate, setRotate] = useState<RotateState>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width; // 0 ile 1 arasında normalize
    const y = (e.clientY - card.top) / card.height; // 0 ile 1 arasında normalize

    // Fare hangi köşeye yakınsa o köşeye doğru yaslanacak
    const rotateX = (y - 0.5) * 30; // Orta noktadan uzaklığa göre döndürme
    const rotateY = (0.5 - x) * 30;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 }); // Reset rotation when mouse leaves
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "linear-gradient(135deg, #6b73ff, #000dff)",
        borderRadius: "10px",
        padding: "5px",
        boxShadow: "0 10px 30px rgba(255,255,255, 0.5)",
        perspective: 1000, // Perspective for 3D effect
      }}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 10,
      }}
    >
      <Link to={`/note/${note.id}`}>
        <Card className="h-100 w-100">
          <CardBody>
            <Stack className="align-items-center h-100 justify-content-between">
              <span className="fw-bold text-nowrap mb-3">{note.title}</span>
              <Stack
                direction="horizontal"
                className="justify-content-center gap-2"
              >
                {note.tags.map((tag) => (
                  <Badge key={tag.value}>{tag.label}</Badge>
                ))}
              </Stack>
            </Stack>
          </CardBody>
        </Card>
      </Link>
    </motion.div>
  );
};

export default CustomCard;
