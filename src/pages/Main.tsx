import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Note, Tag } from "../types";
import ReactSelect from "react-select";
import Card from "../components/Card";

type Props = {
  availableTags: Tag[];
  notes: Note[];
};

const Main = ({ availableTags, notes }: Props) => {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const navigate = useNavigate();
  //
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(query.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((n_tag) => n_tag.value === s_tag.value)
      )
  );

  return (
    <Container className="mx-auto py-5">
      <Stack direction="horizontal" className="justify-content-between mb-4">
        <div className="d-flex gap-3 align-items-center">
          <img width={80} src="/note-logo.png" alt="" />
          <h1>Notlar</h1>
        </div>
        <Link to="/new">
          <Button>Oluştur</Button>
        </Link>
      </Stack>
      <Form>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Başlığa Göre</Form.Label>
              <Form.Control onChange={(e) => setQuery(e.target.value)} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Göre</Form.Label>
              <ReactSelect
                onChange={(allTags) => setSelectedTags(allTags as Tag[])}
                options={availableTags}
                isMulti
                className="text-black"
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="mt-4 g-4">
        {filteredNotes.map((note) => (
          <Col key={note.id}>
            <Card note={note} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Main;
