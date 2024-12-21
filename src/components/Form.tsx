import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSelect from "react-select/creatable";
import { v4 } from "uuid";
import { Tag } from "../types";
import { CreateProps } from "../pages/Create";

const CustomForm = ({
  createTag,
  handleSubmit,
  availableTags,
  title = "",
  tags = [],
  markdown = "",
}: CreateProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const title = titleRef.current?.value || "";
    const markdown = textRef.current?.value || "";
    handleSubmit({ title, markdown, tags: selectedTags });

    navigate("/");
  };

  return (
    <Form onSubmit={handleForm}>
      <Row className="my-4">
        <Col>
          <Form.Group>
            <Form.Label>Başlık</Form.Label>
            <Form.Control defaultValue={title} ref={titleRef} />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Etiketler</Form.Label>
            <ReactSelect
              onChange={(allTags) => setSelectedTags(allTags as Tag[])}
              value={selectedTags}
              options={availableTags}
              onCreateOption={(text: string) => {
                const newTag = { label: text, value: v4() };
                createTag(newTag);
                setSelectedTags([...selectedTags, newTag]);
              }}
              isMulti
              className="text-black"
            />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group>
        <Form.Label>İçerik(Markdown destekler)</Form.Label>
        <Form.Control
          defaultValue={markdown}
          as="textarea"
          style={{ minHeight: "300px", maxHeight: "450px" }}
          ref={textRef}
        />
      </Form.Group>
      <Stack direction="horizontal" className="justify-content-end gap-3 mt-5">
        <Link to={".."}>
          <Button type="button" variant="secondary">
            Geri
          </Button>
        </Link>
        <Button type="submit" variant="success">
          Kaydet
        </Button>
      </Stack>
    </Form>
  );
};

export default CustomForm;
