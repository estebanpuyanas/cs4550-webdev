'use client';
import { useState } from 'react';
import { Button, Form, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus } from 'react-icons/fa';
import { BsGripVertical } from 'react-icons/bs';

interface Choice {
  _id: string;
  text: string;
  isCorrect: boolean;
}

interface Question {
  _id: string;
  title: string;
  type: string;
  points: number;
  questionText: string;
  choices: Choice[];
  correctAnswer: string;
  editing?: boolean;
  isNew?: boolean;
}

interface Props {
  questions: Question[];
  setQuestions: (qs: Question[]) => void;
}

function uid() {
  return crypto.randomUUID();
}

const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: 'Multiple Choice',
  MULTIPLE_SELECT: 'Multiple Answers',
  TRUE_FALSE: 'True / False',
  FILL_IN_BLANK: 'Fill in the Blank',
};

function QuestionCard({
  question,
  index,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}: {
  question: Question;
  index: number;
  onSave: (q: Question) => void;
  onCancel: (id: string, isNew: boolean) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [draft, setDraft] = useState<Question>({ ...question });

  const addChoice = () =>
    setDraft({ ...draft, choices: [...draft.choices, { _id: uid(), text: '', isCorrect: false }] });

  const removeChoice = (id: string) =>
    setDraft({ ...draft, choices: draft.choices.filter(c => c._id !== id) });

  const updateChoiceText = (id: string, text: string) =>
    setDraft({ ...draft, choices: draft.choices.map(c => (c._id === id ? { ...c, text } : c)) });

  const setSingleCorrect = (id: string) =>
    setDraft({ ...draft, choices: draft.choices.map(c => ({ ...c, isCorrect: c._id === id })) });

  const toggleMultiCorrect = (id: string, checked: boolean) =>
    setDraft({
      ...draft,
      choices: draft.choices.map(c => (c._id === id ? { ...c, isCorrect: checked } : c)),
    });

  const handleTypeChange = (type: string) => {
    const wasMC = draft.type === 'MULTIPLE_CHOICE' || draft.type === 'MULTIPLE_SELECT';
    const isMC = type === 'MULTIPLE_CHOICE' || type === 'MULTIPLE_SELECT';

    let choices = draft.choices;
    let correctAnswer = draft.correctAnswer;

    if (!wasMC && isMC) {
      choices = [
        { _id: uid(), text: '', isCorrect: false },
        { _id: uid(), text: '', isCorrect: false },
      ];
      correctAnswer = '';
    } else if (type === 'TRUE_FALSE') {
      choices = [];
      correctAnswer = 'true';
    } else if (type === 'FILL_IN_BLANK') {
      choices = [{ _id: uid(), text: '', isCorrect: true }];
      correctAnswer = '';
    }

    // Switching MC → single: keep choices but ensure only one is correct
    if (wasMC && type === 'MULTIPLE_CHOICE') {
      const firstCorrect = choices.find(c => c.isCorrect)?._id ?? choices[0]?._id;
      choices = choices.map(c => ({ ...c, isCorrect: c._id === firstCorrect }));
    }

    setDraft({ ...draft, type, choices, correctAnswer });
  };

  if (!question.editing) {
    return (
      <div className='border rounded p-3 mb-2'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center gap-2'>
            <BsGripVertical className='text-secondary' />
            <span className='fw-bold'>Question {index + 1}</span>
            <Badge bg='light' text='dark' className='border'>
              {TYPE_LABELS[question.type] ?? question.type}
            </Badge>
            <span className='text-muted small'>{question.points} pts</span>
          </div>
          <div className='d-flex gap-2'>
            <Button size='sm' variant='outline-secondary' onClick={() => onEdit(question._id)}>
              Edit
            </Button>
            <Button size='sm' variant='outline-danger' onClick={() => onDelete(question._id)}>
              <FaTrash />
            </Button>
          </div>
        </div>
        {question.questionText && (
          <p className='mt-2 mb-0 ms-4 text-muted small'>{question.questionText}</p>
        )}
      </div>
    );
  }

  return (
    <div className='border rounded p-3 mb-3 bg-light'>
      {/* Title / Points / Type row */}
      <div className='d-flex gap-3 mb-3 flex-wrap align-items-end'>
        <div className='flex-grow-1' style={{ minWidth: '180px' }}>
          <Form.Label className='small fw-bold mb-1'>Title</Form.Label>
          <Form.Control
            type='text'
            value={draft.title}
            onChange={e => setDraft({ ...draft, title: e.target.value })}
            placeholder='Question title'
          />
        </div>
        <div style={{ width: '90px' }}>
          <Form.Label className='small fw-bold mb-1'>Points</Form.Label>
          <Form.Control
            type='number'
            value={draft.points}
            min={0}
            onChange={e => setDraft({ ...draft, points: Number(e.target.value) })}
          />
        </div>
        <div style={{ width: '200px' }}>
          <Form.Label className='small fw-bold mb-1'>Question Type</Form.Label>
          <Form.Select value={draft.type} onChange={e => handleTypeChange(e.target.value)}>
            <option value='MULTIPLE_CHOICE'>Multiple Choice</option>
            <option value='MULTIPLE_SELECT'>Multiple Answers</option>
            <option value='TRUE_FALSE'>True / False</option>
            <option value='FILL_IN_BLANK'>Fill in the Blank</option>
          </Form.Select>
        </div>
      </div>

      <Form.Group className='mb-3'>
        <Form.Label className='small fw-bold mb-1'>Question</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={draft.questionText}
          onChange={e => setDraft({ ...draft, questionText: e.target.value })}
          placeholder='Enter your question here'
        />
      </Form.Group>

      {draft.type === 'MULTIPLE_CHOICE' && (
        <div className='mb-3'>
          <Form.Label className='small fw-bold mb-1'>
            Answers <span className='fw-normal text-muted'>(select the correct one)</span>
          </Form.Label>
          {draft.choices.map(c => (
            <div key={c._id} className='d-flex align-items-center gap-2 mb-2'>
              <Form.Check
                type='radio'
                name={`mc-${draft._id}`}
                checked={c.isCorrect}
                onChange={() => setSingleCorrect(c._id)}
              />
              <Form.Control
                type='text'
                value={c.text}
                onChange={e => updateChoiceText(c._id, e.target.value)}
                placeholder='Answer option'
              />
              <Button
                size='sm'
                variant='outline-danger'
                onClick={() => removeChoice(c._id)}
                disabled={draft.choices.length <= 2}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button size='sm' variant='outline-secondary' onClick={addChoice}>
            <FaPlus className='me-1' /> Add Answer
          </Button>
        </div>
      )}

      {draft.type === 'MULTIPLE_SELECT' && (
        <div className='mb-3'>
          <Form.Label className='small fw-bold mb-1'>
            Answers <span className='fw-normal text-muted'>(check all correct ones)</span>
          </Form.Label>
          {draft.choices.map(c => (
            <div key={c._id} className='d-flex align-items-center gap-2 mb-2'>
              <Form.Check
                type='checkbox'
                checked={c.isCorrect}
                onChange={e => toggleMultiCorrect(c._id, e.target.checked)}
              />
              <Form.Control
                type='text'
                value={c.text}
                onChange={e => updateChoiceText(c._id, e.target.value)}
                placeholder='Answer option'
              />
              <Button
                size='sm'
                variant='outline-danger'
                onClick={() => removeChoice(c._id)}
                disabled={draft.choices.length <= 2}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button size='sm' variant='outline-secondary' onClick={addChoice}>
            <FaPlus className='me-1' /> Add Answer
          </Button>
        </div>
      )}

      {draft.type === 'TRUE_FALSE' && (
        <div className='mb-3'>
          <Form.Label className='small fw-bold mb-1'>Correct Answer</Form.Label>
          <div className='d-flex gap-4'>
            <Form.Check
              type='radio'
              id={`tf-true-${draft._id}`}
              name={`tf-${draft._id}`}
              label='True'
              checked={draft.correctAnswer === 'true'}
              onChange={() => setDraft({ ...draft, correctAnswer: 'true' })}
            />
            <Form.Check
              type='radio'
              id={`tf-false-${draft._id}`}
              name={`tf-${draft._id}`}
              label='False'
              checked={draft.correctAnswer === 'false'}
              onChange={() => setDraft({ ...draft, correctAnswer: 'false' })}
            />
          </div>
        </div>
      )}

      {draft.type === 'FILL_IN_BLANK' && (
        <div className='mb-3'>
          <Form.Label className='small fw-bold mb-1'>
            Correct Answers <span className='fw-normal text-muted'>(any will be accepted)</span>
          </Form.Label>
          {draft.choices.map((c, i) => (
            <div key={c._id} className='d-flex align-items-center gap-2 mb-2'>
              <Form.Control
                type='text'
                value={c.text}
                onChange={e => updateChoiceText(c._id, e.target.value)}
                placeholder={`Answer ${i + 1}`}
              />
              <Button
                size='sm'
                variant='outline-danger'
                onClick={() => removeChoice(c._id)}
                disabled={draft.choices.length <= 1}>
                <FaTrash />
              </Button>
            </div>
          ))}
          <Button size='sm' variant='outline-secondary' onClick={addChoice}>
            <FaPlus className='me-1' /> Add Answer
          </Button>
        </div>
      )}

      <div className='d-flex gap-2 mt-3 pt-2 border-top'>
        <Button
          size='sm'
          variant='secondary'
          onClick={() => onCancel(question._id, question.isNew ?? false)}>
          Cancel
        </Button>
        <Button size='sm' variant='danger' onClick={() => onSave(draft)}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

export default function QuizQuestions({ questions, setQuestions }: Props) {
  const handleAdd = () => {
    const newQ: Question = {
      _id: uid(),
      title: 'New Question',
      type: 'MULTIPLE_CHOICE',
      points: 1,
      questionText: '',
      choices: [
        { _id: uid(), text: '', isCorrect: false },
        { _id: uid(), text: '', isCorrect: false },
      ],
      correctAnswer: '',
      editing: true,
      isNew: true,
    };
    setQuestions([...questions, newQ]);
  };

  const handleSave = (updated: Question) => {
    setQuestions(
      questions.map(q =>
        q._id === updated._id ? { ...updated, editing: false, isNew: false } : q,
      ),
    );
  };

  const handleCancel = (id: string, isNew: boolean) => {
    if (isNew) {
      setQuestions(questions.filter(q => q._id !== id));
    } else {
      setQuestions(questions.map(q => (q._id === id ? { ...q, editing: false } : q)));
    }
  };

  const handleEdit = (id: string) => {
    setQuestions(questions.map(q => (q._id === id ? { ...q, editing: true } : q)));
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter(q => q._id !== id));
  };

  return (
    <div>
      {questions.length === 0 && (
        <p className='text-center text-muted py-3'>
          No questions yet. Click below to add your first question.
        </p>
      )}

      {questions.map((q, i) => (
        <QuestionCard
          key={`${q._id}-${q.editing ? 'edit' : 'view'}`}
          question={q}
          index={i}
          onSave={handleSave}
          onCancel={handleCancel}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      <div className='d-flex justify-content-center mt-3'>
        <Button variant='outline-secondary' onClick={handleAdd}>
          <FaPlus className='me-1' /> New Question
        </Button>
      </div>
    </div>
  );
}
