import React from "react";
import Form from "../components/Form";
import { Container } from "react-bootstrap";
import { Note, NoteData, Tag } from "../types";
import { useOutletContext } from "react-router-dom";

type Props = {
  handleSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Edit = ({ handleSubmit, createTag, availableTags }: Props) => {
  const note: Note = useOutletContext();
  return (
    <Container className="py-5">
      <h2>Notu Düzenle</h2>
      <Form
        handleSubmit={(data) => handleSubmit(note.id, data)}
        createTag={createTag}
        availableTags={availableTags}
        title={note.title}
        tags={note.tags}
        markdown={note.markdown}
      />
    </Container>
  );
};

export default Edit;
