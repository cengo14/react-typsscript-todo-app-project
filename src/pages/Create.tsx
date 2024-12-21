import React from "react";
import Form from "../components/Form";
import { Container } from "react-bootstrap";
import { NoteData, Tag } from "../types";

export type CreateProps = {
  handleSubmit: (data: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const Create = ({ createTag, handleSubmit, availableTags }: CreateProps) => {
  return (
    <Container className="py-5">
      <h2>Yeni not oluştur</h2>
      <Form
        createTag={createTag}
        handleSubmit={handleSubmit}
        availableTags={availableTags}
      />
    </Container>
  );
};

export default Create;
